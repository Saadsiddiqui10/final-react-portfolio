import { useMemo, useReducer, useRef, useState } from 'react'
import { featured } from '../data.js'
import { Check, Reset, Search } from './Icons.jsx'

/* ---------- Storefront: search, category filter and sort ---------- */

const catalog = [
  { n: 'Kraft paper cup, 8 oz', c: 'Cups', p: 0.42 },
  { n: 'Double-wall cup, 12 oz', c: 'Cups', p: 0.68 },
  { n: 'Clear PET cup, 16 oz', c: 'Cups', p: 0.55 },
  { n: 'Burger box, kraft', c: 'Boxes', p: 0.74 },
  { n: 'Pizza box, 12 inch', c: 'Boxes', p: 1.1 },
  { n: 'Meal box, 2 compartments', c: 'Boxes', p: 0.95 },
  { n: 'Paper carry bag, medium', c: 'Bags', p: 0.38 },
  { n: 'Twisted-handle bag, large', c: 'Bags', p: 0.6 },
]
const cats = ['All', 'Cups', 'Boxes', 'Bags']
const sorts = {
  featured: { label: 'Featured', fn: null },
  low: { label: 'Price: low to high', fn: (a, b) => a.p - b.p },
  high: { label: 'Price: high to low', fn: (a, b) => b.p - a.p },
  az: { label: 'Name: A to Z', fn: (a, b) => a.n.localeCompare(b.n) },
}

function Storefront() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')
  const [sort, setSort] = useState('featured')

  const list = useMemo(() => {
    const term = q.trim().toLowerCase()
    const out = catalog.filter((i) => (cat === 'All' || i.c === cat) && i.n.toLowerCase().includes(term))
    return sorts[sort].fn ? [...out].sort(sorts[sort].fn) : out
  }, [q, cat, sort])

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <label className="flex h-10 min-w-40 flex-1 items-center gap-2 rounded-lg border border-line bg-surface px-3 focus-within:border-ink">
          <Search width={15} height={15} className="text-muted" />
          <span className="sr-only">Search products</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
          />
        </label>
        <label>
          <span className="sr-only">Sort by</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-10 cursor-pointer rounded-lg border border-line bg-surface px-2 text-sm"
          >
            {Object.entries(sorts).map(([k, s]) => (
              <option key={k} value={k}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Category">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
            className="h-8 cursor-pointer rounded-full border border-line px-3 text-xs font-medium text-muted transition-colors hover:text-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-bg"
          >
            {c}
          </button>
        ))}
        <span className="ml-auto self-center font-mono text-xs text-muted tabular-nums" aria-live="polite">
          {list.length} of {catalog.length}
        </span>
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {list.map((i) => (
          <li key={i.n} className="pop rounded-lg border border-line bg-surface p-3">
            <div className="mb-2 h-10 rounded bg-ink/5" aria-hidden="true" />
            <p className="text-xs leading-snug font-medium">{i.n}</p>
            <p className="mt-1 font-mono text-xs text-muted tabular-nums">AED {i.p.toFixed(2)}</p>
          </li>
        ))}
        {list.length === 0 && <li className="col-span-full py-6 text-center text-sm text-muted">No products match.</li>}
      </ul>
    </div>
  )
}

/* ---------- Orders: status workflow with automatic restock ---------- */

const steps = ['Pending', 'Confirmed', 'Shipped', 'Delivered']
const QTY = 2
const orderInit = {
  step: 0,
  cancelled: false,
  stock: 46,
  log: ['Order #1042 placed · stock 48 → 46', 'Email queued: order received'],
}

function orderReducer(s, action) {
  if (action === 'reset') return orderInit
  if (s.cancelled || s.step === 3) return s
  if (action === 'advance') {
    const step = s.step + 1
    return { ...s, step, log: [...s.log, `Status → ${steps[step]}`, `Email queued: order ${steps[step].toLowerCase()}`] }
  }
  if (action === 'cancel') {
    return {
      ...s,
      cancelled: true,
      stock: s.stock + QTY,
      log: [...s.log, 'Status → Cancelled', `Stock restored +${QTY} · ${s.stock} → ${s.stock + QTY}`, 'Email queued: order cancelled'],
    }
  }
  return s
}

