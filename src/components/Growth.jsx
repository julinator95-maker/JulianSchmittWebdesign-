import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import Reveal from './fx/Reveal'
import SplitWords from './fx/SplitWords'
import WindField3D from './WindField3D'
import { waLink } from '../config'

// Wachstums-Leistungen nach dem Launch: SEO, Google, Automatisierung.
// Dunkle Editorial-Sektion — nimmt die Zeilen-Sprache des Prozesses auf.
const SERVICES = [
  {
    num: '01',
    title: 'Lokale Sichtbarkeit',
    tag: 'SEO',
    desc: 'Gefunden werden, wenn Trier sucht. Ich kümmere mich um lokale Suchbegriffe, saubere Rankings und die Technik dahinter, damit aus Suchenden echte Kundschaft wird.',
  },
  {
    num: '02',
    title: 'Google Business & Maps',
    tag: 'Präsenz',
    desc: 'Ihr Betrieb auf der Karte: gepflegtes Profil, aktuelle Öffnungszeiten, Fotos und Bewertungen im Blick. Der erste Eindruck entsteht oft vor dem ersten Besuch.',
  },
  {
    num: '03',
    title: 'Automatisierung',
    tag: 'Workflows',
    desc: 'Anfragen, die nachts reinkommen. Formulare, die direkt auf Ihr WhatsApp laufen. Ihre Website arbeitet auch dann, wenn Sie es nicht tun.',
  },
  {
    num: '04',
    title: 'Zahlen & Klarheit',
    tag: 'Reports',
    desc: 'Einmal im Monat ein Bericht in verständlichem Deutsch: Wer war da, was wurde geklickt, was bringt Kundschaft. Und woran wir als Nächstes arbeiten.',
  },
]

function Row({ item, index }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-8%' })
  const isLast = index === SERVICES.length - 1

  return (
    <a
      ref={ref}
      href={waLink(`Hallo Julian, ich interessiere mich für ${item.title} (${item.tag}).`)}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />
      <motion.div
        aria-hidden="true"
        className="absolute top-0 left-0 h-px bg-accent-bright/70"
        style={{ width: '100%', originX: 0 }}
        initial={reduce ? false : { scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      />
      {isLast && <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />}

      <motion.div
        className="relative z-10 py-7 md:py-8 grid md:grid-cols-[3.5rem_1fr_1.5fr_2rem] gap-3 md:gap-12 items-baseline"
        initial={reduce ? false : { opacity: 0, x: -24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-accent-bright text-xs font-medium tracking-[0.3em] uppercase">
          {item.num}
        </p>

        <h3 className="text-ivory font-extralight leading-none tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-2"
          style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)' }}
        >
          {item.title}
          <span className="ml-3 align-middle text-[0.6rem] font-medium tracking-[0.25em] uppercase text-ivory/30">
            {item.tag}
          </span>
        </h3>

        <p className="text-ivory/45 text-sm font-light leading-relaxed max-w-md">
          {item.desc}
        </p>

        <span
          aria-hidden="true"
          className="hidden md:block text-accent-bright opacity-0 -translate-x-2 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0"
        >
          →
        </span>
      </motion.div>
    </a>
  )
}

export default function Growth() {
  return (
    <section id="wachstum" className="relative overflow-hidden bg-night py-20 md:py-28 px-6 md:px-20">
      {/* Wind-Partikelfeld — dezenter als im Hero, reagiert auf den Cursor */}
      <WindField3D count={1900} maxOpacity={0.75} />
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="mb-12 md:mb-16">
          <Reveal>
            <p className="text-accent-bright text-xs font-medium tracking-[0.2em] uppercase mb-6">
              Nach dem Launch
            </p>
          </Reveal>
          <h2 className="text-ivory text-3xl md:text-4xl font-light leading-snug tracking-tight">
            <SplitWords text="Online sein reicht nicht." className="block" />
            <SplitWords text="Gefunden werden zählt." className="block font-editorial italic" delay={0.12} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-ivory/50 text-base font-light leading-relaxed">
              Die Website ist das Fundament. Danach sorge ich dafür, dass sie auch
              arbeitet: sichtbar bei Google, präsent auf Maps und im Alltag
              automatisiert. Alles auf Anfrage und aus einer Hand.
            </p>
          </Reveal>
        </div>

        <div>
          {SERVICES.map((item, i) => (
            <Row key={item.num} item={item} index={i} />
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 text-ivory/30 text-xs font-light">
            Individuell nach Bedarf. Sprechen Sie mich einfach an.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
