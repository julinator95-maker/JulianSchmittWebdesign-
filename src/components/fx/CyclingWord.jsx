import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

// Wort-Zyklus im "Wind"-Look: Buchstaben verschwimmen und wehen nach
// rechts davon, das nächste Wort weht von links herein. Reiner Text,
// erbt Schriftgröße/Stil vom Eltern-Element – läuft zuverlässig endlos.
export default function CyclingWord({ words, interval = 2600 }) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => {
      setIndex((p) => (p + 1) % words.length)
    }, interval)
    return () => clearInterval(id)
  }, [words.length, interval, reduce])

  if (reduce) return <>{words[0]}</>

  const word = words[index]

  return (
    <span className="inline-block" style={{ minHeight: '1em' }}>
      <AnimatePresence mode="wait">
        <motion.span key={word} className="inline-block whitespace-nowrap">
          {word.split('').map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, x: -16, filter: 'blur(12px)' }}
              animate={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: 44, y: -12, filter: 'blur(16px)' }}
              transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {ch}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
