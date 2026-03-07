import React from "react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-8">
          Privacy <span className="text-[#FF4F00]">Protocol.</span>
        </h1>
        
        <div className="space-y-6 text-neutral-400 font-light leading-relaxed">
          <p>
            At Miransas Studio, we prioritize the security of your digital signal. 
            All data transmissions are handled with industrial-grade encryption.
          </p>
          
          <section>
            <h2 className="text-white font-bold uppercase tracking-widest text-sm mb-4">1. Data Collection</h2>
            <p>
              We only collect the telemetry necessary to establish a stable connection between 
              our core infrastructure and your terminal.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold uppercase tracking-widest text-sm mb-4">2. Encryption</h2>
            <p>
              Your personal data is protected by memory-safe protocols and modern 
              cryptographic standards.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}