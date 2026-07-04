'use client'

import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

function cn(...inputs: (string | boolean | undefined)[]) {
  return inputs.filter(Boolean).join(' ')
}

const navLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
   { label: 'Blog', href: 'https://blog.miransas.com' },
  { label: 'Developers', href: '/developers' },
  { label: 'Games', href: '/games' },
  { label: 'Careers', href: '/careers' },
  { label: 'Status', href: '/status' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 32)
  })

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center"
    >
      <div
        className={cn(
          'flex w-full items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
          // Daha geniş padding, daha büyük max-width
          scrolled
            ? 'mx-3 mt-4 max-w-[80rem] rounded-full border border-white/10 bg-zinc-900/80 px-6 py-3 shadow-lg shadow-black/20 backdrop-blur-xl md:mx-6 lg:mx-auto lg:px-8'
            : 'mx-auto mt-0 max-w-[90rem] rounded-none border border-transparent bg-transparent px-6 py-6 md:px-10 lg:px-12',
        )}
      >
        <Link href="/" className="flex items-center gap-3" aria-label="Miransas home">
          {/* Daha büyük logo: 40x40 */}
          <Image
            src="/icons/logo.png"
            alt="Miransas Logo"
            width={50}
            height={50}
            className="rounded-xl  p-1.5"
            priority
          />
          <span className="text-base font-semibold tracking-tight text-white">Miransas</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/contact"
            className="hidden rounded-full bg-white px-5 py-2 text-sm font-medium text-zinc-950 transition-all hover:bg-zinc-200 md:inline-flex"
          >
            Get Started
          </a>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full border border-zinc-700 text-white transition-colors hover:bg-zinc-800 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu - daha geniş ve düzgün */}
      {menuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-x-4 top-24 flex flex-col gap-1 rounded-2xl border border-zinc-800 bg-zinc-950/95 p-4 shadow-2xl backdrop-blur-xl md:hidden"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-base text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-xl bg-white px-4 py-3 text-center text-base font-medium text-zinc-950"
          >
            Get Started
          </Link>
        </motion.nav>
      )}
    </motion.header>
  )
}