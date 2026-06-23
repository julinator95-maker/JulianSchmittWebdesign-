import { motion, useReducedMotion } from 'motion/react'
import {
  ContainerScroll,
  ContainerSticky,
  ContainerAnimated,
  ContainerInset,
  HeroImage,
} from './ui/animated-video-on-scroll'
import WindBackground from './WindBackground'
import WhatsAppIcon from './WhatsAppIcon'
import Magnetic from './fx/Magnetic'
import { waLink, CITY } from '../config'
import julianHero from '../assets/julian-hero.webp'

const HEADLINE_WORDS = ['Frischer', 'Wind', 'für', 'Ihren', 'digitalen', 'Auftritt.']

export default function Hero() {
  const reduce = useReducedMotion()

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
    <ContainerScroll id="hero" className="h-[150vh]">
      <ContainerSticky className="overflow-hidden bg-night text-white">
        {/* Wind-Hintergrund */}
        <WindBackground />

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-night" />

        <div className="relative z-20 flex min-h-svh flex-col items-center justify-start px-6 pb-28 pt-28 md:px-12">
          {/* Badge */}
          <ContainerAnimated
            inputRange={[0, 0.4]}
            outputRange={[20, 0]}
            className="mb-8 flex items-center gap-2.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-bright opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-bright" />
            </span>
            <span className="text-xs font-medium tracking-[0.25em] text-accent-bright uppercase">
              Webdesign aus {CITY}
            </span>
          </ContainerAnimated>

          {/* Headline */}
          <h1 className="mb-6 max-w-3xl text-center text-[2.6rem] font-light leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.25rem]">
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
          <ContainerAnimated
            inputRange={[0, 0.5]}
            outputRange={[30, 0]}
            className="mb-10 max-w-md text-center"
          >
            <p className="text-base font-light leading-relaxed text-white/55 md:text-lg">
              Schnelle, edle Websites für Handwerker, Winzer, Gastro & Friseure —
              schlüsselfertig übergeben, wie ein neu gebautes Haus.
            </p>
          </ContainerAnimated>

          {/* Bild mit Scroll-Expansion */}
          <ContainerInset
            className="w-full max-w-sm md:max-w-md"
            insetYRange={[12, 0]}
            insetXRange={[8, 0]}
            roundednessRange={[400, 8]}
          >
            <HeroImage
              src={julianHero}
              alt="Julian Schmitt, Webdesigner aus Trier"
              className="w-full h-auto object-cover"
              draggable="false"
            />
          </ContainerInset>

          {/* CTA */}
          <ContainerAnimated
            inputRange={[0, 0.7]}
            outputRange={[-40, 0]}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
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
          </ContainerAnimated>
        </div>

        {/* Scroll-Indikator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-[0.65rem] tracking-[0.3em] text-white/30 uppercase">Scrollen</span>
          <motion.span
            className="block h-8 w-px bg-gradient-to-b from-white/40 to-transparent"
            animate={reduce ? {} : { scaleY: [0.4, 1, 0.4], originY: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </ContainerSticky>
    </ContainerScroll>
  )
}
