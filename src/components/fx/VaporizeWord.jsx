import { useEffect, useState } from 'react'
import VaporizeTextCycle, { Tag } from './VaporizeText'

function pickFontSize() {
  if (typeof window === 'undefined') return 72
  const w = window.innerWidth
  if (w >= 1024) return 72 // lg:text-7xl
  if (w >= 768) return 60 // md:text-6xl
  if (w >= 640) return 48 // sm:text-5xl
  return 38
}

export default function VaporizeWord({ words, color = 'rgb(177, 69, 82)' }) {
  const [fontSize, setFontSize] = useState(72)

  useEffect(() => {
    const update = () => setFontSize(pickFontSize())
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Layout span height matches actual text line (keeps headline spacing intact).
  // Canvas span is 3.5× taller, centered absolutely, so particles have room to
  // spread above and below the text without pushing surrounding elements apart.
  const lineH  = Math.round(fontSize * 1.15)
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
        <VaporizeTextCycle
          texts={words}
          // fontWeight 'italic 600' gives bold-italic strokes on the canvas →
          // more filled pixels → denser particle cloud (matches 21st.dev demo quality)
          font={{ fontFamily: 'Inter, sans-serif', fontSize: `${fontSize}px`, fontWeight: 'italic 600' }}
          color={color}
          spread={5}
          density={5}
          animation={{ vaporizeDuration: 1, fadeInDuration: 1, waitDuration: 1 }}
          direction="left-to-right"
          alignment="center"
          tag={Tag.P}
        />
      </span>
    </span>
  )
}
