"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { headerNavLinks as navLinks } from "@/constants/navlinks";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Sayfa kaydırıldığında header'ın arka planını belirginleştirme
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuVariants = {
    closed: { 
      x: "100%" as const,
      transition: { type: "spring" as const, stiffness: 400, damping: 40 } 
    },
    opened: { 
      x: 0,
      transition: { type: "spring" as const, stiffness: 400, damping: 40 } 
    },
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          scrolled 
            ? "border-b border-white/10 bg-black/70 backdrop-blur-xl py-4" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-black tracking-tighter text-white">
            MIRANSAS<span className="text-blue-500">.</span>
          </Link>

          {/* Desktop Menü */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/start"
              className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-blue-600 hover:text-white transition-all transform active:scale-95"
            >
              Başlayalım
            </Link>
          </div>

          {/* Burger Butonu (Next-level Animasyonlu) */}
          <div className="md:hidden z-[110]">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white outline-none"
              aria-label="Toggle Menu"
            >
              <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
                {isOpen ? <X size={30} /> : <Menu size={30} />}
              </motion.div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobil Menü Sistemi */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[101]"
            />

            {/* Sağ Panel */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="opened"
              exit="closed"
              className="fixed top-0 right-0 h-screen w-[80%] sm:w-[400px] bg-[#080808] border-l border-white/5 p-12 z-[105] flex flex-col shadow-[ -20px 0 50px rgba(0,0,0,0.5)]"
            >
              <div className="mt-16 flex flex-col gap-10">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i + 0.2 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-4xl font-bold text-white hover:text-blue-500 transition-colors inline-block"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto">
                <div className="h-[1px] w-full bg-white/10 mb-8" />
                <p className="text-gray-500 text-sm tracking-widest uppercase mb-4">Sosyal Medya</p>
                <div className="flex gap-6">
                  {/* Buraya sosyal medya ikonların gelecek */}
                  <span className="text-white/40 hover:text-blue-500 cursor-pointer transition-colors">Twitter</span>
                  <span className="text-white/40 hover:text-blue-500 cursor-pointer transition-colors">Github</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;