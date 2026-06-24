import { useEffect, useState } from 'react'
import VaporizeTextCycle, { Tag } from './VaporizeText'

// Bricht die Schriftgröße auf die Headline-Breakpoints herunter,
// damit das Canvas-Wort exakt so groß ist wie der restliche Titel.
function pickFontSize() {
  if (typeof window === 'undefined') return 72
  const w = window.innerWidth
  if (w >= 1024) return 72 // lg:text-7xl
  if (w >= 768) return 60 // md:text-6xl
  if (w >= 640) return 48 // sm:text-5xl
  return 38 // text-[2.4rem]
}

export default function VaporizeWord({ words, color = 'rgb(177, 69, 82)' }) {
  const [fontSize, setFontSize] = useState(72)

  useEffect(() => {
    const update = () => setFontSize(pickFontSize())
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <span
      style={{ display: 'block', width: '100%', height: Math.round(fontSize * 2.0) }}
    >
      <VaporizeTextCycle
        texts={words}
        font={{ fontFamily: 'Inter, sans-serif', fontSize: `${fontSize}px`, fontWeight: 'italic 400' }}
        color={color}
        spread={5}
        density={8}
        animation={{ vaporizeDuration: 2.8, fadeInDuration: 1.3, waitDuration: 2.2 }}
        direction="left-to-right"
        alignment="center"
        tag={Tag.P}
      />
    </span>
  )
}
