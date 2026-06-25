import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import Reveal from './fx/Reveal'
import SplitWords from './fx/SplitWords'

const STEPS = [
  {
    num: '01',
    title: 'Gespräch',
    desc: 'Kostenlos, unverbindlich, persönlich. Ich lerne Ihren Betrieb kennen — was fehlt, was soll besser werden, was muss die Website leisten.',
  },
  {
    num: '02',
    title: 'Konzept',
    desc: 'Struktur, Design-Richtung, Texte — alles aus einer Hand. Kein Agentur-Ping-Pong. Das Konzept liegt innerhalb von 7 Tagen vor.',
  },
  {
    num: '03',
    title: 'Umsetzung',
    desc: 'Saubere Entwicklung, mobiloptimiert, schnell geladen. Sie sehen den Fortschritt jederzeit und bekommen regelmäßige Updates.',
  },
  {
    num: '04',
    title: 'Übergabe',
    desc: 'Schlüsselfertig in maximal 2 Wochen ab dem ersten Gespräch: Domain, Hosting, Launch. Sie müssen sich um nichts kümmern.',
  },
]

function Step({ step, index }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-8%' })
  const isLast = index === STEPS.length - 1

  return (
    <div ref={ref} className="relative overflow-hidden">
      {/* Static border base — top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />
      {/* Accent line draws in on enter — top */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 left-0 h-px bg-accent"
        style={{ width: '100%', originX: 0 }}
        initial={reduce ? false : { scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Last step: also draw a line at the bottom */}
      {isLast && (
        <>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-px bg-accent"
            style={{ width: '100%', originX: 0 }}
            initial={reduce ? false : { scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </>
      )}

      {/* Ghost number */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none tabular-nums leading-none font-black italic text-ink/[0.035]"
        style={{ fontSize: 'clamp(8rem, 22vw, 20rem)' }}
      >
        {step.num}
      </div>

      {/* Content */}
      <div className="relative z-10 py-12 md:py-16 grid md:grid-cols-[6rem_1fr] gap-6 md:gap-16 items-start">
        {/* Step number label */}
        <motion.p
          className="text-accent text-xs font-medium tracking-[0.3em] uppercase pt-2"
          initial={reduce ? false : { opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {step.num}
        </motion.p>

        {/* Title + description */}
        <div>
          <motion.h3
            className="text-ink font-extralight leading-[0.92] tracking-tight mb-5"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {step.title}
          </motion.h3>
          <motion.p
            className="text-muted text-base font-light leading-relaxed max-w-lg"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {step.desc}
          </motion.p>
        </div>
      </div>
    </div>
  )
}

export default function Process() {
  return (
    <section id="prozess" className="bg-ivory py-24 md:py-32 px-6 md:px-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <Reveal>
            <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-6">
              Wie ich arbeite
            </p>
          </Reveal>
          <h2 className="text-ink text-3xl md:text-4xl font-light leading-snug tracking-tight">
            <SplitWords text="Vier Schritte." className="block" />
            <SplitWords text="Kein Overhead." className="block" delay={0.12} />
          </h2>
        </div>

        {/* Steps */}
        <div>
          {STEPS.map((step, i) => (
            <Step key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
