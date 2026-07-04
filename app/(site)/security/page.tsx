"use client";

import {
  Shield,
  Lock,
  Key,
  Fingerprint,
  Server,
  Globe,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Mail,
  ChevronRight,
  Zap,
  Eye,
  Bug,
  FileText,
  Activity,
} from "lucide-react";

const measures = [
  {
    icon: Lock,
    title: "Encryption",
    desc: "AES-256 at rest. TLS 1.3 in transit. No exceptions, no downgrade attacks.",
    status: "Active",
  },
  {
    icon: Key,
    title: "Key Management",
    desc: "Hardware Security Modules (HSM) for key storage. Automatic rotation every 90 days.",
    status: "Active",
  },
  {
    icon: Fingerprint,
    title: "Authentication",
    desc: "Argon2id for passwords. TOTP 2FA supported. WebAuthn/FIDO2 for console access.",
    status: "Active",
  },
  {
    icon: Server,
    title: "Infrastructure",
    desc: "Zero-trust network. No internal IP whitelisting. Every request authenticated and authorized.",
    status: "Active",
  },
  {
    icon: Eye,
    title: "Monitoring",
    desc: "Real-time anomaly detection. Automated alerting for suspicious patterns. 24/7 incident response.",
    status: "Active",
  },
  {
    icon: Bug,
    title: "Bug Bounty",
    desc: "Responsible disclosure program. Rewards up to $5,000 for critical vulnerabilities.",
    status: "Active",
  },
];

const certifications = [
  {
    name: "SOC 2 Type II",
    status: "In Progress",
    expected: "Q4 2026",
  },
  {
    name: "ISO 27001",
    status: "Planned",
    expected: "2027",
  },
  {
    name: "GDPR Compliance",
    status: "Active",
    expected: "Ongoing",
  },
  {
    name: "KVKK Compliance",
    status: "Active",
    expected: "Ongoing",
  },
];

const recentActivity = [
  {
    date: "2026-07-01",
    type: "Security Update",
    desc: "Rotated all API keys proactively. No impact on users.",
    severity: "low",
  },
  {
    date: "2026-06-15",
    type: "Penetration Test",
    desc: "Annual third-party pentest completed. Zero critical findings.",
    severity: "info",
  },
  {
    date: "2026-05-20",
    type: "Vulnerability Patch",
    desc: "Patched CVE-2026-XXXX in dependency. Automated deployment within 4 hours.",
    severity: "medium",
  },
  {
    date: "2026-04-10",
    type: "Infrastructure",
    desc: "Migrated to zero-trust network architecture. All internal traffic now mTLS.",
    severity: "info",
  },
];

