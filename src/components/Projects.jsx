import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { filters, modes, profile, projects } from '../data.js'
import { trackPointer } from '../hooks.js'
import { ArrowUpRight, GitHub } from './Icons.jsx'
import ProjectArt from './ProjectArt.jsx'
import Section, { Chip } from './Section.jsx'

export default function Projects({ mode }) {
  const [filter, setFilter] = useState(modes[mode].filter)
  // The hero lens picks the starting filter; the buttons below still override it.
  useEffect(() => setFilter(modes[mode].filter), [mode])
  const shown = filter === 'all' ? projects : projects.filter((p) => p.tags.includes(filter))
  const count = (id) => (id === 'all' ? projects.length : projects.filter((p) => p.tags.includes(id)).length)

  const choose = (id) => {
    if (id === filter) return
    if (document.startViewTransition) {
      document.startViewTransition(() => flushSync(() => setFilter(id)))
    } else {
      setFilter(id)
    }
  }

  return (
    <Section
      id="projects"
      index="02"
      title="Projects"
      intro="Things I've built to learn a stack properly: payments, sockets, LLM calls and plain solid CRUD. The previews are small working mock-ups, so go ahead and click."
    >
      <div className="reveal mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={f.id === filter}
            onClick={() => choose(f.id)}
            className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-medium text-muted transition-colors duration-200 hover:border-ink hover:text-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-bg"
          >
            {f.label}
            <span className="font-mono text-[0.7rem] tabular-nums opacity-60">{count(f.id)}</span>
          </button>
        ))}
      </div>

      <ul className="grid gap-5 md:grid-cols-2">
        {shown.map((p, i) => (
          <li key={p.id} style={{ viewTransitionName: `project-${p.id}` }}>
            <article
              onPointerMove={trackPointer}
              className="spot group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface"
            >
              <span className="spot-layer spot-border absolute inset-0 rounded-2xl" aria-hidden="true" />
              <ProjectArt project={p} />
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-mono text-xs tracking-wider text-muted uppercase">{p.kind}</p>
                  <span className="font-mono text-xs text-muted tabular-nums" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-2xl leading-tight font-bold tracking-tight sm:text-3xl">{p.name}</h3>
                <p className="mt-3 text-muted">{p.desc}</p>

                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
                  {p.stack.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-x-5 gap-y-1 pt-6">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${l.label}: ${p.name}`}
                      className="link-arrow inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-200 hover:decoration-current"
                    >
                      {l.label} <ArrowUpRight width={16} height={16} />
                    </a>
                  ))}
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-muted">
        More on{' '}
        <a
          href={`${profile.github}?tab=repositories`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-accent"
        >
          <GitHub width={16} height={16} /> GitHub
        </a>
        .
      </p>
    </Section>
  )
}
