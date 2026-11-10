import { modes, now, profile } from '../data.js'
import { trackPointer, useKarachiTime } from '../hooks.js'
import { ArrowDown, ArrowUpRight, GitHub, LinkedIn, Mail } from './Icons.jsx'

export default function Hero({ mode, onMode, onOpenPalette }) {
  const time = useKarachiTime()
  const m = modes[mode]

  return (
    <section id="top" className="spot relative overflow-hidden" onPointerMove={trackPointer}>
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-grid hero-glow spot-layer absolute inset-0" aria-hidden="true" />

      <div className="hero-out relative mx-auto grid max-w-6xl gap-12 px-5 pt-16 pb-20 sm:px-8 sm:pt-24 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16 lg:pb-28">
        <div>
          <div className="rise" style={{ '--i': 0 }}>
            <p id="mode-label" className="font-mono text-xs tracking-wider text-muted uppercase">
              Show me the
            </p>
            <div role="group" aria-labelledby="mode-label" className="mode-switch mt-2.5">
              {Object.entries(modes).map(([id, x]) => (
                <button key={id} type="button" aria-pressed={mode === id} onClick={() => onMode(id)}>
                  {x.label}
                </button>
              ))}
              <span className="font-mono text-xs text-muted">developer</span>
            </div>
          </div>

          <h1
            key={mode}
            className="mt-7 font-display text-[clamp(2.6rem,7.2vw,5.5rem)] leading-[0.98] font-bold tracking-[-0.035em]"
          >
            {m.lead.map((w, i) => (
              <span key={i}>
                <span className="word" style={{ '--i': i }}>
                  <span>{w}</span>
                </span>{' '}
              </span>
            ))}
            <span className="text-accent">
              {m.accent.map((w, i) => (
                <span key={i}>
                  <span className="word" style={{ '--i': m.lead.length + i }}>
                    <span>{w}</span>
                  </span>
                  {i < m.accent.length - 1 && ' '}
                </span>
              ))}
            </span>
          </h1>

          <p key={`${mode}-p`} className="rise mt-7 max-w-xl text-lg text-muted sm:text-xl" style={{ '--i': 3 }}>
            I'm <strong className="font-semibold text-ink">Saad Siddiqui</strong>, {m.intro}
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ '--i': 4 }}>
            <a href="#work" className="btn-primary">
              See my work <ArrowDown />
            </a>
            <a href={`mailto:${profile.email}`} className="btn-ghost">
              <Mail /> Email me
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" className="btn-icon">
              <GitHub />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="btn-icon">
              <LinkedIn />
            </a>
          </div>

          <p className="rise mt-6 hidden text-sm text-muted sm:block" style={{ '--i': 5 }}>
            Or press{' '}
            <button
              type="button"
              onClick={onOpenPalette}
              className="cursor-pointer rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-xs text-ink hover:border-ink"
            >
              Ctrl K
            </button>{' '}
            to jump anywhere on this page.
          </p>
        </div>

        <aside className="rise rounded-2xl border border-line bg-surface p-2" style={{ '--i': 5 }} aria-label="Current roles">
          <dl className="divide-y divide-line">
            {now.map((row) => (
              <div key={row.k} className="grid grid-cols-[4.5rem_1fr] gap-3 px-4 py-4">
                <dt className="pt-0.5 font-mono text-xs tracking-wider text-muted uppercase">{row.k}</dt>
                <dd>
                  {row.href ? (
                    <a
                      href={row.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link-arrow inline-flex items-center gap-1 font-display text-lg leading-tight font-semibold underline decoration-line decoration-2 underline-offset-4 hover:decoration-accent"
                    >
                      {row.v} <ArrowUpRight width={16} height={16} />
                    </a>
                  ) : (
                    <span className="font-display text-lg leading-tight font-semibold">{row.v}</span>
                  )}
                  <span className="mt-1 block text-sm text-muted">{row.sub}</span>
                </dd>
              </div>
            ))}
            <div className="grid grid-cols-[4.5rem_1fr] gap-3 px-4 py-4">
              <dt className="pt-0.5 font-mono text-xs tracking-wider text-muted uppercase">Local</dt>
              <dd>
                <span className="font-mono text-lg font-medium tabular-nums">{time}</span>
                <span className="mt-1 block text-sm text-muted">Karachi, Pakistan (UTC+5) · open to remote</span>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  )
}
