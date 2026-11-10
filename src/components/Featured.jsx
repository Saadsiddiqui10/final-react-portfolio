import { useEffect, useState } from 'react'
import { featured as f } from '../data.js'
import { reducedMotion, trackPointer, useInView } from '../hooks.js'
import { ArrowUpRight } from './Icons.jsx'
import { Frame, Shot } from './ProjectArt.jsx'
import Section, { Chip } from './Section.jsx'
import StoreDemo from './StoreDemo.jsx'

function CountUp({ value }) {
  const [, prefix, digits] = value.match(/^(\D*)(\d+)$/)
  const target = Number(digits)
  const [ref, seen] = useInView()
  const [n, setN] = useState(target)

  useEffect(() => {
    if (!seen || reducedMotion()) return
    const start = performance.now()
    let raf
    const tick = (t) => {
      const p = Math.min((t - start) / 900, 1)
      setN(Math.round(target * (1 - (1 - p) ** 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, target])

  return (
    <span ref={ref}>
      {prefix}
      {n}
    </span>
  )
}

export default function Featured() {
  return (
    <Section
      id="work"
      index="01"
      title="Featured work"
      intro="The project I'm proudest of: a real store, with real customers, that I took from an empty database to production."
    >
      <article className="reveal rounded-3xl border border-line bg-surface p-5 sm:p-8 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-12">
          <div>
            <p className="font-mono text-xs tracking-wider text-muted uppercase">{f.eyebrow}</p>
            <h3 className="mt-3 font-display text-5xl font-bold tracking-[-0.035em] sm:text-7xl">{f.title}</h3>
            <p className="mt-5 max-w-lg text-lg text-muted">{f.tagline}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
              {f.stack.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </ul>
            <a href={f.url} target="_blank" rel="noreferrer" className="btn-primary mt-8">
              Visit vanzapack.com <ArrowUpRight />
            </a>
          </div>

          <a
            href={f.url}
            target="_blank"
            rel="noreferrer"
            aria-label="Open vanzapack.com"
            onPointerMove={trackPointer}
            className="spot block overflow-hidden rounded-2xl border border-line"
          >
            <Frame label="vanzapack.com" hint="live" className="aspect-[16/11]">
              <Shot src={f.shot} alt="The VanzaPack storefront home page" />
            </Frame>
          </a>
        </div>

        <dl className="mt-10 grid grid-cols-3 gap-4 border-y border-line py-7 sm:gap-8">
          {f.stats.map((s) => (
            <div key={s.l} className="flex flex-col-reverse justify-end gap-1.5 sm:flex-row-reverse sm:items-center sm:justify-end sm:gap-4">
              <dt className="text-sm leading-snug text-muted sm:max-w-44">{s.l}</dt>
              <dd className="font-display text-4xl font-bold tracking-tight tabular-nums sm:text-6xl">
                <CountUp value={s.n} />
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10">
          <StoreDemo />
        </div>
      </article>
    </Section>
  )
}
