import Link from "next/link";

export const metadata = {
  title: "Privacy — Miransas",
  description: "How Miransas handles your data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[#8CFF2E]">
        Legal
      </p>
      <h1 className="mb-2 text-4xl font-bold text-white sm:text-5xl">
        Privacy
      </h1>
      <p className="mb-12 text-sm text-zinc-500">
        Last updated: June 14, 2026
      </p>

      <div className="space-y-10 text-zinc-300 leading-relaxed">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">Who we are</h2>
          <p className="text-zinc-400">
            Miransas is a solo software studio operated by Sardor Azimov from
            Turkey. This policy covers all products built under the Miransas
            umbrella, including Binboi, CourierX, and the Miransas blog.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            What we collect
          </h2>
          <ul className="space-y-2 text-zinc-400">
            <li>
              <strong className="text-zinc-200">Account data:</strong> email
              address and name when you sign up.
            </li>
            <li>
              <strong className="text-zinc-200">Usage data:</strong> IP
              addresses, request metadata, and audit logs to keep services
              secure and improve reliability.
            </li>
            <li>
              <strong className="text-zinc-200">Authentication:</strong> an
              HTTP-only cookie or Personal Access Token to keep you signed in.
            </li>
          </ul>
          <p className="mt-4 text-zinc-400">
            We do not collect payment card details. Billing is processed by
            Polar.sh, which acts as our merchant of record.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            How we use it
          </h2>
          <p className="text-zinc-400">
            Account data is used to provide and secure the service. Usage data
            is used for abuse prevention, debugging, and reliability. We do not
            sell your data, and we do not run advertising.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            Third parties
          </h2>
          <p className="mb-3 text-zinc-400">
            We use a small set of trusted providers to operate our services:
          </p>
          <ul className="space-y-2 text-zinc-400">
            <li>
              <strong className="text-zinc-200">Polar.sh</strong> — billing and
              payments (merchant of record)
            </li>
            <li>
              <strong className="text-zinc-200">Resend</strong> — transactional
              email delivery
            </li>
            <li>
              <strong className="text-zinc-200">Neon</strong> — database
              hosting (AWS us-east-1)
            </li>
            <li>
              <strong className="text-zinc-200">Vercel</strong> — frontend
              hosting
            </li>
            <li>
              <strong className="text-zinc-200">Linode (Akamai)</strong> —
              backend hosting (Frankfurt)
            </li>
            <li>
              <strong className="text-zinc-200">Cloudflare</strong> — DNS and
              CDN
            </li>
            <li>
              <strong className="text-zinc-200">GitHub</strong> — OAuth sign-in
              (if used)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            Your rights
          </h2>
          <p className="text-zinc-400">
            You can request access to, correction of, or deletion of your data
            at any time. Email us and we&apos;ll handle it within a reasonable
            time. Closing your account removes your data, except where we are
            legally required to retain it.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">Cookies</h2>
          <p className="text-zinc-400">
            We use a single essential cookie to keep you signed in. We don&apos;t
            run third-party analytics or advertising trackers.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">Contact</h2>
          <p className="text-zinc-400">
            Questions? Email{" "}
            
              <a href="mailto:contact@miransas.com"
              className="text-[#8CFF2E] underline-offset-4 hover:underline"
            >
              contact@miransas.com
            </a>
            .
          </p>
        </section>

        <section className="border-t border-white/10 pt-8 text-sm text-zinc-500">
          <p>
            This document is plain-English and may not cover every legal edge
            case. If you operate in a regulated industry or have specific
            compliance needs, please reach out before signing up.
          </p>
        </section>
      </div>

      <div className="mt-16">
        <Link
          href="/"
          className="text-sm text-zinc-500 transition-colors hover:text-white"
        >
          ← Back home
        </Link>
      </div>
    </div>
  );
}