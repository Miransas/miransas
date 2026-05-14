"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  EyeOff,
  Lock,
  Database,
  Globe,
  UserCheck,
} from "lucide-react";

const Section = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
  }>;
  children: React.ReactNode;
}) => (
  <section className="mb-12">
    <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-3">
      <Icon className="text-emerald-500" size={18} />

      <h2 className="text-lg font-bold italic uppercase tracking-wider text-white">
        {title}
      </h2>
    </div>

    <div className="space-y-4 text-zinc-400 text-sm leading-relaxed font-light">
      {children}
    </div>
  </section>
);

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-zinc-300 pt-32 pb-24 font-sans selection:bg-emerald-500/30">
      <div className="max-w-3xl mx-auto px-6 relative">
        {/* Header */}
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.4em] mb-4"
          >
            Protocol // 02-PRIVACY
          </motion.div>

          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white mb-3">
            Privacy{" "}
            <span className="text-zinc-700">Policy.</span>
          </h1>

          <p className="text-zinc-500 text-sm max-w-xl leading-relaxed">
            This Privacy Policy explains how Miransas collects,
            processes, stores, and protects information across its
            products, services, applications, games, and digital
            infrastructure.
          </p>

          <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest italic mt-4">
            Last Updated: May 15, 2026
          </p>
        </header>

        {/* Privacy */}
        <Section title="Privacy First Approach" icon={EyeOff}>
          <p>
            Privacy is a core principle of the Miransas ecosystem.
            We aim to minimize data collection and only process
            information necessary to maintain functionality,
            security, and service reliability.
          </p>

          <p>
            Certain services may use encrypted or protected
            communication layers designed to improve user security
            and platform integrity.
          </p>
        </Section>

        {/* Security */}
        <Section title="Security & Protection" icon={Lock}>
          <p>
            Miransas uses modern security practices and industry
            standard encryption technologies to help protect user
            accounts, authentication systems, and platform
            infrastructure.
          </p>

          <p>
            Network communications may be secured using encrypted
            transport protocols and access protection mechanisms
            designed to reduce unauthorized access risks.
          </p>
        </Section>

        {/* Data */}
        <Section title="Data Processing" icon={Database}>
          <p>
            Miransas does not sell personal information to third
            parties or advertising brokers.
          </p>

          <p>
            Limited technical information, diagnostics, or anonymous
            analytics may be processed to improve platform
            performance, stability, fraud prevention, and overall
            service quality.
          </p>
        </Section>

        {/* Global */}
        <Section title="Global Infrastructure" icon={Globe}>
          <p>
            Our services may operate through global infrastructure
            providers and distributed cloud environments across
            multiple regions.
          </p>

          <p>
            Depending on the user’s location, certain data may be
            processed or stored in regional systems necessary for
            platform operation and performance optimization.
          </p>
        </Section>

        {/* Rights */}
        <Section title="User Rights & Requests" icon={UserCheck}>
          <p>
            Users may request access, correction, or deletion of
            applicable personal information in accordance with
            relevant privacy regulations and regional laws.
          </p>

          <p>
            Miransas will review and process valid privacy-related
            requests within a reasonable timeframe where legally
            applicable.
          </p>
        </Section>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-white/5 text-[10px] text-zinc-600 uppercase tracking-[0.3em] text-center">
          Miransas // Privacy, Security & Digital Infrastructure
        </footer>
      </div>
    </main>
  );
}