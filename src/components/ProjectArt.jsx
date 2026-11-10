import { useEffect, useRef, useState } from 'react'
import { Check, Reset } from './Icons.jsx'

/* Shared window chrome so every preview reads as the same kind of object. */
export function Frame({ label, hint, children, className = '' }) {
  return (
    <div className={`flex flex-col overflow-hidden bg-bg ${className}`}>
      <div className="flex h-9 shrink-0 items-center gap-3 border-b border-line px-3.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="size-2 rounded-full bg-line" />
          <i className="size-2 rounded-full bg-line" />
          <i className="size-2 rounded-full bg-line" />
        </span>
        <span className="min-w-0 flex-1 truncate font-mono text-[0.68rem] text-muted">{label}</span>
        {hint && (
          <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[0.6rem] text-muted">{hint}</span>
        )}
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  )
}

/* A real screenshot. Zooms toward the pointer while the card is hovered. */
export function Shot({ src, alt }) {
  return (
    <div className="shot absolute inset-0 overflow-hidden">
      <img src={src} alt={alt} width="1280" height="800" loading="lazy" decoding="async" className="size-full object-cover object-top" />
    </div>
  )
}

/* MARKET: pay, then watch the webhook do the bookkeeping. */
function Market() {
  const events = ['payment_intent.succeeded', 'signature verified', 'order #2291 → paid', 'stock 12 → 11']
  const [n, setN] = useState(0)
  const timers = useRef([])
  const clear = () => timers.current.forEach(clearTimeout)
  useEffect(() => clear, [])

  const pay = () => {
    clear()
    setN(0)
    timers.current = events.map((_, i) => setTimeout(() => setN(i + 1), 450 * (i + 1)))
  }
  const reset = () => {
    clear()
    setN(0)
  }
  const paid = n === events.length
  const busy = n > 0 && !paid

  return (
    <div className="grid h-full grid-cols-[1fr_1.15fr] text-xs">
      <div className="flex flex-col border-r border-line p-4">
        <p className="font-mono text-[0.65rem] text-muted uppercase">Checkout</p>
        <p className="mt-2 font-semibold">1 × Desk lamp</p>
        <p className="mt-0.5 font-mono text-muted tabular-nums">
          In stock: <span key={paid} className="pop inline-block text-ink">{paid ? 11 : 12}</span>
        </p>
        <p className="mt-2 flex items-center gap-1.5 font-mono">
          <span className={`size-1.5 rounded-full ${paid ? 'bg-emerald-500' : 'bg-line'}`} />
          {paid ? 'Paid' : 'Awaiting payment'}
        </p>
        <button
          type="button"
          onClick={paid ? reset : pay}
          disabled={busy}
          className="demo-btn mt-auto w-full justify-center bg-ink text-bg"
        >
          {paid ? (
            <>
              <Reset width={13} height={13} /> Run again
            </>
          ) : busy ? (
            'Processing…'
          ) : (
            'Pay 49.00'
          )}
        </button>
      </div>
      <div className="min-w-0 p-4">
        <p className="font-mono text-[0.65rem] text-muted uppercase">Stripe webhook</p>
        <ol className="mt-2 grid gap-1.5 font-mono text-[0.7rem]" aria-live="polite">
          {events.map((e, i) => (
            <li key={e} className={`flex items-center gap-2 transition-opacity duration-300 ${i < n ? '' : 'opacity-30'}`}>
              <span className={`grid size-4 shrink-0 place-items-center rounded-full border ${i < n ? 'border-spark bg-spark text-bg' : 'border-line'}`}>
                {i < n && <Check width={10} height={10} strokeWidth={3} />}
              </span>
              <span className="min-w-0 truncate">{e}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

/* Chattr: switch rooms and send a message (stays in this browser). */
const seed = {
  general: [
    { who: 'Ali', t: 'anyone tried the new build?' },
    { who: 'Sara', t: 'yes, file upload works now' },
  ],
  random: [{ who: 'Omar', t: 'lunch at 2?' }],
  tech: [
    { who: 'Sara', t: 'socket reconnect is fixed' },
    { who: 'Ali', t: 'typing events too' },
  ],
}

function Chattr() {
  const [room, setRoom] = useState('general')
  const [rooms, setRooms] = useState(seed)
  const [text, setText] = useState('')
  const send = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    setRooms((r) => ({ ...r, [room]: [...r[room], { who: 'You', t: text.trim() }] }))
    setText('')
  }
  const msgs = rooms[room].slice(-3)

  return (
    <div className="grid h-full grid-cols-[6.5rem_1fr] text-xs">
      <div className="border-r border-line p-2" role="group" aria-label="Rooms">
        {Object.keys(seed).map((r) => (
          <button
            key={r}
            type="button"
            aria-pressed={room === r}
            onClick={() => setRoom(r)}
            className="flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-1.5 font-mono text-muted hover:text-ink aria-pressed:bg-ink/10 aria-pressed:text-ink"
          >
            #{r}
            <span className="text-[0.6rem] tabular-nums opacity-60">{rooms[r].length}</span>
          </button>
        ))}
      </div>
      <div className="flex min-w-0 flex-col p-3">
        <div key={room} className="flex flex-1 flex-col justify-end gap-1.5">
          {msgs.map((m, i) => (
            <p
              key={`${i}-${m.t}`}
              className={`pop max-w-[88%] rounded-2xl px-3 py-1.5 [overflow-wrap:anywhere] ${
                m.who === 'You' ? 'self-end rounded-br-sm bg-ink text-bg' : 'self-start rounded-bl-sm border border-line bg-surface'
              }`}
            >
              {m.who !== 'You' && <span className="mr-1.5 font-mono text-[0.62rem] text-accent">{m.who}</span>}
              {m.t}
            </p>
          ))}
        </div>
        <p className="typing my-1.5 flex h-3 items-center gap-1 font-mono text-[0.62rem] text-muted" aria-hidden="true">
          {room === 'general' && (
            <>
              <i /> <i /> <i /> <span className="ml-1">Ali is typing</span>
            </>
          )}
        </p>
        <form onSubmit={send} className="flex gap-1.5">
          <label className="sr-only" htmlFor="chattr-msg">
            Message
          </label>
          <input
            id="chattr-msg"
            value={text}
            maxLength={60}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Message #${room}`}
            className="h-9 min-w-0 flex-1 rounded-full border border-line bg-surface px-3 outline-none placeholder:text-muted focus:border-ink"
          />
          <button type="submit" className="h-9 cursor-pointer rounded-full bg-ink px-3.5 font-semibold text-bg">
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

/* SNH: change quantities, apply the coupon, watch the totals. */
function Snh() {
  const [qty, setQty] = useState([2, 1])
  const [coupon, setCoupon] = useState(false)
  const lines = [
    ['Bubble wrap roll, 50 m', 45],
    ['Carton box, pack of 25', 80],
  ]
  const subtotal = lines.reduce((s, [, p], i) => s + p * qty[i], 0)
  const eligible = subtotal >= 150
  const off = coupon && eligible ? subtotal * 0.1 : 0
  const step = (i, d) => setQty((q) => q.map((v, j) => (j === i ? Math.max(0, Math.min(9, v + d)) : v)))

  return (
    <div className="flex h-full flex-col p-4 text-xs">
      <ul className="grid gap-2">
        {lines.map(([name, price], i) => (
          <li key={name} className="flex items-center gap-3">
            <span className="min-w-0 flex-1 truncate font-medium">{name}</span>
            <span className="flex items-center rounded-md border border-line">
              <button type="button" aria-label={`Fewer ${name}`} onClick={() => step(i, -1)} className="size-7 cursor-pointer hover:bg-ink/5">
                −
              </button>
              <span className="w-5 text-center font-mono tabular-nums">{qty[i]}</span>
              <button type="button" aria-label={`More ${name}`} onClick={() => step(i, 1)} className="size-7 cursor-pointer hover:bg-ink/5">
                +
              </button>
            </span>
            <span className="w-14 text-right font-mono tabular-nums">{(price * qty[i]).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-center gap-3 border-t border-dashed border-line pt-3">
        <button
          type="button"
          aria-pressed={coupon}
          onClick={() => setCoupon((v) => !v)}
          className="h-8 cursor-pointer rounded-md border border-dashed border-line px-2.5 font-mono font-semibold hover:border-ink aria-pressed:border-solid aria-pressed:border-spark aria-pressed:text-accent"
        >
          SAVE10
        </button>
        <span className="min-w-0 flex-1 text-muted">
          {!coupon ? 'Tap to apply · min. 150.00' : eligible ? `− ${off.toFixed(2)} applied` : 'Below the 150.00 minimum'}
        </span>
        <span key={subtotal - off} className="pop font-mono text-sm font-semibold tabular-nums">
          {(subtotal - off).toFixed(2)}
        </span>
      </div>
    </div>
  )
}

/* Atmos: hover or focus an hour to read its temperature. */
function Atmos() {
  const hours = [
    ['06', 21], ['09', 24], ['12', 29], ['15', 31], ['18', 28], ['21', 25], ['00', 23],
  ]
  const [i, setI] = useState(3)
  return (
    <div className="flex h-full flex-col p-4">
      <div className="flex items-end justify-between gap-3">
        <p className="font-display text-5xl leading-none font-bold tabular-nums">{hours[i][1]}°</p>
        <p className="text-right font-mono text-[0.68rem] text-muted">
          Karachi · {hours[i][0]}:00
          <br />
          sample forecast
        </p>
      </div>
      <div className="mt-3 flex min-h-0 flex-1 items-end gap-1.5">
        {hours.map(([h, t], idx) => (
          <button
            key={h}
            type="button"
            aria-label={`${h}:00, ${t} degrees`}
            aria-pressed={idx === i}
            onPointerEnter={() => setI(idx)}
            onFocus={() => setI(idx)}
            onClick={() => setI(idx)}
            className="group flex h-full flex-1 cursor-pointer flex-col justify-end"
          >
            <span
              className="block rounded-t bg-ink/15 transition-colors duration-150 group-aria-pressed:bg-spark"
              style={{ height: `${((t - 16) / 16) * 100}%` }}
            />
            <span className="mt-1 font-mono text-[0.6rem] text-muted group-aria-pressed:text-ink">{h}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* AutoVexaAI: wordmark placeholder until a screenshot is added. */
function Autovexa() {
  return (
    <div className="grid h-full place-items-center p-4 text-center">
      <div>
        <p className="font-display text-4xl leading-none font-bold tracking-tight">
          AutoVexa<span className="text-accent">AI</span>
        </p>
        <p className="mt-2 font-mono text-[0.68rem] text-muted">my own venture · built in React</p>
      </div>
    </div>
  )
}

/* Blood groups: pick a donor type to see who can receive it. */
const donatesTo = {
  'O−': ['O−', 'O+', 'A−', 'A+', 'B−', 'B+', 'AB−', 'AB+'],
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'A−': ['A−', 'A+', 'AB−', 'AB+'],
  'A+': ['A+', 'AB+'],
  'B−': ['B−', 'B+', 'AB−', 'AB+'],
  'B+': ['B+', 'AB+'],
  'AB−': ['AB−', 'AB+'],
  'AB+': ['AB+'],
}

function Blood() {
  const [donor, setDonor] = useState('O−')
  return (
    <div className="flex h-full flex-col justify-center p-4">
      <p className="mb-3 text-xs text-muted">
        Donor <strong className="font-mono text-ink">{donor}</strong> can give to{' '}
        <strong className="text-ink tabular-nums">{donatesTo[donor].length}</strong> of 8 groups
      </p>
      <div className="grid grid-cols-4 gap-2" role="group" aria-label="Donor blood group">
        {Object.keys(donatesTo).map((g) => {
          const receives = donatesTo[donor].includes(g)
          return (
            <button
              key={g}
              type="button"
              aria-pressed={g === donor}
              onClick={() => setDonor(g)}
              className={`relative h-12 cursor-pointer rounded-lg border font-mono text-sm font-semibold transition-colors duration-150 aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-bg ${
                receives ? 'border-spark text-ink' : 'border-line text-muted opacity-50'
              }`}
            >
              {g}
              {receives && g !== donor && <Check width={11} height={11} className="absolute top-1 right-1 text-accent" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

const mocks = {
  market: [Market, 'market · checkout', 'try it'],
  chattr: [Chattr, 'chattr · live rooms', 'try it'],
  autovexa: [Autovexa, 'autovexaai.com'],
  snh: [Snh, 'snh packing · cart', 'try it'],
  atmos: [Atmos, 'atmos · hourly', 'hover'],
  blood: [Blood, 'Blood Group Manager', 'try it'],
}

export default function ProjectArt({ project }) {
  const frame = 'art h-64 border-b border-line sm:h-72'
  if (project.shot) {
    return (
      <Frame label={project.shot.label} className={frame}>
        <Shot src={project.shot.src} alt={`Screenshot of ${project.name}`} />
      </Frame>
    )
  }
  const [Mock, label, hint] = mocks[project.id] ?? []
  if (!Mock) return null
  return (
    <Frame label={label} hint={hint} className={frame}>
      <Mock />
    </Frame>
  )
}
