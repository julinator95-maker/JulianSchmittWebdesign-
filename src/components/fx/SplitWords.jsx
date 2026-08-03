import { motion, useReducedMotion } from 'motion/react'

// Überschrift, die Wort für Wort mit Blur-Up hereinkommt.
const container = {
  hidden: {},
  visible: ({ stagger, delay }) => ({
    transition: { staggerChildren: stagger, delayChildren: delay },
  }),
}

// Wörter wehen mit leichter Drift von links herein — "frischer Wind"
const wordVariant = {
  hidden: { opacity: 0, x: '-0.35em', y: '0.25em', filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function SplitWords({
  text,
  className = '',
  stagger = 0.07,
  delay = 0,
}) {
  const reduce = useReducedMotion()
  const words = text.split(' ')

  if (reduce) return <span className={className}>{text}</span>

  return (
    <motion.span
      className={className}
      variants={container}
      custom={{ stagger, delay }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
    >
      {/* Echtes Leerzeichen zwischen den Wörtern statt margin-Abstand:
          sonst extrahieren Suchmaschinen und Screenreader die Überschrift
          ohne Wortgrenzen ("KeinTeam,keineAgentur."). Die Leerzeichen-Breite
          entspricht optisch dem bisherigen 0.25em-Abstand. */}
      {words.map((w, i) => (
        <span key={i}>
          <motion.span variants={wordVariant} className="inline-block">
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </motion.span>
  )
}
