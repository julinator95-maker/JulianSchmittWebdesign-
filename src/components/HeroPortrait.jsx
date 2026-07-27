import { useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'motion/react'
import portrait from '../assets/julian-cutout.webp'

// Freigestelltes Hero-Portrait: kein Hintergrund, also kein Rechteck.
// Julian steht in einem weichen Weinrot-Lichtschein, der auf den Cursor
// reagiert (Mobile: sanfter Auto-Drift), und läuft unten in die Sektion aus.
export default function HeroPortrait() {
  const reduce = useReducedMotion()
  const ref = useRef(null)

  // Cursor-Versatz (−1..1), geglättet — verschiebt den Lichtschein hinter Julian
  const px = useSpring(useMotionValue(0), { stiffness: 90, damping: 20, mass: 0.5 })
  const py = useSpring(useMotionValue(0), { stiffness: 90, damping: 20, mass: 0.5 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const isFine = window.matchMedia('(pointer: fine)').matches

    if (isFine) {
      const onMove = (e) => {
        const r = el.getBoundingClientRect()
        px.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 2)
        py.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 2)
      }
      const onLeave = () => {
        px.set(0)
        py.set(0)
      }
      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerleave', onLeave)
      return () => {
        el.removeEventListener('pointermove', onMove)
        el.removeEventListener('pointerleave', onLeave)
      }
    }

    if (reduce) return
    let raf
    const start = performance.now()
    const drift = (now) => {
      const t = (now - start) / 1000
      px.set(Math.sin(t * 0.5) * 0.5)
      py.set(Math.cos(t * 0.4) * 0.3)
      raf = requestAnimationFrame(drift)
    }
    raf = requestAnimationFrame(drift)
    return () => cancelAnimationFrame(raf)
  }, [px, py, reduce])

  // Lichtschein ist per -translate zentriert; Cursor verschiebt ihn zusätzlich
  const glowX = useTransform(px, (v) => v * 26)
  const glowY = useTransform(py, (v) => v * 18)

  return (
    <div ref={ref} className="relative w-[280px] sm:w-[320px] lg:w-[360px]">
      {/* Weicher Lichtschein hinter Julian — folgt dem Cursor, atmet leicht */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[125%] w-[125%] -translate-x-1/2 -translate-y-[46%]"
      >
        <motion.div
          className="h-full w-full blur-3xl"
          style={{
            x: glowX,
            y: glowY,
            background:
              'radial-gradient(ellipse at center, rgba(177,69,82,0.55), rgba(138,46,56,0.22) 45%, transparent 70%)',
          }}
          animate={reduce ? undefined : { opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Julian, freigestellt — leichtes Schweben, Reveal von unten */}
      <motion.img
        src={portrait}
        alt="Julian Schmitt, Webdesigner aus Trier"
        draggable="false"
        className="relative w-full h-auto block"
        style={{
          filter: 'drop-shadow(0 24px 40px rgba(0,0,0,0.55))',
          // unten weich in die Sektion auslaufen lassen
          maskImage: 'linear-gradient(to bottom, black 78%, transparent 99%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 78%, transparent 99%)',
        }}
        initial={reduce ? false : { opacity: 0, y: 26 }}
        animate={
          reduce
            ? false
            : { opacity: 1, y: [26, 0, -6, 0] }
        }
        transition={{
          opacity: { delay: 0.4, duration: 1 },
          y: {
            delay: 0.4,
            duration: 8,
            times: [0, 0.14, 0.57, 1],
            repeat: Infinity,
            repeatDelay: 0,
            ease: 'easeInOut',
          },
        }}
      />
    </div>
  )
}
