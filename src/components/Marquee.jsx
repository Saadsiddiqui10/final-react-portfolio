const rows = [
  ['Laravel', 'React', 'Node.js', 'MySQL', 'MongoDB', 'Stripe', 'Tailwind', 'PHPUnit'],
  ['Claude API', 'Webhooks', 'Queues', 'Socket.io', 'Express', '.NET', 'Epicor ERP', 'Vite'],
]

// Two rows of stack names that slide in opposite directions as the page scrolls.
export default function Marquee() {
  return (
    <div className="scroll-rows overflow-hidden border-t border-line py-8 sm:py-10" aria-hidden="true">
      {rows.map((row, r) => (
        <div key={r} className={`scroll-row ${r ? 'scroll-row-b' : ''}`}>
          {[...row, ...row].map((word, i) => (
            <span key={i} className={i % 3 === r ? 'text-ink' : ''}>
              {word}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
