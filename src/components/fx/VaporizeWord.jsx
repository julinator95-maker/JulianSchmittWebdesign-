import { useEffect, useState } from 'react'
import VaporizeTextCycle, { Tag } from './VaporizeText'

// Plus Jakarta Sans 700 Italic (User-Wahl) — dynamischer Sans-Kursiv-Look.
// Der Canvas muss auf die geladene Font warten, sonst sampelt er die
// Fallback-Schrift und zerstäubt die falschen Pixel.
const CANVAS_FONT = "'Plus Jakarta Sans', Inter, sans-serif"

function pickFontSize() {
  if (typeof window === 'undefined') return 76
  const w = window.innerWidth
  if (w >= 1024) return 76 // lg:text-7xl
  if (w >= 768) return 64 // md:text-6xl
  if (w >= 640) return 52 // sm:text-5xl
  return 42
}

export default function VaporizeWord({ words, color = 'rgb(177, 69, 82)' }) {
  const [fontSize, setFontSize] = useState(pickFontSize)
  const [fontReady, setFontReady] = useState(
    () => typeof document === 'undefined' || !document.fonts?.load
  )

  useEffect(() => {
    const update = () => setFontSize(pickFontSize())
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    if (fontReady) return
    let cancelled = false
    Promise.all([
      document.fonts.load(`italic 700 76px 'Plus Jakarta Sans'`),
      document.fonts.ready,
    ])
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setFontReady(true)
      })
    return () => {
      cancelled = true
    }
  }, [fontReady])

  // Layout span height matches actual text line (keeps headline spacing intact).
  // Canvas span is 3.5× taller, centered absolutely, so particles have room to
  // spread above and below the text without pushing surrounding elements apart.
  const lineH = Math.round(fontSize * 1.15)
  const canvasH = Math.round(fontSize * 3.5)

  return (
    <span style={{ display: 'block', width: '100%', height: lineH, position: 'relative' }}>
      <span style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        height: canvasH,
        pointerEvents: 'none',
      }}>
        {fontReady && (
          <VaporizeTextCycle
            texts={words}
            font={{ fontFamily: CANVAS_FONT, fontSize: `${fontSize}px`, fontWeight: 'italic 700' }}
            color={color}
            spread={5}
            density={5}
            // fadeIn kurz: das nächste Wort soll fast sofort da sein
            animation={{ vaporizeDuration: 2, fadeInDuration: 0.4, waitDuration: 0.8 }}
            direction="left-to-right"
            alignment="center"
            tag={Tag.P}
          />
        )}
      </span>
    </span>
  )
}
