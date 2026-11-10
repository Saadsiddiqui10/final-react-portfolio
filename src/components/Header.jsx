import { useEffect, useState } from 'react'
import { nav } from '../data.js'
import { useActiveSection } from '../hooks.js'
import { SCHEME_KEY, setSchemeMeta, toggleScheme } from '../theme.js'
import { Close, Menu, Moon, Search, Sun } from './Icons.jsx'

const ids = nav.map((n) => n.href.slice(1))

export default function Header({ onOpenPalette }) {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(ids)
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent)

  useEffect(() => {
    const sync = (e) => {
      if (e.key === SCHEME_KEY) setSchemeMeta(e.newValue)
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/85 backdrop-blur-md">
      <div className="progress absolute inset-x-0 top-0 h-0.5 bg-spark" aria-hidden="true" />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="font-display text-xl font-bold tracking-tight" aria-label="Saad Siddiqui, back to top">
          saad<span className="text-spark">.</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => {
              const current = active === n.href.slice(1)
              return (
                <li key={n.href}>
                  <a
                    href={n.href}
                    aria-current={current ? 'true' : undefined}
                    className="nav-link relative rounded-full px-3.5 py-2 text-sm text-muted transition-colors duration-200 hover:text-ink aria-[current]:text-ink"
                  >
                    {n.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onOpenPalette}
            className="hidden h-10 cursor-pointer items-center gap-2 rounded-full border border-line bg-surface pr-2 pl-3 text-sm text-muted transition-colors duration-200 hover:border-ink hover:text-ink sm:inline-flex"
          >
            <Search width={15} height={15} />
            <span>Jump to</span>
            <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[0.68rem]">{isMac ? '⌘K' : 'Ctrl K'}</kbd>
          </button>
          <button
            type="button"
            onClick={toggleScheme}
            className="grid size-11 cursor-pointer place-items-center rounded-full text-muted transition-colors duration-200 hover:bg-ink/5 hover:text-ink"
          >
            <span className="only-light">
              <Moon />
              <span className="sr-only">Switch to dark theme</span>
            </span>
            <span className="only-dark">
              <Sun />
              <span className="sr-only">Switch to light theme</span>
            </span>
          </button>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
            className="grid size-11 cursor-pointer place-items-center rounded-full text-ink transition-colors duration-200 hover:bg-ink/5 md:hidden"
          >
            {open ? <Close /> : <Menu />}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      <nav id="mobile-nav" aria-label="Mobile" hidden={!open} className="border-t border-line md:hidden">
        <ul className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
          {nav.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-2 py-3 font-display text-lg font-medium hover:bg-ink/5"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
