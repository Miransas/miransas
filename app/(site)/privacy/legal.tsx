"use client";

import { useState, useEffect } from "react";
import { 
  Shield, 
  FileText, 
  Search, 
  Printer, 
  ChevronRight, 
  Info, 
  Globe, 
  ArrowLeft 
} from "lucide-react";
import Link from "next/link";

// Sol Menü İçerikleri (Hızlı Atlama Bağlantıları)
const termsSections = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "scope", title: "2. Scope of Multi-Project Services" },
  { id: "accounts", title: "3. User Accounts & Registration" },
  { id: "intellectual", title: "4. Intellectual Property Rights" },
  { id: "acceptable-use", title: "5. Acceptable Use Policy" },
  { id: "payments", title: "6. Subscriptions & Billing" },
  { id: "limitation", title: "7. Limitation of Liability" },
  { id: "termination", title: "8. Termination & Suspension" },
  { id: "governing-law", title: "9. Governing Law" },
];

const privacySections = [
  { id: "collection", title: "1. Information We Collect" },
  { id: "usage", title: "2. How We Use Information" },
  { id: "project-data", title: "3. Project-Specific Data Processing" },
  { id: "sharing", title: "4. Third-Party Sharing" },
  { id: "cookies", title: "5. Cookies & Tracking" },
  { id: "security", title: "6. Data Security & Storage" },
  { id: "rights", title: "7. Your Rights (GDPR/CCPA)" },
  { id: "retention", title: "8. Data Retention Policy" },
  { id: "changes", title: "9. Changes to this Policy" },
];

