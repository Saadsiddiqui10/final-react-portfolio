import { experience } from '../data.js'
import { ArrowUpRight } from './Icons.jsx'
import Section from './Section.jsx'

export default function Experience() {
  return (
    <Section id="experience" index="03" title="Experience">
      <ol className="grid gap-5">
        {experience.map((e) => (
          <li
            key={e.org}
            className="reveal grid gap-6 rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:grid-cols-[1fr_1.6fr] lg:gap-12"
          >
            <div>
              <p className="font-mono text-xs tracking-wider text-accent uppercase">{e.when}</p>
              <h3 className="mt-3 font-display text-2xl leading-tight font-bold tracking-tight">{e.role}</h3>
              <p className="mt-2">
                <a
                  href={e.orgUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-semibold underline decoration-line decoration-2 underline-offset-4 hover:decoration-accent"
                >
                  {e.org} <ArrowUpRight width={16} height={16} />
                </a>
                <span className="text-muted"> · {e.where}</span>
              </p>
              <p className="mt-3 text-sm text-muted">{e.about}</p>
            </div>
            <ul className="grid content-start gap-3">
              {e.points.map((pt) => (
                <li key={pt} className="grid grid-cols-[1.25rem_1fr] text-muted">
                  <span className="mt-[0.7em] size-1.5 rounded-full bg-spark" aria-hidden="true" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="reveal mt-5 grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <h3 className="font-mono text-xs tracking-wider text-muted uppercase">Education</h3>
          <p className="mt-3 font-display text-xl font-semibold">BS Computer Science</p>
          <p className="text-muted">Iqra University, Karachi</p>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <h3 className="font-mono text-xs tracking-wider text-muted uppercase">Languages</h3>
          <p className="mt-3 font-display text-xl font-semibold">English · Urdu</p>
          <p className="text-muted">Professional · Native</p>
        </div>
      </div>
    </Section>
  )
}
