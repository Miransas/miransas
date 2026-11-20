import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const VALID_TOPICS = [
  'General / Partnerships',
  'Product Support',
  'Security',
  'Voice Talent (Miralas)',
] as const;

type ContactTopic = (typeof VALID_TOPICS)[number];

const TOPIC_SUBJECT_PREFIX: Record<ContactTopic, string> = {
  'General / Partnerships': 'General Inquiry',
  'Product Support': 'Product Support',
  Security: 'Security',
  'Voice Talent (Miralas)': 'Voice',
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const ipHits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  entry.count += 1;
  return true;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildMailtoUrl(
  name: string,
  email: string,
  topic: ContactTopic,
  message: string
): string {
  const prefix = TOPIC_SUBJECT_PREFIX[topic];
  const subject = `${prefix} — ${name}`;
  const body = `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`;
  return `mailto:contact@miransas.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function POST(request: NextRequest) {
  try {
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor?.split(',')[0]?.trim() || 'anonymous';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          ok: false,
          delivered: false,
          error: 'Too many requests. Please wait a minute before trying again.',
        },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        {
          ok: false,
          delivered: false,
          error: 'Invalid request payload.',
        },
        { status: 400 }
      );
    }

    // Honeypot check (bots filling hidden company/website field)
    const honeypot =
      typeof body.company === 'string'
        ? body.company.trim()
        : typeof body.website === 'string'
          ? body.website.trim()
          : '';
    if (honeypot.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          delivered: false,
          error: 'Submission rejected.',
        },
        { status: 400 }
      );
    }

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const rawTopic = typeof body.topic === 'string' ? body.topic.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (name.length < 2 || name.length > 120) {
      return NextResponse.json(
        {
          ok: false,
          delivered: false,
          error: 'Please enter your name (2–120 characters).',
        },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email) || email.length > 254) {
      return NextResponse.json(
        {
          ok: false,
          delivered: false,
          error: 'Please enter a valid email address.',
        },
        { status: 400 }
      );
    }

    const topic: ContactTopic = (VALID_TOPICS as readonly string[]).includes(
      rawTopic
    )
      ? (rawTopic as ContactTopic)
      : 'General / Partnerships';

    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        {
          ok: false,
          delivered: false,
          error: 'Please enter a message between 10 and 5,000 characters.',
        },
        { status: 400 }
      );
    }

    const mailtoUrl = buildMailtoUrl(name, email, topic, message);
    const resendApiKey = process.env.RESEND_API_KEY?.trim();

    if (!resendApiKey) {
      return NextResponse.json(
        {
          ok: true,
          delivered: false,
          fallbackMailto: true,
          mailtoUrl,
          message:
            'Direct form delivery is not configured on this environment. Your message is ready to send via your email client with one click.',
        },
        { status: 200 }
      );
    }

    const resend = new Resend(resendApiKey);
    const toAddress =
      process.env.CONTACT_TO_EMAIL?.trim() || 'contact@miransas.com';
    const fromAddress =
      process.env.CONTACT_FROM_EMAIL?.trim() ||
      'Miransas Contact <contact@miransas.com>';
    const subjectPrefix = TOPIC_SUBJECT_PREFIX[topic];

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: email,
      subject: `[Miransas] ${subjectPrefix} — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`,
    });

    if (error) {
      return NextResponse.json(
        {
          ok: true,
          delivered: false,
          fallbackMailto: true,
          mailtoUrl,
          message:
            'Email delivery service was unavailable. You can send your pre-filled message directly via your email client below.',
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        delivered: true,
        fallbackMailto: false,
        mailtoUrl,
        message:
          'Your message has been sent to the Miransas team. Product and security inquiries are prioritized.',
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        delivered: false,
        error:
          'Unable to process your request right now. Please write directly to contact@miransas.com.',
      },
      { status: 500 }
    );
  }
}
