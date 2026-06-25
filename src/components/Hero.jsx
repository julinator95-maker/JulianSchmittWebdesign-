import { useRef, useState, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'motion/react'
import WindBackground from './WindBackground'
import WhatsAppIcon from './WhatsAppIcon'
import Magnetic from './fx/Magnetic'
import { waLink, CITY } from '../config'
import julianPortrait from '../assets/julian-white.webp'

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
    tiltY.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 12)
    tiltX.set((-(e.clientY - (r.top + r.height / 2)) / r.height) * 12)
  }
  const onCardLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  const [wordIdx, setWordIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setWordIdx(i => (i + 1) % VAPOR_WORDS.length), 2800)
    return () => clearInterval(id)
  }, [])

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
      <WindBackground />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-night" />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-20 flex min-h-svh flex-col items-center justify-center px-6 pt-28 pb-20 md:px-12"
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

          {/* Smooth word cycling */}
          <span className="block font-normal italic text-accent-bright" style={{ minHeight: '1.08em' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIdx}
                className="inline-block"
                initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)',
                  transition: { duration: 0.55, delay: wordIdx === 0 ? 0.22 : 0, ease: [0.22, 1, 0.36, 1] }
                }}
                exit={{ opacity: 0, y: -20, filter: 'blur(6px)',
                  transition: { duration: 0.38, ease: [0.4, 0, 1, 1] }
                }}
              >
                {VAPOR_WORDS[wordIdx]}
              </motion.span>
            </AnimatePresence>
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

        {/* Portrait-Karte mit rotierender Aura + Schweben */}
        <motion.div
          style={reduce ? undefined : { scale: portraitScale }}
          className="relative"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Rotierende Aura */}
          {!reduce && (
            <motion.div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2rem] blur-2xl"
              style={{
                background:
                  'conic-gradient(from 0deg, rgba(177,69,82,0.55), rgba(58,24,30,0.1), rgba(138,46,56,0.55), rgba(58,24,30,0.1), rgba(177,69,82,0.55))',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            />
          )}

          {/* Schwebende, neigbare Karte */}
          <motion.div
            onMouseMove={onCardMove}
            onMouseLeave={onCardLeave}
            style={reduce ? undefined : { rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }}
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-[230px] sm:w-[270px] rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
          >
            <motion.img
              src={julianPortrait}
              alt="Julian Schmitt, Webdesigner aus Trier"
              draggable="false"
              className="w-full h-auto block"
              initial={reduce ? false : { clipPath: 'inset(8% round 1rem)' }}
              animate={reduce ? false : { clipPath: 'inset(0% round 1rem)' }}
              transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Vignette: weißer Bereich um Julian → Akzentrot an den Rändern */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 42%, transparent 35%, rgba(138,46,56,0.55) 62%, rgba(100,28,36,0.88) 82%, rgba(58,14,18,0.97) 100%)',
              }}
            />
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.7 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Magnetic>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 overflow-hidden bg-accent px-7 py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-accent-bright rounded-sm"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span className="relative z-10">Kostenlos anfragen</span>
              <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
              <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            </a>
          </Magnetic>
          <a
            href="#leistungen"
            className="px-2 py-4 text-sm font-light text-white/60 transition-colors hover:text-white"
          >
            Pakete & Preise ansehen
          </a>
        </motion.div>

        {/* Scroll-Indikator — innerhalb der parallax-div, bewegt sich mit contentY/Opacity */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-[0.65rem] tracking-[0.3em] text-white/30 uppercase">Scrollen</span>
          <motion.span
            className="block h-8 w-px bg-gradient-to-b from-white/40 to-transparent"
            animate={reduce ? {} : { scaleY: [0.4, 1, 0.4], originY: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
