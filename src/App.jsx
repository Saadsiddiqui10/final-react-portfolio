import { useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import CommandPalette from './components/CommandPalette.jsx'
import Contact from './components/Contact.jsx'
import Experience from './components/Experience.jsx'
import Featured from './components/Featured.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'

export default function App() {
  const palette = useRef(null)
  const openPalette = () => palette.current?.showModal()
  const [mode, setMode] = useState('fullstack')

  const changeMode = (next) => {
    if (next === mode) return
    if (document.startViewTransition) document.startViewTransition(() => flushSync(() => setMode(next)))
    else setMode(next)
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <Header onOpenPalette={openPalette} />
      <main id="main">
        <Hero mode={mode} onMode={changeMode} onOpenPalette={openPalette} />
        <Marquee />
        <Featured />
        <Projects mode={mode} />
        <Experience />
        <Skills mode={mode} />
        <Contact />
      </main>
      <CommandPalette dialogRef={palette} />
    </>
  )
}
