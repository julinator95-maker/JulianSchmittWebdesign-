import { motion, useReducedMotion } from 'motion/react'

const WORDS = [
  'KEIN OVERHEAD', 'DIREKT', 'TRIER', 'SCHNELL', 'PERSÖNLICH',
  'HANDWERK', 'QUALITÄT', 'SOLO', 'EHRLICH', 'LOKAL',
]

function Word({ w }) {
  return (
    <span className="inline-flex items-center gap-5 mx-7">
      <span className="text-accent-bright/65 text-[0.58rem] font-semibold tracking-[0.5em] uppercase">
        {w}
      </span>
      <span className="text-white/20 text-xs">·</span>
    </span>
  )
}

export default function TextStrip() {
  const reduce = useReducedMotion()

  return (
    <div className="bg-accent-deep py-4 overflow-hidden select-none" aria-hidden="true">
      <motion.div
        className="flex w-max"
        animate={reduce ? {} : { x: ['0%', '-50%'] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      >
        {WORDS.map((w, i) => <Word key={i} w={w} />)}
        {WORDS.map((w, i) => <Word key={`b${i}`} w={w} />)}
      </motion.div>
    </div>
  )
}