function Orders() {
  const [s, dispatch] = useReducer(orderReducer, orderInit)
  const done = s.cancelled || s.step === 3

  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_15rem]">
      <div>
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-xs text-muted">ORDER #1042 · 2 × Burger box, kraft</p>
          <p className="font-mono text-xs tabular-nums">
            In stock: <strong key={s.stock} className="pop inline-block text-accent">{s.stock}</strong>
          </p>
        </div>
        <ol className="mt-4 grid grid-cols-4 gap-1.5">
          {steps.map((label, i) => {
            const reached = i <= s.step && !s.cancelled
            return (
              <li key={label}>
                <div className={`h-1.5 rounded-full transition-colors duration-300 ${reached ? 'bg-spark' : 'bg-line'}`} />
                <p className={`mt-2 text-xs ${reached ? 'font-semibold' : 'text-muted'}`}>{label}</p>
              </li>
            )
          })}
        </ol>
        {s.cancelled && <p className="mt-3 text-sm font-semibold text-accent">Cancelled. Inventory was restocked automatically.</p>}
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" disabled={done} onClick={() => dispatch('advance')} className="demo-btn bg-ink text-bg">
            Advance status
          </button>
          <button type="button" disabled={done} onClick={() => dispatch('cancel')} className="demo-btn border border-line">
            Cancel order
          </button>
          <button type="button" onClick={() => dispatch('reset')} className="demo-btn text-muted hover:text-ink">
            <Reset width={14} height={14} /> Reset
          </button>
        </div>
      </div>
      <div className="rounded-lg border border-line bg-surface p-3">
        <p className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">Activity log</p>
        <ol className="mt-2 flex max-h-40 flex-col gap-1.5 overflow-y-auto font-mono text-[0.7rem] leading-snug" aria-live="polite">
          {[...s.log].reverse().map((l, i) => (
            <li key={s.log.length - i} className={i === 0 ? 'pop text-ink' : 'text-muted'}>
              {l}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

/* ---------- Payments: pluggable gateway layer ---------- */

const gateways = [
  { id: 'cod', name: 'Cash on delivery', cls: 'CashOnDeliveryGateway', live: true },
  { id: 'bank', name: 'Bank transfer', cls: 'BankTransferGateway', live: true },
  { id: 'card', name: 'Card', cls: 'CardGateway', live: false },
]

function Payments() {
  const [id, setId] = useState('cod')
  const g = gateways.find((x) => x.id === id)

  return (
    <div className="grid gap-4 sm:grid-cols-[13rem_1fr]">
      <fieldset className="grid content-start gap-1.5">
        <legend className="mb-2 font-mono text-[0.68rem] tracking-wider text-muted uppercase">Gateway</legend>
        {gateways.map((x) => (
          <label
            key={x.id}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-line bg-surface px-3 py-2.5 text-sm has-checked:border-ink"
          >
            <input type="radio" name="gateway" checked={id === x.id} onChange={() => setId(x.id)} className="accent-(--color-spark)" />
            <span className="font-medium">{x.name}</span>
            <span className="ml-auto font-mono text-[0.65rem] text-muted">{x.live ? 'live' : 'slot'}</span>
          </label>
        ))}
      </fieldset>
      <div>
        <pre className="overflow-x-auto rounded-lg border border-line bg-surface p-4 font-mono text-[0.72rem] leading-relaxed">
          <code>
            <span className="text-muted">{'// checkout only ever talks to the manager\n'}</span>
            {'$gateway = $payments->driver('}
            <span key={id} className="pop inline-block text-accent">'{id}'</span>
            {');\n$result  = $gateway->initiate($order);\n\n'}
            <span className="text-muted">{'// each method is one class behind one interface\n'}</span>
            {'class '}
            <span key={g.cls} className="pop inline-block text-accent">{g.cls}</span>
            {' implements PaymentGateway {}'}
          </code>
        </pre>
        <p className="mt-3 text-sm text-muted">
          {g.live
            ? `${g.name} runs in production today.`
            : 'Not enabled yet. Adding it means one new class and a webhook route; the checkout code stays untouched.'}
        </p>
        <p className="mt-1 font-mono text-[0.68rem] text-muted">Simplified sketch of the pattern, not the production source.</p>
      </div>
    </div>
  )
}

/* ---------- SEO: structured data ---------- */

const ld = {
  Product: `{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Burger box, kraft",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "AED",
    "availability": "https://schema.org/InStock"
  }
}`,
  BreadcrumbList: `{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home" },
    { "@type": "ListItem", "position": 2, "name": "Boxes" },
    { "@type": "ListItem", "position": 3, "name": "Burger box, kraft" }
  ]
}`,
}

function Seo() {
  const [type, setType] = useState('Product')
  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Schema type">
        {Object.keys(ld).map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={type === t}
            onClick={() => setType(t)}
            className="h-8 cursor-pointer rounded-full border border-line px-3 font-mono text-xs text-muted hover:text-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-bg"
          >
            {t}
          </button>
        ))}
        <span className="ml-auto inline-flex items-center gap-1 font-mono text-xs text-muted">
          <Check width={14} height={14} className="text-emerald-500" /> in every product page
        </span>
      </div>
      <pre key={type} className="pop mt-3 max-h-56 overflow-auto rounded-lg border border-line bg-surface p-4 font-mono text-[0.72rem] leading-relaxed">
        <code>{`<script type="application/ld+json">\n${ld[type]}\n</script>`}</code>
      </pre>
    </div>
  )
}

