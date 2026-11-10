import { useEffect, useRef, useState } from 'react'

// Writes the pointer position (as % of the element) into CSS variables.
export function trackPointer(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
  el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
}

export function useInView(options = { threshold: 0.4 }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSeen(true)
        io.disconnect()
      }
    }, options)
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return [ref, seen]
}

export function useActiveSection(ids) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])
  return active
}

const karachi = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit' })

export function useKarachiTime() {
  const [time, setTime] = useState(() => karachi.format(new Date()))
  useEffect(() => {
    const t = setInterval(() => setTime(karachi.format(new Date())), 15000)
    return () => clearInterval(t)
  }, [])
  return time
}

export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches
