import { useRef, useState } from 'react'
import { profile } from '../data.js'
import { trackPointer } from '../hooks.js'
import { ArrowUpRight, Check, Copy, GitHub, LinkedIn, Mail } from './Icons.jsx'

const links = [
  { label: 'LinkedIn', value: 'saad-siddiqui', href: profile.linkedin, Icon: LinkedIn },
  { label: 'GitHub', value: 'Saadsiddiqui10', href: profile.github, Icon: GitHub },
]

const card =
  'spot group relative flex h-full items-center justify-between gap-4 overflow-hidden rounded-2xl border border-line bg-surface p-6'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const timer = useRef()

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="reveal">
          <p className="font-mono text-xs tracking-widest text-accent uppercase">05 / contact</p>
          <h2
            id="contact-title"
            className="mt-3 max-w-4xl font-display text-[clamp(2.4rem,6.5vw,5rem)] leading-none font-bold tracking-[-0.035em]"
          >
            Have a role or a project? <span className="text-accent">Let's talk.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-muted">
            I'm looking for a remote full-stack role, or one building AI features, integrations and business automation.
            Email is the fastest way to reach me.
          </p>
        </div>

        <ul className="reveal mt-12 grid gap-4 md:grid-cols-[1.4fr_1fr_1fr]">
          <li>
            <div className={card} onPointerMove={trackPointer}>
              <span className="spot-layer spot-border absolute inset-0 rounded-2xl" aria-hidden="true" />
              <span className="min-w-0">
                <span className="flex items-center gap-2 font-mono text-xs tracking-wider text-muted uppercase">
                  <Mail width={14} height={14} /> Email
                </span>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-2 block font-display text-lg font-semibold underline decoration-transparent decoration-2 underline-offset-4 [overflow-wrap:anywhere] hover:decoration-accent"
                >
                  {profile.email}
                </a>
              </span>
              <button
                type="button"
                onClick={copy}
                className="relative inline-flex h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold transition-colors duration-200 hover:border-ink"
              >
                {copied ? <Check width={16} height={16} className="text-emerald-500" /> : <Copy width={16} height={16} />}
                <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </li>
          {links.map(({ label, value, href, Icon }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noreferrer" className={`${card} link-arrow`} onPointerMove={trackPointer}>
                <span className="spot-layer spot-border absolute inset-0 rounded-2xl" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="flex items-center gap-2 font-mono text-xs tracking-wider text-muted uppercase">
                    <Icon width={14} height={14} /> {label}
                  </span>
                  <span className="mt-2 block font-display text-lg font-semibold [overflow-wrap:anywhere]">{value}</span>
                </span>
                <ArrowUpRight className="shrink-0 text-muted" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-8 text-sm text-muted sm:px-8">
          <p>© {new Date().getFullYear()} Saad Siddiqui</p>
          <p className="font-mono text-xs">Built with React, Vite and Tailwind CSS</p>
        </div>
      </footer>
    </section>
  )
}
