import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from 'motion/react'

export default function TiltCard({
  children,
  className = '',
  max = 6,
  glow = 'rgba(177,69,82,0.18)',
}) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const active = useMotionValue(0)

  const springCfg = { stiffness: 150, damping: 18 }

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), springCfg)
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), springCfg)
  const scale    = useSpring(useTransform(active, [0, 1], [1, 1.025]), springCfg)

  // Shadow shifts opposite to tilt — brighter when lifted
  const shadowX  = useTransform(rotateY, [-max, max], [10, -10])
  const shadowY  = useTransform(rotateX, [-max, max], [-10, 10])
  const shadowO  = useTransform(active, [0, 1], [0.08, 0.22])
  const boxShadow = useMotionTemplate`${shadowX}px ${shadowY}px 38px rgba(0,0,0,${shadowO}), 0 2px 8px rgba(0,0,0,0.06)`

  const gx = useTransform(px, (v) => `${v * 100}%`)
  const gy = useTransform(py, (v) => `${v * 100}%`)
  const glowBg = useMotionTemplate`radial-gradient(340px circle at ${gx} ${gy}, ${glow}, transparent 60%)`

  if (reduce) return <div className={className}>{children}</div>

  const updatePos = (clientX, clientY) => {
    const r = ref.current.getBoundingClientRect()
    px.set((clientX - r.left) / r.width)
    py.set((clientY - r.top) / r.height)
  }
  const enter = () => active.set(1)
  const reset = () => { px.set(0.5); py.set(0.5); active.set(0) }

  const onMouseMove  = (e) => updatePos(e.clientX, e.clientY)
  const onTouchMove  = (e) => updatePos(e.touches[0].clientX, e.touches[0].clientY)
  const onTouchStart = () => enter()

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={enter}
      onMouseLeave={reset}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={reset}
      style={{ rotateX, rotateY, scale, transformPerspective: 900, boxShadow }}
      className={`relative ${className}`}
    >
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: glowBg }}
      />
    </motion.div>
  )
}
