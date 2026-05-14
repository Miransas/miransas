"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  Gavel,
  Ban,
  Globe,
} from "lucide-react";

const Section = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className: string; size: number }>;
  children: React.ReactNode;
}) => (
  <section className="mb-12">
    <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-3">
      <Icon className="text-purple-500" size={18} />
      <h2 className="text-lg font-bold italic uppercase tracking-wider text-white">
        {title}
      </h2>
    </div>

    <div className="space-y-4 text-zinc-400 text-sm leading-relaxed font-light">
      {children}
    </div>
  </section>
);

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-zinc-300 pt-32 pb-24 font-sans">
      <div className="max-w-3xl mx-auto px-6 relative">
        {/* Header */}
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-mono text-purple-500 uppercase tracking-[0.4em] mb-4"
          >
            Protocol // 01-TOS
          </motion.div>

          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white mb-3">
            Terms of{" "}
            <span className="text-zinc-700">Service.</span>
          </h1>

          <p className="text-zinc-500 text-sm max-w-xl leading-relaxed">
            These Terms govern access to products, services, platforms,
            games, applications, APIs, and infrastructure operated by
            Miransas.
          </p>

          <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest italic mt-4">
            Effective Date: May 15, 2026
          </p>
        </header>

        {/* Use Policy */}
        <Section title="Acceptable Use" icon={Ban}>
          <p>
            By accessing Miransas services, platforms, games, APIs,
            software, or infrastructure, users agree to comply with all
            applicable local and international laws and regulations.
          </p>

          <p>
            Unauthorized access attempts, service abuse, malicious
            automation, denial-of-service attacks, data scraping, or any
            activity that may negatively impact platform stability or
            security may result in suspension or permanent termination
            of access.
          </p>
        </Section>

        {/* Ownership */}
        <Section title="Intellectual Property" icon={Shield}>
          <p>
            Unless otherwise stated, all Miransas products, technologies,
            software, branding, interfaces, systems, visual assets, and
            proprietary technologies remain the intellectual property of
            Miransas and its affiliated projects.
          </p>

          <p>
            Users may not reproduce, redistribute, reverse engineer, or
            commercially exploit protected assets without prior written
            permission.
          </p>
        </Section>

        {/* Availability */}
        <Section title="Service Availability" icon={AlertTriangle}>
          <p>
            Miransas services are provided on an “as available” and “as
            is” basis. While we strive for high availability and
            reliability, uninterrupted access cannot be guaranteed at all
            times.
          </p>

          <p>
            Temporary interruptions may occur due to maintenance,
            infrastructure upgrades, third-party provider issues, or
            unforeseen technical events.
          </p>
        </Section>

        {/* Global */}
        <Section title="Global Operations" icon={Globe}>
          <p>
            Miransas operates globally and may provide products,
            experiences, or infrastructure services across multiple
            regions and jurisdictions.
          </p>

          <p>
            Users are responsible for ensuring that their use of
            Miransas services complies with the laws and regulations of
            their local jurisdiction.
          </p>
        </Section>

        {/* Law */}
        <Section title="Governing Law" icon={Gavel}>
          <p>
            These Terms shall be governed and interpreted in accordance
            with applicable international commercial and technology
            regulations together with the governing laws of the operating
            jurisdiction of Miransas.
          </p>

          <p>
            Any disputes arising from the use of Miransas services shall
            be resolved through the appropriate legal authorities within
            the applicable jurisdiction.
          </p>
        </Section>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-white/5 text-[10px] text-zinc-600 uppercase tracking-[0.3em] text-center">
          Miransas // Global Technology, Infrastructure & Digital Products
        </footer>
      </div>
    </main>
  );
}