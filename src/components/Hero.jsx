import { motion, useReducedMotion } from 'motion/react'
import { waLink, CITY } from '../config'
import WhatsAppIcon from './WhatsAppIcon'
import WindBackground from './WindBackground'

const HEADLINE = ['Frischer', 'Wind', 'für', 'Ihren', 'digitalen', 'Auftritt.']

export default function Hero() {
  const reduce = useReducedMotion()

  const wordVariants = {
    hidden: { opacity: 0, y: 28, filter: 'blur(12px)' },
    show: (i) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { delay: 0.15 + i * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  return (
    <section
      id="hero"
      className="relative min-h-svh bg-night overflow-hidden flex items-center"
    >
      <WindBackground />

      {/* Vignette / Grund-Verlauf */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-night pointer-events-none" />

      {/* Text */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 md:px-12 py-28">
        <div className="max-w-xl md:max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2.5 mb-7"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent-bright opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-bright" />
            </span>
            <span className="text-accent-bright text-xs font-medium tracking-[0.25em] uppercase">
              Webdesign aus {CITY}
            </span>
          </motion.div>

          <h1 className="text-white text-[2.75rem] leading-[1.02] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light tracking-tight mb-8">
            {HEADLINE.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="show"
                className={`inline-block mr-[0.25em] ${
                  word === 'Wind' ? 'text-accent-bright font-normal italic' : ''
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="text-white/55 text-base md:text-lg font-light leading-relaxed max-w-lg mb-10"
          >
            Schnelle, edle Websites für Handwerker, Winzer, Gastro & Friseure —
            schlüsselfertig übergeben, wie ein neu gebautes Haus.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-accent text-white px-7 py-4 text-sm font-semibold tracking-wide hover:bg-accent-bright transition-colors rounded-sm"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Kostenlos anfragen
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#leistungen"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-light px-2 py-4 transition-colors"
            >
              Pakete &amp; Preise ansehen
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll-Hinweis */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-[0.65rem] tracking-[0.3em] uppercase">Scrollen</span>
        <motion.span
          className="block w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
          animate={reduce ? {} : { scaleY: [0.4, 1, 0.4], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
