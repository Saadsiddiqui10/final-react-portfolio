import { useMemo, useState } from 'react'
import { featured, modes, projects, skills } from '../data.js'
import Section from './Section.jsx'

const norm = (s) =>
  s
    .toLowerCase()
    .replace(/\.js\b/g, '')
    .replace(/\(.*?\)/g, '')
    .replace(/\b(css|api|payment intents|auth|design)\b/g, '')
    .replace(/[\d.]+$/g, '')
    .trim()

const work = [{ id: 'work', name: featured.title, stack: featured.stack, href: '#work' }, ...projects.map((p) => ({ ...p, href: '#projects' }))]

// skill label -> the projects whose stack lists it
function usedIn(skill) {
  const key = norm(skill)
  const words = key.split(' ')
  return work.filter((w) =>
    w.stack.some((s) => {
      const n = norm(s)
      return n === key || n.split(' ')[0] === key || (words.length > 1 && words[0] !== 'react' && words.includes(n))
    }),
  )
}

export default function Skills({ mode }) {
  const [picked, setPicked] = useState('React 18')
  const index = useMemo(() => Object.fromEntries(skills.flatMap((g) => g.items).map((s) => [s, usedIn(s)])), [])

  const first = modes[mode].skillsFirst
  const groups = [...skills].sort((a, b) => {
    const ia = first.indexOf(a.group)
    const ib = first.indexOf(b.group)
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib)
  })
  const hits = index[picked] ?? []

  return (
    <Section
      id="skills"
      index="04"
      title="Skills"
      intro="Pick a skill to see where I've actually used it. The underlined ones link to work on this page."
    >
      <div className="reveal grid gap-8 lg:grid-cols-[1fr_19rem] lg:gap-12">
        <dl className="border-t border-line">
          {groups.map((g) => (
            <div
              key={g.group}
              style={{ viewTransitionName: `skill-${g.group.replace(/\W+/g, '-')}` }}
              className="grid gap-3 border-b border-line py-5 md:grid-cols-[13rem_1fr] md:gap-6"
            >
              <dt className="font-display text-lg font-semibold">{g.group}</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((it) =>
                    index[it].length ? (
                      <li key={it}>
                        <button
                          type="button"
                          aria-pressed={picked === it}
                          onClick={() => setPicked(it)}
                          onPointerEnter={(e) => e.pointerType === 'mouse' && setPicked(it)}
                          className="skill-chip"
                        >
                          {it}
                        </button>
                      </li>
                    ) : (
                      <li key={it} className="rounded-lg border border-line px-3 py-1.5 text-sm text-muted">
                        {it}
                      </li>
                    ),
                  )}
                </ul>
              </dd>
            </div>
          ))}
        </dl>

        <aside className="lg:sticky lg:top-24 lg:self-start" aria-live="polite">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <p className="font-mono text-xs tracking-wider text-muted uppercase">Used in</p>
            <p key={picked} className="pop mt-2 font-display text-2xl leading-tight font-bold">
              {picked}
            </p>
            <ul key={`${picked}-list`} className="mt-4 grid gap-1">
              {hits.map((w, i) => (
                <li key={w.id} className="pop" style={{ animationDelay: `${i * 40}ms` }}>
                  <a
                    href={w.href}
                    className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-ink/5"
                  >
                    {w.name}
                    <span className="font-mono text-[0.68rem] text-muted">{w.id === 'work' ? 'client' : 'project'}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-line pt-4 font-mono text-xs text-muted tabular-nums">
              {hits.length} of {work.length} builds
            </p>
          </div>
        </aside>
      </div>
    </Section>
  )
}
