export default function Section({ id, index, title, intro, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <header className="reveal mb-12 max-w-2xl sm:mb-16">
          <p className="font-mono text-xs tracking-widest text-accent uppercase">
            {index} / {id}
          </p>
          <h2
            id={`${id}-title`}
            className="mt-3 font-display text-4xl leading-[1.05] font-bold tracking-[-0.03em] sm:text-5xl"
          >
            {title}
          </h2>
          {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}

export function Chip({ children }) {
  return (
    <li className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.72rem] leading-none text-muted">
      {children}
    </li>
  )
}
