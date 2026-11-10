export const SCHEME_KEY = 'color-scheme'

const meta = () => document.querySelector('meta[name="color-scheme"]')

export function setSchemeMeta(value) {
  meta().content = value ?? 'light dark'
}

// Two-state toggle: "system" (nothing stored) or a literal override.
export function toggleScheme() {
  const system = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  const current = meta().content
  const rendered = current === 'light' || current === 'dark' ? current : system
  const target = rendered === 'dark' ? 'light' : 'dark'
  const stored = target === system ? null : target
  try {
    if (stored) localStorage.setItem(SCHEME_KEY, stored)
    else localStorage.removeItem(SCHEME_KEY)
  } catch {}
  setSchemeMeta(stored)
}
