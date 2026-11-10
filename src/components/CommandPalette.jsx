import { useEffect, useMemo, useState } from 'react'
import { featured, nav, profile } from '../data.js'
import { toggleScheme } from '../theme.js'
import { Search } from './Icons.jsx'

const goTo = (hash) => () => document.querySelector(hash)?.scrollIntoView()
const open = (url) => () => window.open(url, '_blank', 'noopener')

const commands = [
  ...nav.map((n) => ({ label: `Go to ${n.label}`, group: 'Navigate', run: goTo(n.href) })),
  { label: 'Open vanzapack.com', group: 'Links', run: open(featured.url) },
  { label: 'Open GitHub', group: 'Links', run: open(profile.github) },
  { label: 'Open LinkedIn', group: 'Links', run: open(profile.linkedin) },
  { label: 'Copy email address', group: 'Actions', run: () => navigator.clipboard?.writeText(profile.email) },
  { label: 'Write me an email', group: 'Actions', run: () => (location.href = `mailto:${profile.email}`) },
  { label: 'Switch light / dark theme', group: 'Actions', run: toggleScheme },
]

export default function CommandPalette({ dialogRef }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? commands.filter((c) => `${c.label} ${c.group}`.toLowerCase().includes(q)) : commands
  }, [query])

  useEffect(() => {
    const dialog = dialogRef.current
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        dialog.open ? dialog.close() : dialog.showModal()
      }
    }
    const onClose = () => {
      setQuery('')
      setActive(0)
    }
    window.addEventListener('keydown', onKey)
    dialog.addEventListener('close', onClose)

    // Click-outside fallback where `closedby` is not supported.
    let pressedOutside = false
    const outside = (e) => {
      const r = dialog.getBoundingClientRect()
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom
    }
    const down = (e) => (pressedOutside = outside(e))
    const up = (e) => pressedOutside && outside(e) && dialog.close()
    const needsFallback = !('closedBy' in HTMLDialogElement.prototype)
    if (needsFallback) {
      dialog.addEventListener('pointerdown', down)
      dialog.addEventListener('pointerup', up)
    }
    return () => {
      window.removeEventListener('keydown', onKey)
      dialog.removeEventListener('close', onClose)
      dialog.removeEventListener('pointerdown', down)
      dialog.removeEventListener('pointerup', up)
    }
  }, [dialogRef])

  const run = (cmd) => {
    dialogRef.current.close()
    cmd?.run()
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (i + 1) % Math.max(results.length, 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (i - 1 + results.length) % Math.max(results.length, 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(results[active])
    }
  }

  return (
    <dialog ref={dialogRef} closedby="any" aria-label="Command palette" className="palette">
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search className="shrink-0 text-muted" />
        <input
          autoFocus
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={results[active] ? `cmd-${active}` : undefined}
          aria-label="Search commands"
          placeholder="Jump to a section, open a link…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setActive(0)
          }}
          onKeyDown={onKeyDown}
          className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted"
        />
        <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[0.7rem] text-muted">Esc</kbd>
      </div>
      <ul id="palette-list" role="listbox" aria-label="Commands" className="max-h-[min(22rem,55vh)] overflow-y-auto p-2">
        {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">Nothing matches “{query}”.</li>}
        {results.map((c, i) => (
          <li
            key={c.label}
            id={`cmd-${i}`}
            role="option"
            aria-selected={i === active}
            onPointerMove={() => setActive(i)}
            onClick={() => run(c)}
            className="flex cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-sm aria-selected:bg-ink aria-selected:text-bg"
          >
            <span className="font-medium">{c.label}</span>
            <span className="font-mono text-[0.7rem] tracking-wider uppercase opacity-60">{c.group}</span>
          </li>
        ))}
      </ul>
    </dialog>
  )
}