/* ---------- Tabbed shell ---------- */

const panels = [Storefront, Orders, Payments, Seo]
const tabLabels = ['Storefront', 'Orders', 'Payments', 'SEO']

export default function StoreDemo() {
  const [active, setActive] = useState(0)
  const tabs = useRef([])

  const onKeyDown = (e) => {
    const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]
    let next = delta ? (active + delta + panels.length) % panels.length : null
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = panels.length - 1
    if (next === null) return
    e.preventDefault()
    setActive(next)
    tabs.current[next].focus()
    tabs.current[next].scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-bg">
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="size-2.5 rounded-full bg-line" />
          <i className="size-2.5 rounded-full bg-line" />
          <i className="size-2.5 rounded-full bg-line" />
        </span>
        <p className="font-mono text-xs text-muted">How it works · try it</p>
        <p className="ml-auto hidden font-mono text-[0.68rem] text-muted sm:block">Illustrative data, not the live store</p>
      </div>

      <div className="grid lg:grid-cols-[15rem_1fr]">
        <div
          role="tablist"
          aria-label="VanzaPack walkthrough"
          onKeyDown={onKeyDown}
          className="flex overflow-x-auto border-b border-line lg:flex-col lg:overflow-visible lg:border-r lg:border-b-0"
        >
          {tabLabels.map((label, i) => (
            <button
              key={label}
              ref={(el) => (tabs.current[i] = el)}
              type="button"
              role="tab"
              id={`demo-tab-${i}`}
              aria-selected={active === i}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              className="demo-tab"
            >
              <span className="font-mono text-xs text-accent" aria-hidden="true">
                0{i + 1}
              </span>
              {label}
            </button>
          ))}
        </div>

        <div>
          {panels.map((Panel, i) => (
            <div key={i} role="tabpanel" aria-labelledby={`demo-tab-${i}`} hidden={active !== i}>
              <div className="p-5 sm:p-7">
                <h4 className="font-display text-lg font-semibold">{featured.points[i].h}</h4>
                <p className="mt-1 mb-5 max-w-2xl text-[0.95rem] text-muted">{featured.points[i].p}</p>
                <Panel />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
