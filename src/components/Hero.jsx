import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'motion/react'
import WindBackground from './WindBackground'
import WindField3D from './WindField3D'
import WhatsAppIcon from './WhatsAppIcon'
import Magnetic from './fx/Magnetic'
import VaporizeWord from './fx/VaporizeWord'
import { waLink, CITY } from '../config'
import julianPortrait from '../assets/julian-hero.webp'

const PRE_WORDS = ['Frischer']
const POST_WORDS = ['für', 'Ihren', 'digitalen', 'Auftritt.']
const VAPOR_WORDS = ['Wind', 'Look', 'Style', 'Schwung']

export default function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 70])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.06])

  // Sanfte Maus-Neigung der Portrait-Karte
  const tiltX = useSpring(useMotionValue(0), { stiffness: 120, damping: 14 })
  const tiltY = useSpring(useMotionValue(0), { stiffness: 120, damping: 14 })
  const onCardMove = (e) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    tiltY.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 7)
    tiltX.set((-(e.clientY - (r.top + r.height / 2)) / r.height) * 7)
  }
  const onCardLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(10px)' },
    show: (i) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { delay: 0.1 + i * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-svh w-full overflow-x-hidden bg-night text-white"
    >
      <WindBackground minimal />
      <WindField3D />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-night" />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-20 flex min-h-svh flex-col items-center justify-center px-6 pt-28 pb-10 md:px-12 md:pb-32"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-7 flex items-center gap-2.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-bright opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-bright" />
          </span>
          <span className="text-xs font-medium tracking-[0.25em] text-accent-bright uppercase">
            Webdesign aus {CITY}
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="mb-6 max-w-3xl text-center text-[2.4rem] font-light leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">
            {PRE_WORDS.map((word, i) => (
              <motion.span
                key={word}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="show"
                className="mr-[0.22em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </span>

          {/* Wind-Dissolve: Wind → Look → Style → Schwung */}
          <span className="block font-normal italic text-accent-bright">
            <VaporizeWord words={VAPOR_WORDS} />
          </span>

          <span className="block">
            {POST_WORDS.map((word, i) => (
              <motion.span
                key={word}
                custom={i + 1}
                variants={wordVariants}
                initial="hidden"
                animate="show"
                className="mr-[0.22em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mb-10 max-w-md text-center text-sm font-light leading-relaxed text-white/55 md:text-base"
        >
          Schnelle, edle Websites für Handwerker, Winzer, Gastro & Friseure —
          schlüsselfertig übergeben, wie ein neu gebautes Haus.
        </motion.p>

        {/* Portrait: löst sich an allen Rändern weich in die Nacht auf — kein Rahmen, keine Karte */}
        <motion.div
          style={reduce ? undefined : { scale: portraitScale }}
          className="relative"
          initial={{ opacity: 0, y: 24, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.45, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Stiller Glutschein hinter dem Portrait */}
          <div
            aria-hidden="true"
            className="absolute -inset-12 blur-3xl"
            style={{
              background:
                'radial-gradient(ellipse at 50% 45%, rgba(177,69,82,0.30), transparent 68%)',
            }}
          />

          <motion.div
            onMouseMove={onCardMove}
            onMouseLeave={onCardLeave}
            style={{
              ...(reduce ? {} : { rotateX: tiltX, rotateY: tiltY, transformPerspective: 1100 }),
              // Vertikale Feder (oben/unten) — kombiniert mit der horizontalen
              // Maske auf dem Bild ergibt das eine weiche Kante ringsum
              maskImage:
                'linear-gradient(to bottom, transparent 0%, black 14%, black 80%, transparent 99%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent 0%, black 14%, black 80%, transparent 99%)',
            }}
            animate={reduce ? undefined : { y: [0, -7, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-[290px] sm:w-[330px]"
          >
            <img
              src={julianPortrait}
              alt="Julian Schmitt, Webdesigner aus Trier"
              draggable="false"
              className="w-full h-auto block"
              style={{
                maskImage:
                  'linear-gradient(to right, transparent 0%, black 16%, black 84%, transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(to right, transparent 0%, black 16%, black 84%, transparent 100%)',
              }}
            />
          </motion.div>
        </motion.div>

        {/* CTA — Portrait und Buttons überlappen leicht, damit nichts "angehängt" wirkt */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.7 }}
          className="relative z-10 -mt-6 flex flex-col items-center gap-5 sm:flex-row sm:gap-8"
        >
          <Magnetic>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 overflow-hidden border border-accent-bright/30 bg-accent/90 px-7 py-3.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-accent-bright"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span className="relative z-10">Kostenlos anfragen</span>
              <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            </a>
          </Magnetic>
          <a
            href="#leistungen"
            className="group relative py-2 text-sm font-light text-white/55 transition-colors hover:text-white"
          >
            Pakete & Preise
            <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent-bright transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </a>
        </motion.div>

        {/* Feine Meta-Zeile am unteren Rand — ersetzt Scroll-Hinweis und Stats-Sektion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.2 }}
          className="mt-16 w-full md:mt-0 md:w-auto md:absolute md:bottom-0 md:left-12 md:right-12"
        >
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 border-t border-white/10 py-5 sm:justify-between">
            {[
              'Konzept in unter 7 Tagen',
              '100 % schlüsselfertig übergeben',
              'Ein Ansprechpartner — immer ich',
            ].map((claim, i) => (
              <motion.span
                key={claim}
                initial={reduce ? false : { opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7 + i * 0.18, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-[0.65rem] font-light tracking-[0.22em] text-white/35 uppercase"
              >
                {claim}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
