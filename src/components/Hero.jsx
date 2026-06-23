import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import WindBackground from './WindBackground'
import WhatsAppIcon from './WhatsAppIcon'
import Magnetic from './fx/Magnetic'
import { waLink, CITY } from '../config'
import julianHero from '../assets/julian-hero.webp'

const HEADLINE_WORDS = ['Frischer', 'Wind', 'für', 'Ihren', 'digitalen', 'Auftritt.']

export default function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Sanfter Parallax/Scale beim Wegscrollen – kein Sticky, daher kein Overlap.
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

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
      className="relative min-h-svh w-full overflow-hidden bg-night text-white"
    >
      {/* Wind-Hintergrund */}
      <WindBackground />

      {/* Vignette */}
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
        <h1 className="mb-5 max-w-3xl text-center text-[2.4rem] font-light leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              animate="show"
              className={`mr-[0.22em] inline-block ${
                word === 'Wind' ? 'font-normal italic text-accent-bright' : ''
              }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mb-9 max-w-md text-center text-sm font-light leading-relaxed text-white/55 md:text-base"
        >
          Schnelle, edle Websites für Handwerker, Winzer, Gastro & Friseure —
          schlüsselfertig übergeben, wie ein neu gebautes Haus.
        </motion.p>

        {/* Bild mit Clip-Reveal + Scroll-Scale */}
        <motion.div
          style={reduce ? undefined : { y: imgY, scale: imgScale }}
          className="w-full max-w-[240px] sm:max-w-[280px]"
        >
          <motion.img
            src={julianHero}
            alt="Julian Schmitt, Webdesigner aus Trier"
            draggable="false"
            className="h-auto w-full object-cover"
            initial={
              reduce
                ? false
                : { clipPath: 'inset(6% 10% 6% 10% round 180px)', opacity: 0.5, scale: 0.92 }
            }
            animate={
              reduce
                ? false
                : { clipPath: 'inset(0% 0% 0% 0% round 10px)', opacity: 1, scale: 1 }
            }
            transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
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
      </motion.div>

      {/* Scroll-Indikator */}
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
    </section>
  )
}
