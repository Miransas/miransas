'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const root = document.documentElement
    const stored = localStorage.getItem('miransas-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = stored ? stored === 'dark' : prefersDark
    setIsDark(dark)
    root.classList.toggle('dark', dark)
    root.classList.toggle('light', !dark)
  }, [])

  function toggle() {
    const next = !isDark
    setIsDark(next)
    const root = document.documentElement
    root.classList.toggle('dark', next)
    root.classList.toggle('light', !next)
    localStorage.setItem('miransas-theme', next ? 'dark' : 'light')
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-neon/40 hover:text-foreground"
    >
      {mounted && (isDark ? <Sun className="size-4" /> : <Moon className="size-4" />)}
      {!mounted && <span className="size-4" />}
    </button>
  )
}
