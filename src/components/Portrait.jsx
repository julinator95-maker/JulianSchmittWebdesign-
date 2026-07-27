import { useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'motion/react'
import portrait from '../assets/julian-cutout.webp'

// Freigestelltes Portrait (kein Hintergrund → kein Rechteck) für die
// "Über mich"-Sektion. Julian steht in einem weichen Weinrot-Lichtschein,
// der auf den Cursor reagiert (Mobile: sanfter Auto-Drift), schwebt leicht
// und läuft unten in das dunkle Panel aus.
export default function Portrait() {
  const reduce = useReducedMotion()
  const ref = useRef(null)

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

  const glowX = useTransform(px, (v) => v * 26)
  const glowY = useTransform(py, (v) => v * 20)

  return (
    <motion.div
      ref={ref}
      className="relative w-[76%] max-w-[360px] self-end"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Weicher Lichtschein hinter Julian */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-[48%]"
      >
        <motion.div
          className="h-full w-full blur-3xl"
          style={{
            x: glowX,
            y: glowY,
            background:
              'radial-gradient(ellipse at center, rgba(177,69,82,0.6), rgba(138,46,56,0.25) 45%, transparent 70%)',
          }}
          animate={reduce ? undefined : { opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Julian, freigestellt — leichtes Schweben */}
      <motion.img
        src={portrait}
        alt="Julian Schmitt, Webdesigner aus Trier"
        draggable="false"
        className="relative w-full h-auto block"
        style={{
          filter: 'drop-shadow(0 24px 40px rgba(0,0,0,0.5))',
          maskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
        }}
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}
