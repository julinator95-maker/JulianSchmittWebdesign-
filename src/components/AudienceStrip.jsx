import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import Marquee from './fx/Marquee'
import VaporizeTextCycle, { Tag } from './fx/VaporizeText'

const ROW1 = ['Handwerker', 'Winzer', 'Gastronomie', 'Friseure', 'Restaurants', 'Weingüter']
const ROW2 = ['Cafés', 'Bäckereien', 'Kosmetik', 'Hofläden', 'Metzgereien', 'Vereine']

const PROMISES = ['Schnell.', 'Edel.', 'Schlüsselfertig.']

function Dot() {
  return <span className="mx-7 h-2 w-2 shrink-0 rounded-full bg-accent-bright md:mx-12" />
}

function Word({ children, outline = false }) {
  return (
    <span
      className="text-4xl font-light tracking-tight md:text-6xl"
      style={
        outline
          ? { color: 'transparent', WebkitTextStroke: '1px rgba(249,247,244,0.28)' }
          : { color: 'rgba(249,247,244,0.92)' }
      }
    >
      {children}
    </span>
  )
}

function buildRow(words, outline) {
  return words.flatMap((w, i) => [
    <Word key={`w-${i}`} outline={outline}>
      {w}
    </Word>,
    <Dot key={`d-${i}`} />,
  ])
}

export default function AudienceStrip() {
  const reduce = useReducedMotion()
  const [fontSize, setFontSize] = useState('72px')

  useEffect(() => {
    const update = () => setFontSize(window.innerWidth < 640 ? '44px' : '80px')
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <section className="relative overflow-hidden bg-night py-20 md:py-28">
      <div className="mx-auto mb-10 max-w-6xl px-6 md:px-12">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-bright">
          Frischer Wind für die Region Trier
        </p>
      </div>

      {/* Auflösende Headline – die Versprechen "verwehen" wie Wind */}
      <div className="mb-16 flex h-28 w-full items-center justify-center px-6 md:h-40">
        {reduce ? (
          <h2 className="text-center text-4xl font-light tracking-tight text-ivory md:text-7xl">
            Schnell. Edel. Schlüsselfertig.
          </h2>
        ) : (
          <VaporizeTextCycle
            texts={PROMISES}
            font={{ fontFamily: 'Inter, sans-serif', fontSize, fontWeight: 300 }}
            color="rgb(249, 247, 244)"
            spread={4}
            density={6}
            animation={{ vaporizeDuration: 2, fadeInDuration: 1, waitDuration: 0.8 }}
            direction="left-to-right"
            alignment="center"
            tag={Tag.H2}
          />
        )}
      </div>

      {/* Zielgruppen-Laufbänder */}
      <div className="space-y-5 md:space-y-7">
        <Marquee items={buildRow(ROW1, false)} direction="left" duration={34} />
        <Marquee items={buildRow(ROW2, true)} direction="right" duration={40} />
      </div>

      {/* Sanfte Kanten links/rechts */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-night to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-night to-transparent md:w-40" />
    </section>
  )
}