export function LegalPage() {
  const [activeTab, setActiveTab] = useState<"terms" | "privacy">("terms");
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(false); // Hydration güvenliği için
    setMounted(true);
  }, []);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const currentSections = activeTab === "terms" ? termsSections : privacySections;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col relative">
      
      {/* Arka Plan Glow Efektleri */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent pointer-events-none" />

      {/* Üst Navigasyon / Header */}
      <header className="sticky top-0 z-30 w-full border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <span className="text-xs text-indigo-400 font-mono tracking-wider uppercase">Legal Center</span>
              <h1 className="text-lg font-bold text-white flex items-center gap-2">
                Miransas Legal Agreement
              </h1>
            </div>
          </div>

          {/* Sekme Seçici (Tab Switcher) */}
          <div className="flex items-center bg-zinc-900/60 p-1 rounded-xl border border-zinc-800/80">
            <button
              onClick={() => setActiveTab("terms")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === "terms" 
                  ? "bg-zinc-800 text-white shadow-md" 
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Terms of Service
            </button>
            <button
              onClick={() => setActiveTab("privacy")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === "privacy" 
                  ? "bg-zinc-800 text-white shadow-md" 
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Privacy Policy
            </button>
          </div>
        </div>
      </header>

      {/* Ana Gövde */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 grid md:grid-cols-12 gap-8 relative z-10">
        
        {/* Sol Menü (Sidebar Navigasyon) - Masaüstü için Sabit durur */}
        <aside className="md:col-span-3 hidden md:block">
          <div className="sticky top-28 space-y-6">
            
            {/* Arama Kutusu */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search legal terms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-2 pl-9 pr-4 text-xs text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-colors"
              />
            </div>

            {/* Bağlantılar Listesi */}
            <nav className="space-y-1">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block px-3 mb-2">
                Table of Contents
              </span>
              {currentSections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition-all group"
                >
                  <span className="truncate">{sec.title}</span>
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-500" />
                </a>
              ))}
            </nav>

            {/* Yardım ve İletişim Kutusu */}
            <div className="p-4 bg-zinc-900/40 rounded-2xl border border-zinc-800/80">
              <div className="flex items-center gap-2 text-zinc-300 text-xs font-semibold mb-2">
                <Info className="w-4 h-4 text-indigo-400" />
                Need help?
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed mb-3">
                Have questions regarding our legal agreements or data security? Contact our support team.
              </p>
              <a 
                href="mailto:legal@miransas.com"
                className="text-[11px] text-indigo-400 font-medium hover:underline block"
              >
                legal@miransas.com
              </a>
            </div>

            {/* Yazdır Butonu */}
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-zinc-800 text-xs text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all"
            >
              <Printer className="w-4 h-4" />
              Print Document
            </button>
          </div>
        </aside>

        {/* Sağ Taraf: Detaylı Yasal Metin Alanı */}
        <section className="md:col-span-9 bg-zinc-900/20 border border-zinc-900 rounded-3xl p-6 sm:p-10 backdrop-blur-xl">
          
          {mounted && (
            <div className="flex items-center justify-between text-xs text-zinc-500 border-b border-zinc-900 pb-6 mb-8">
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" />
                Global Multi-Project Scope
              </span>
              <span>Last Updated: June 13, 2026</span>
            </div>
          )}

          {/* Tab 1: Terms of Service Content */}
          {activeTab === "terms" && (
            <article className="prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed space-y-8">
              
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-white">Terms of Service</h2>
                <p className="text-zinc-400 text-xs">
                  Please read these Terms of Service carefully before using any projects, websites, games, or systems owned and operated by Miransas.
                </p>
              </div>

              {/* 1. Acceptance */}
              <div id="acceptance" className="scroll-mt-28 space-y-3">
                <h3 className="text-lg font-bold text-white border-b border-zinc-900 pb-2">1. Acceptance of Terms</h3>
                <p>
                  By accessing or using any services provided by <strong>Miransas</strong> (collectively referred to as "the Company", "we", "us", or "our"), including but not limited to the Miransas platform, software, APIs, games, and specific projects such as the <strong>Chess Engine</strong>, <strong>Binboi</strong>, and associated <strong>Miransas Games</strong>, you agree to be bound by these Terms of Service.
                </p>
                <p>
                  If you are entering into this agreement on behalf of a company or other legal entity, you represent that you have the authority to bind such entity. If you do not agree to these terms, you must immediately cease all access and use of our ecosystem.
                </p>
              </div>

              {/* 2. Multi-Project Scope */}
              <div id="scope" className="scroll-mt-28 space-y-3">
                <h3 className="text-lg font-bold text-white border-b border-zinc-900 pb-2">2. Scope of Multi-Project Services</h3>
                <p>
                  Miransas acts as an umbrella ecosystem hosting multiple independent and integrated software projects, developer platforms, and gaming technologies. These Terms govern your usage across all our sub-domains and projects:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                  <li><strong>Chess Engine:</strong> Algorithmic and platform-specific gaming engine services.</li>
                  <li><strong>Binboi:</strong> Developer utility and repository software.</li>
                  <li><strong>Miransas Games:</strong> Custom gaming platforms, interactive features, and databases.</li>
                </ul>
                <p>
                  Each specific project may include extra operational guidelines or distinct micro-agreements, which are incorporated into these comprehensive Terms by reference.
                </p>
              </div>

              {/* 3. Accounts */}
              <div id="accounts" className="scroll-mt-28 space-y-3">
                <h3 className="text-lg font-bold text-white border-b border-zinc-900 pb-2">3. User Accounts & Registration</h3>
                <p>
                  To unlock certain functionalities, you may be required to register for an integrated account. You agree to provide accurate, current, and complete information. You are solely responsible for safeguarding the credentials you use to access the platform.
                </p>
                <p>
                  You must immediately notify us of any security breach or unauthorized use of your account. Miransas will not be liable for any losses caused by any unauthorized use of your account.
                </p>
              </div>

              {/* 4. Intellectual Property */}
              <div id="intellectual" className="scroll-mt-28 space-y-3">
                <h3 className="text-lg font-bold text-white border-b border-zinc-900 pb-2">4. Intellectual Property Rights</h3>
                <p>
                  All content, branding, visual interfaces, designs, compilation, computer code (including source code or object code), software, products, algorithms, and all other elements of the platform and our projects are protected by international copyright, patent, trademark, and trade secret laws.
                </p>
                <p>
                  Except as expressly authorized by Miransas, you agree not to sell, license, distribute, copy, modify, publicly perform or display, transmit, publish, edit, adapt, create derivative works from, or make unauthorized use of the Materials.
                </p>
              </div>

              {/* 5. Acceptable Use */}
              <div id="acceptable-use" className="scroll-mt-28 space-y-3">
                <h3 className="text-lg font-bold text-white border-b border-zinc-900 pb-2">5. Acceptable Use Policy</h3>
                <p>
                  You agree that you will not engage in any of the following prohibited behaviors:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                  <li>Using the service for any illegal purpose or in violation of local, state, national, or international laws.</li>
                  <li>Attempting to bypass security systems, modify codebases, or decompile the <strong>Chess Engine</strong> or <strong>Binboi</strong> binaries.</li>
                  <li>Using automated scripts, scrapers, or bots to interact with our systems in a way that degrades service performance.</li>
                  <li>Uploading malicious code, trojan horses, worms, or any software designed to disrupt service continuity.</li>
                </ul>
              </div>

              {/* 6. Payments & Billing */}
              <div id="payments" className="scroll-mt-28 space-y-3">
                <h3 className="text-lg font-bold text-white border-b border-zinc-900 pb-2">6. Subscriptions & Billing</h3>
                <p>
                  Certain services or special premium project features may require ongoing subscription fees or one-time purchases. All fees are quoted in USD (or local equivalent) and are exclusive of applicable taxes.
                </p>
                <p>
                  Unless stated otherwise, all payments are non-refundable. You authorize us to store your payment method and charge the recurring fee automatically to prevent service disruption.
                </p>
              </div>

              {/* 7. Limitation of Liability */}
              <div id="limitation" className="scroll-mt-28 space-y-3">
                <h3 className="text-lg font-bold text-white border-b border-zinc-900 pb-2">7. Limitation of Liability</h3>
                <p>
                  IN NO EVENT SHALL MIRANSAS, ITS DIRECTORS, EMPLOYEES, PARTNERS, OR AGENTS, BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF THE SERVICE.
                </p>
                <p>
                  The services are provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express or implied.
                </p>
              </div>

              {/* 8. Termination */}
              <div id="termination" className="scroll-mt-28 space-y-3">
                <h3 className="text-lg font-bold text-white border-b border-zinc-900 pb-2">8. Termination & Suspension</h3>
                <p>
                  We may terminate or suspend your account and access to any or all of our projects (including Chess Engine, Binboi, and Games) immediately, without prior notice or liability, for any reason, including if you breach the Terms.
                </p>
                <p>
                  Upon termination, your right to use the service will immediately cease. Any sections of this agreement that by their nature should survive termination shall survive.
                </p>
              </div>

              {/* 9. Governing Law */}
              <div id="governing-law" className="scroll-mt-28 space-y-3">
                <h3 className="text-lg font-bold text-white border-b border-zinc-900 pb-2">9. Governing Law</h3>
                <p>
                  These Terms shall be governed and construed in accordance with the laws of our operating jurisdiction, without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms will be brought exclusively in the federal or state courts representing the company's registration headquarters.
                </p>
              </div>

            </article>
          )}

          {/* Tab 2: Privacy Policy Content */}
          {activeTab === "privacy" && (
            <article className="prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed space-y-8">
              
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-white">Privacy Policy</h2>
                <p className="text-zinc-400 text-xs">
                  Your privacy is critically important to us. This Privacy Policy describes how Miransas collects, stores, protects, and utilizes user data.
                </p>
              </div>

              {/* 1. Collection */}
              <div id="collection" className="scroll-mt-28 space-y-3">
                <h3 className="text-lg font-bold text-white border-b border-zinc-900 pb-2">1. Information We Collect</h3>
                <p>
                  When you interact with our platform, we collect information that can directly or indirectly identify you. This includes:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                  <li><strong>Account Metadata:</strong> Names, emails, passwords, and custom avatar inputs.</li>
                  <li><strong>Financial Data:</strong> Secure transaction logs, billing addresses, and linked processing tokens (we do not directly store credit card numbers).</li>
                  <li><strong>System Logs:</strong> IP addresses, browser agents, geolocation data, and page request behavior.</li>
                </ul>
              </div>

              {/* 2. Usage */}
              <div id="collection" className="scroll-mt-28 space-y-3">
                <h3 className="text-lg font-bold text-white border-b border-zinc-900 pb-2">2. How We Use Information</h3>
                <p>
                  Miransas uses the gathered metrics to power our ecosystem. Primary operations include:
                </p>
                <p>
                  Maintaining active user sessions, rendering customized interfaces for developers, calculating diagnostic metrics, delivering transactional support mail, and securing our API architecture against malicious traffic patterns.
                </p>
              </div>

              {/* 3. Project-Specific Data */}
              <div id="project-data" className="scroll-mt-28 space-y-3">
                <h3 className="text-lg font-bold text-white border-b border-zinc-900 pb-2">3. Project-Specific Data Processing</h3>
                <p>
                  Due to the multi-project architecture of Miransas, individual projects process unique subsets of data:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                  <li><strong>Chess Engine:</strong> We store algorithmic match history, move timing, Elo ratings, and performance charts to build persistent profiles.</li>
                  <li><strong>Binboi:</strong> Safe metadata extraction from repositories to aid developer compilation pipelines.</li>
                  <li><strong>Games:</strong> Leaderboard scores, system configuration specs, and active game progress parameters.</li>
                </ul>
              </div>

              {/* 4. Sharing */}
              <div id="sharing" className="scroll-mt-28 space-y-3">
                <h3 className="text-lg font-bold text-white border-b border-zinc-900 pb-2">4. Third-Party Sharing</h3>
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share aggregated, non-personally identifiable analytical data with partners to evaluate service infrastructure needs.
                </p>
                <p>
                  We also share required elements with trusted service providers, such as payment gateways, analytics tools, and hosting providers, under strict confidentiality agreements.
                </p>
              </div>

              {/* 5. Cookies */}
              <div id="cookies" className="scroll-mt-28 space-y-3">
                <h3 className="text-lg font-bold text-white border-b border-zinc-900 pb-2">5. Cookies & Tracking</h3>
                <p>
                  We utilize tracking technologies like cookies, local storage, and tracking pixels to enrich platform performance. These tools save layout preferences, preserve login statuses, and generate telemetry reports to help us improve site design.
                </p>
                <p>
                  You can manage your cookie preferences through your web browser's built-in options menu, although disabling cookies may degrade user experience.
                </p>
              </div>

              {/* 6. Security */}
              <div id="security" className="scroll-mt-28 space-y-3">
                <h3 className="text-lg font-bold text-white border-b border-zinc-900 pb-2">6. Data Security & Storage</h3>
                <p>
                  We execute modern digital security measures including end-to-end transport layer security (HTTPS), advanced hashing algorithms (Bcrypt/Argon2), and strict isolation configurations for server storage.
                </p>
                <p>
                  While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security during internet transmission.
                </p>
              </div>

              {/* 7. Rights */}
              <div id="rights" className="scroll-mt-28 space-y-3">
                <h3 className="text-lg font-bold text-white border-b border-zinc-900 pb-2">7. Your Rights (GDPR/CCPA)</h3>
                <p>
                  Depending on your geographic location, you possess defined legislative rights concerning your personal information, which may include:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                  <li>The right to request copies of your stored personal databases.</li>
                  <li>The right to modify incomplete or outdated personal credentials.</li>
                  <li>The right to request immediate deletion of personal metadata.</li>
                  <li>The right to object or request restriction on processing workflows.</li>
                </ul>
              </div>

              {/* 8. Retention */}
              <div id="retention" className="scroll-mt-28 space-y-3">
                <h3 className="text-lg font-bold text-white border-b border-zinc-900 pb-2">8. Data Retention Policy</h3>
                <p>
                  We keep personal profile details active only as long as your registered account exists. We retain diagnostic system log records for up to 90 days, after which they are systematically deleted or anonymized.
                </p>
              </div>

              {/* 9. Changes */}
              <div id="changes" className="scroll-mt-28 space-y-3">
                <h3 className="text-lg font-bold text-white border-b border-zinc-900 pb-2">9. Changes to this Policy</h3>
                <p>
                  Miransas reserves the right to modify this Privacy Policy at any time. If we make material modifications, we will notify you by posting a prominent alert inside our primary dashboard or via your account's registered email.
                </p>
              </div>

            </article>
          )}

        </section>
      </main>

      {/* Alt Bilgi */}
      <footer className="border-t border-zinc-900 bg-zinc-950/60 py-8 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-6">
          <p>© 2026 Miransas Inc. All legal specifications subject to updates.</p>
        </div>
      </footer>

    </div>
  );
}