export default function SecurityPage() {
  return (
    <main className="w-full bg-black selection:bg-neutral-800 selection:text-white">
      
      {/* ===== HERO ===== */}
      <section className="relative border-b border-white/10 pb-24 pt-32 md:pt-40">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-neutral-300 backdrop-blur-xl">
            <Sparkles className="size-4 text-amber-400" />
            Trust & Safety
          </div>
          
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
            Security is not a feature.
            <br />
            <span className="text-neutral-500">It's the foundation.</span>
          </h1>
          
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-xl">
            Solo studio doesn't mean solo security. We implement enterprise-grade 
            protections, automated monitoring, and responsible disclosure. Every byte 
            is encrypted, every access is logged, every vulnerability is patched.
          </p>
          
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
            <CheckCircle2 className="size-4 text-emerald-400" />
            Last security audit: June 15, 2026
            <span className="mx-2 text-neutral-700">|</span>
            <Activity className="size-4 text-amber-400" />
            Uptime: 99.97%
            <span className="mx-2 text-neutral-700">|</span>
            <Zap className="size-4 text-amber-400" />
            MTTR: 4 hours
          </div>
        </div>
      </section>

      {/* ===== SECURITY MEASURES ===== */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Protections
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              How we secure your data.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {measures.map((measure) => {
              const Icon = measure.icon;
              return (
                <div
                  key={measure.title}
                  className="group relative overflow-hidden rounded-3xl bg-[#111] p-8 transition-all duration-500 hover:bg-[#1a1a1a] md:p-10"
                >
                  <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl transition-all group-hover:bg-emerald-500/20" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                        <Icon className="size-6 text-emerald-400" />
                      </div>
                      <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                        {measure.status}
                      </span>
                    </div>
                    
                    <h3 className="mt-6 text-xl font-semibold text-white">{measure.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                      {measure.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CERTIFICATIONS ===== */}
      <section className="relative bg-[#F6F5F2] py-32 text-neutral-900">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Compliance
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Certifications & Standards.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="rounded-3xl bg-white p-8 shadow-sm transition-all hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <Shield className="size-8 text-neutral-300" />
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      cert.status === "Active"
                        ? "bg-emerald-50 text-emerald-600"
                        : cert.status === "In Progress"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {cert.status}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold">{cert.name}</h3>
                <p className="mt-2 text-sm text-neutral-500">
                  Expected: {cert.expected}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ACTIVITY LOG ===== */}
      <section className="relative py-32 text-white">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Transparency
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Security activity.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-neutral-500">
              Public log of security-related events, patches, and audits. 
              No security through obscurity.
            </p>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.date}
                className="flex flex-col gap-4 rounded-2xl bg-[#111] p-6 md:flex-row md:items-center md:gap-8 md:p-8"
              >
                <div className="flex items-center gap-3 md:w-48">
                  <span
                    className={`size-2 rounded-full ${
                      activity.severity === "info"
                        ? "bg-blue-400"
                        : activity.severity === "low"
                        ? "bg-emerald-400"
                        : "bg-amber-400"
                    }`}
                  />
                  <span className="text-sm font-mono text-neutral-500">{activity.date}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-neutral-400">
                      {activity.type}
                    </span>
                    <span
                      className={`text-xs font-medium uppercase ${
                        activity.severity === "info"
                          ? "text-blue-400"
                          : activity.severity === "low"
                          ? "text-emerald-400"
                          : "text-amber-400"
                      }`}
                    >
                      {activity.severity}
                    </span>
                  </div>
                  <p className="mt-2 text-base text-neutral-300">{activity.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RESPONSIBLE DISCLOSURE ===== */}
      <section className="relative bg-[#F6F5F2] py-32 text-neutral-900">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                Bug Bounty
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Report a vulnerability.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-white p-8 shadow-sm md:p-12">
                <div className="flex items-start gap-4">
                  <Bug className="size-6 shrink-0 text-amber-500" />
                  <div>
                    <h3 className="text-lg font-semibold">Responsible Disclosure Program</h3>
                    <p className="mt-3 leading-relaxed text-neutral-500">
                      We welcome security researchers to report vulnerabilities. We commit to:
                    </p>
                    <ul className="mt-4 space-y-3">
                      {[
                        "Acknowledge receipt within 72 hours",
                        "Assess severity within 7 days",
                        "Fix critical issues within 14 days",
                        "Public disclosure coordinated with researcher",
                        "Rewards up to $5,000 for critical findings",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle2 className="size-5 shrink-0 text-emerald-500" />
                          <span className="text-sm text-neutral-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 rounded-2xl bg-amber-50 p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="size-5 shrink-0 text-amber-600" />
                        <p className="text-sm text-amber-700">
                          <strong>Scope:</strong> miransas.com, console.miransas.com, app.binboi.com, 
                          and associated APIs. Do not test on production user data.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="relative border-t border-white/10 py-32 text-white">
        <div className="mx-auto max-w-[90rem] px-6 text-center md:px-12">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Security team.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-400">
            For security incidents, vulnerability reports, or compliance questions, 
            contact our security team directly. PGP key available on request.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:security@miransas.com"
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-white px-8 text-base font-semibold text-black transition-all hover:bg-neutral-200 hover:scale-[1.02]"
            >
              <Mail className="size-5" />
              security@miransas.com
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/pgp-key.txt"
              className="inline-flex h-14 items-center gap-3 rounded-full border border-white/15 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur-xl transition-all hover:bg-white/10"
            >
              <Key className="size-5" />
              PGP Public Key
            </a>
          </div>
          <p className="mt-6 text-sm text-neutral-600">
            Response time: 4 hours for critical, 24 hours for all other reports.
          </p>
        </div>
      </section>
    </main>
  );
}