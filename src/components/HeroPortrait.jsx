import { useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useReducedMotion,
} from 'motion/react'
import portrait from '../assets/julian-portrait.webp'

// Interaktiv inszeniertes Hero-Portrait (Richtung 21st.dev):
// - weiche Rundum-Maske → kein hartes Rechteck, löst sich in die Nacht auf
// - Cursor-Licht, das warm über das Bild spielt (Mobile: sanfter Auto-Drift)
// - langsamer Sheen-Sweep wie Studio-Licht
// - Reveal-Wipe von unten beim Erscheinen, plus atmender Glutschein
export default function HeroPortrait() {
  const reduce = useReducedMotion()
  const ref = useRef(null)

  // Cursor-Position relativ zum Bild (0..100 %), geglättet
  const mx = useSpring(useMotionValue(50), { stiffness: 120, damping: 20, mass: 0.4 })
  const my = useSpring(useMotionValue(38), { stiffness: 120, damping: 20, mass: 0.4 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const isFine = window.matchMedia('(pointer: fine)').matches

    if (isFine) {
      const onMove = (e) => {
        const r = el.getBoundingClientRect()
        mx.set(((e.clientX - r.left) / r.width) * 100)
        my.set(((e.clientY - r.top) / r.height) * 100)
      }
      const onLeave = () => {
        mx.set(50)
        my.set(38)
      }
      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerleave', onLeave)
      return () => {
        el.removeEventListener('pointermove', onMove)
        el.removeEventListener('pointerleave', onLeave)
      }
    }

    // Mobile: das Licht driftet autonom über das Bild
    if (reduce) return
    let raf
    const start = performance.now()
    const drift = (now) => {
      const t = (now - start) / 1000
      mx.set(50 + Math.sin(t * 0.6) * 22)
      my.set(40 + Math.cos(t * 0.45) * 14)
      raf = requestAnimationFrame(drift)
    }
    raf = requestAnimationFrame(drift)
    return () => cancelAnimationFrame(raf)
  }, [mx, my, reduce])

  const light = useMotionTemplate`radial-gradient(circle at ${mx}% ${my}%, rgba(255,225,205,0.28), rgba(177,69,82,0.12) 30%, transparent 60%)`

  const softMask =
    'radial-gradient(ellipse 82% 90% at 50% 44%, black 55%, transparent 92%)'

  return (
    <motion.div
      ref={ref}
      className="relative w-[300px] sm:w-[350px] lg:w-[380px]"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={reduce ? false : { opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Atmender Glutschein */}
      {!reduce && (
        <motion.div
          aria-hidden="true"
          className="absolute -inset-10 blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse at 50% 46%, rgba(177,69,82,0.38), transparent 66%)',
          }}
          animate={{ opacity: [0.6, 1, 0.6], scale: [0.97, 1.03, 0.97] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Bild + Effekte, weich maskiert */}
      <div
        className="relative"
        style={{ maskImage: softMask, WebkitMaskImage: softMask }}
      >
        <motion.img
          src={portrait}
          alt="Julian Schmitt, Webdesigner aus Trier"
          draggable="false"
          className="w-full h-auto block"
          initial={reduce ? false : { clipPath: 'inset(100% 0 0 0)' }}
          animate={reduce ? false : { clipPath: 'inset(0% 0 0 0)' }}
          transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Cursor-Licht */}
        {!reduce && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
            style={{ background: light }}
          />
        )}

        {/* Sheen-Sweep — diagonaler Lichtstreifen, periodisch */}
        {!reduce && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,240,230,0.14), transparent)',
            }}
            initial={{ x: '-160%' }}
            animate={{ x: '360%' }}
            transition={{ duration: 3.2, delay: 2, repeat: Infinity, repeatDelay: 5.5, ease: 'easeInOut' }}
          />
        )}
      </div>
    </motion.div>
  )
}
