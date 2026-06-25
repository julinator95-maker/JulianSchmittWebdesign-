import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'motion/react'
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

// Per-step opacity/y timing within scrollYProgress [0, 1]
const TIMING = [
  { op: [0, 0.05, 0.21, 0.26], y: [0, 0.06, 0.21, 0.27] },
  { op: [0.24, 0.29, 0.46, 0.51], y: [0.24, 0.30, 0.46, 0.52] },
  { op: [0.49, 0.54, 0.71, 0.76], y: [0.49, 0.55, 0.71, 0.77] },
  { op: [0.74, 0.79, 1.0], y: [0.74, 0.80, 1.0] }, // last step stays
]

function StepCard({ step, index, scrollYProgress }) {
  const t = TIMING[index]
  const isLast = index === STEPS.length - 1

  const opacity = useTransform(
    scrollYProgress,
    t.op,
    isLast ? [0, 1, 1] : [0, 1, 1, 0]
  )
  const y = useTransform(
    scrollYProgress,
    t.y,
    isLast ? [60, 0, 0] : [60, 0, 0, -40]
  )

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center px-6 md:px-20"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-0">
        {/* Content */}
        <div className="md:max-w-xl">
          <p className="text-accent text-xs font-medium tracking-[0.3em] uppercase mb-5 md:mb-8">
            {step.num} — {step.title}
          </p>
          <h3 className="text-ink text-5xl sm:text-6xl md:text-[5.5rem] font-extralight leading-[0.95] tracking-tight mb-6 md:mb-8">
            {step.title}
          </h3>
          <p className="text-muted text-base md:text-lg font-light leading-relaxed max-w-md">
            {step.desc}
          </p>
        </div>

        {/* Ghost number */}
        <div
          aria-hidden="true"
          className="hidden md:block text-[18rem] font-black italic leading-none select-none tabular-nums text-ink/[0.04] shrink-0"
        >
          {step.num}
        </div>
      </div>
    </motion.div>
  )
}

// Simple fallback for reduced-motion
function ReducedProcess() {
  return (
    <section id="prozess" className="bg-ivory py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-6">
            Wie ich arbeite
          </p>
        </Reveal>
        <h2 className="text-ink text-3xl md:text-4xl font-light leading-snug tracking-tight mb-16">
          <SplitWords text="Vier Schritte." className="block" />
          <SplitWords text="Kein Overhead." className="block" delay={0.12} />
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {STEPS.map(({ num, title, desc }) => (
            <div key={num} className="border-t border-border pt-6">
              <p className="text-accent text-sm font-medium mb-2">{num}</p>
              <h3 className="text-ink text-xl font-light mb-3">{title}</h3>
              <p className="text-muted text-sm font-light leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Process() {
  const sectionRef = useRef(null)
  const reduce = useReducedMotion()
  const [activeStep, setActiveStep] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActiveStep(Math.min(3, Math.floor(v * 4)))
  })

  if (reduce) return <ReducedProcess />

  return (
    <section
      ref={sectionRef}
      id="prozess"
      className="relative"
      style={{ height: '300vh' }}
    >
      <div className="sticky top-0 h-screen bg-ivory overflow-hidden">

        {/* Label oben links */}
        <div className="absolute top-8 md:top-10 left-6 md:left-20 z-10">
          <p className="text-accent text-[0.6rem] font-medium tracking-[0.3em] uppercase">
            Wie ich arbeite
          </p>
        </div>

        {/* Schritt-Zähler oben rechts */}
        <div className="absolute top-8 md:top-10 right-6 md:right-20 z-10">
          <p className="text-ink/25 text-[0.6rem] font-light tracking-[0.25em] tabular-nums">
            0{activeStep + 1} / 04
          </p>
        </div>

        {/* Step cards — übereinandergelegt, scroll-getrieben */}
        <div className="absolute inset-0">
          {STEPS.map((step, i) => (
            <StepCard
              key={step.num}
              step={step}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Fortschritts-Dots unten Mitte */}
        <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2.5">
          {STEPS.map((_, i) => (
            <motion.div
              key={i}
              className="rounded-full bg-accent"
              animate={{
                width: i === activeStep ? 28 : 6,
                height: 6,
                opacity: i === activeStep ? 1 : 0.2,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
