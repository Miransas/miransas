import Link from "next/link";

export const metadata = {
  title: "Security — Miransas",
  description: "How Miransas secures your data.",
};

export default function SecurityPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[#8CFF2E]">
        Legal
      </p>
      <h1 className="mb-2 text-4xl font-bold text-white sm:text-5xl">
        Security
      </h1>
      <p className="mb-12 text-sm text-zinc-500">
        Last updated: June 14, 2026
      </p>

      <div className="space-y-10 text-zinc-300 leading-relaxed">
        <section>
          <p className="text-zinc-400">
            Miransas is a small operation, so security is something we have to
            get right by being deliberate. This page lays out what we do and
            what we don&apos;t.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            Authentication
          </h2>
          <ul className="space-y-2 text-zinc-400">
            <li>— Passwords hashed with Argon2id</li>
            <li>— Session tokens are short-lived JWTs over HTTPS-only cookies</li>
            <li>— Personal Access Tokens are stored as SHA-256 hashes</li>
            <li>— OAuth sign-in via GitHub (optional)</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            Transport &amp; data
          </h2>
          <ul className="space-y-2 text-zinc-400">
            <li>— All traffic is TLS 1.2+ (Cloudflare in front)</li>
            <li>
              — Wildcard certificates managed via DNS-01 (Let&apos;s Encrypt)
            </li>
            <li>— Database connections use SSL with channel binding</li>
            <li>— Backups managed by hosting providers (Neon, Vercel)</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            Payments
          </h2>
          <p className="text-zinc-400">
            We never see or store payment card details. All billing is handled
            by Polar.sh as our merchant of record, which is PCI-compliant.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            Reporting a vulnerability
          </h2>
          <p className="text-zinc-400">
            If you find a security issue, please email{" "}
            
            <a  href="mailto:contact@miransas.com"
              className="text-[#8CFF2E] underline-offset-4 hover:underline"
            >
              contact@miransas.com
            </a>{" "}
            with details and a reproduction. Please don&apos;t disclose
            publicly until we&apos;ve had a chance to investigate. We aim to
            acknowledge within 48 hours.
          </p>
          <p className="mt-3 text-zinc-400">
            We&apos;re solo-operated and can&apos;t offer bug bounties, but
            we&apos;ll credit you (with permission) once a fix ships.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            What we don&apos;t claim
          </h2>
          <p className="text-zinc-400">
            We&apos;re not SOC 2 certified. We don&apos;t have a 24/7 security
            team. If your use case requires compliance attestations, please
            reach out before signing up so we can discuss whether we&apos;re a
            good fit.
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