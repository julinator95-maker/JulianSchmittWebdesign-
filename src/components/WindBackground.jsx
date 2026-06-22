import { motion, useReducedMotion } from 'motion/react'

// Mehrschichtiger "Wind"-Hintergrund: driftende Aurora-Schleier,
// durchziehende Streifen und schwebende Partikel. Rein Transform/Opacity.
export default function WindBackground({ className = '' }) {
  const reduce = useReducedMotion()

  const streaks = [
    { top: '12%', delay: 0, dur: 13, opacity: 0.5, h: 1 },
    { top: '26%', delay: 4, dur: 17, opacity: 0.3, h: 2 },
    { top: '41%', delay: 1.5, dur: 11, opacity: 0.6, h: 1 },
    { top: '58%', delay: 6, dur: 19, opacity: 0.25, h: 2 },
    { top: '70%', delay: 2.5, dur: 14, opacity: 0.45, h: 1 },
    { top: '85%', delay: 8, dur: 22, opacity: 0.2, h: 3 },
  ]

  const particles = Array.from({ length: 18 }, (_, i) => ({
    left: `${(i * 53) % 100}%`,
    top: `${(i * 37 + 10) % 100}%`,
    size: (i % 3) + 2,
    dur: 9 + (i % 6) * 2,
    delay: (i % 7) * 1.3,
    drift: 30 + (i % 5) * 25,
  }))

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Aurora-Schleier (Weinrot) */}
      <motion.div
        className="absolute -top-1/3 -right-1/4 w-[70vw] h-[70vw] max-w-3xl max-h-3xl rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(177,69,82,0.40), transparent 65%)' }}
        animate={reduce ? {} : { x: [0, -60, 30, 0], y: [0, 40, -30, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/4 -left-1/4 w-[60vw] h-[60vw] max-w-2xl max-h-2xl rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(138,46,56,0.34), transparent 65%)' }}
        animate={reduce ? {} : { x: [0, 80, -20, 0], y: [0, -50, 40, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-1/3 w-[50vw] h-[50vw] max-w-xl max-h-xl rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(58,24,30,0.55), transparent 70%)' }}
        animate={reduce ? {} : { x: [0, -40, 50, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 38, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Wind-Streifen */}
      {!reduce &&
        streaks.map((s, i) => (
          <motion.div
            key={i}
            className="absolute left-0 w-[40vw] max-w-md -rotate-6"
            style={{
              top: s.top,
              height: s.h,
              background:
                'linear-gradient(90deg, transparent, rgba(228,196,200,0.55), transparent)',
              opacity: s.opacity,
            }}
            initial={{ x: '-50vw' }}
            animate={{ x: ['-50vw', '160vw'] }}
            transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeIn' }}
          />
        ))}

      {/* Schwebende Partikel */}
      {!reduce &&
        particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-rose-200/40"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
            animate={{ x: [0, p.drift, 0], y: [0, -p.drift * 0.6, 0], opacity: [0, 0.7, 0] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
    </div>
  )
}
