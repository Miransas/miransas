import Link from "next/link";

export const metadata = {
  title: "Terms — Miransas",
  description: "Terms of service for Miransas products.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[#8CFF2E]">
        Legal
      </p>
      <h1 className="mb-2 text-4xl font-bold text-white sm:text-5xl">
        Terms
      </h1>
      <p className="mb-12 text-sm text-zinc-500">
        Last updated: June 14, 2026
      </p>

      <div className="space-y-10 text-zinc-300 leading-relaxed">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            Acceptance
          </h2>
          <p className="text-zinc-400">
            By using any Miransas product — including Binboi, CourierX, or the
            Miransas blog — you agree to these terms. If you don&apos;t agree,
            please don&apos;t use the service.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            Acceptable use
          </h2>
          <p className="mb-3 text-zinc-400">
            You may not use Miransas services to:
          </p>
          <ul className="space-y-2 text-zinc-400">
            <li>— host, distribute, or transmit illegal content</li>
            <li>— send spam, phishing, or malware</li>
            <li>— attack, scan, or interfere with other systems</li>
            <li>— violate someone else&apos;s rights or privacy</li>
            <li>
              — bypass quotas or pricing tiers through technical means
            </li>
          </ul>
          <p className="mt-4 text-zinc-400">
            We may suspend or terminate accounts that violate these rules, with
            or without notice depending on severity.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            Account &amp; billing
          </h2>
          <p className="text-zinc-400">
            You&apos;re responsible for keeping your credentials safe. Paid
            plans are billed monthly through Polar.sh, which acts as our
            merchant of record. You can cancel at any time from the dashboard;
            you&apos;ll keep access until the end of the billing period.
            Refunds are handled case-by-case.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            Service availability
          </h2>
          <p className="text-zinc-400">
            We aim to keep things up and running, but Miransas is a small
            operation. There&apos;s no contractual uptime SLA. We&apos;ll
            communicate scheduled maintenance and major incidents in good
            faith.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            Your content
          </h2>
          <p className="text-zinc-400">
            You retain ownership of any data you send through our services. By
            using the service, you grant us a limited license to process that
            data solely to provide the service.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            Disclaimers
          </h2>
          <p className="text-zinc-400">
            The services are provided &quot;as is&quot;. To the extent allowed
            by law, we disclaim all warranties — express or implied — and
            won&apos;t be liable for indirect, incidental, or consequential
            damages. Total liability for any direct claim is limited to what
            you&apos;ve paid us in the prior twelve months.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            Changes
          </h2>
          <p className="text-zinc-400">
            We may update these terms occasionally. Material changes will be
            announced via email or in-app notice. Continued use after a change
            means you accept the new terms.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            Governing law
          </h2>
          <p className="text-zinc-400">
            These terms are governed by the laws of Türkiye. Any dispute will
            be resolved in good faith first; otherwise in the competent courts
            of Türkiye.
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