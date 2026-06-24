import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import Reveal from './fx/Reveal'
import SplitWords from './fx/SplitWords'

const FAQS = [
  {
    q: 'Was kostet eine Website bei Ihnen?',
    a: 'Meine Pakete sind Festpreise: Start ab 850 €, Mittel 1.150 €, Komplett 1.450 €. Kein Stundensatz, keine Überraschungsrechnung. Was genau Sie brauchen, klären wir kostenlos im Erstgespräch.',
  },
  {
    q: 'Wie lange dauert die Umsetzung?',
    a: 'Das Konzept liegt innerhalb von 7 Tagen vor. Die fertige Website ist in der Regel nach 2–3 Wochen online. Keine monatelange Wartezeit wie bei Agenturen — ich arbeite fokussiert und liefere pünktlich.',
  },
  {
    q: 'Brauche ich technisches Wissen?',
    a: 'Kein Gramm. Ich übergebe schlüsselfertig: Domain, Hosting, E-Mail — alles eingerichtet, alles erklärt, alles bereit. Sie kümmern sich um Ihr Handwerk, ich kümmere mich um Ihre Website.',
  },
  {
    q: 'Kann ich die Website später selbst bearbeiten?',
    a: 'Ja. Je nach Paket richten wir ein einfaches CMS ein, mit dem Sie Texte und Bilder selbst aktualisieren können. Alternativ übernehme ich das im Hausmeister-Paket. Was für Sie besser passt, besprechen wir ehrlich.',
  },
  {
    q: 'Was ist nach dem Launch mit dem Hausmeister-Paket gemeint?',
    a: 'Die Hausmeister-Pakete ab 59 €/Monat umfassen technische Updates, Backups, Sicherheitspflege und auf Wunsch SEO-Monitoring. Laufzeit 12 Monate. Sie haben immer einen festen Ansprechpartner — mich.',
  },
  {
    q: 'Arbeiten Sie auch außerhalb von Trier?',
    a: 'Ja. Konzept, Design und Entwicklung laufen vollständig digital. Persönlicher Kontakt per WhatsApp, Telefon oder Video. Mein Fokus liegt auf der Region Trier — ich nehme aber auch Kunden aus dem gesamten deutschsprachigen Raum.',
  },
]

function Item({ q, a, isOpen, onToggle }) {
  const reduce = useReducedMotion()
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={onToggle}
        className="w-full text-left py-5 flex items-start justify-between gap-4 group"
        aria-expanded={isOpen}
      >
        <span
          className={`text-[0.95rem] font-light leading-snug transition-colors duration-200 ${
            isOpen ? 'text-accent' : 'text-ink group-hover:text-accent'
          }`}
        >
          {q}
        </span>
        <motion.span
          animate={reduce ? {} : { rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-0.5 shrink-0 text-xl leading-none font-extralight transition-colors ${
            isOpen ? 'text-accent' : 'text-muted'
          }`}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="pb-5 text-sm font-light leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(null)
  const toggle = (i) => setOpen(open === i ? null : i)

  return (
    <section id="faq" className="bg-stone py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1fr_1.7fr] gap-16 md:gap-24 items-start">
          <div className="md:sticky md:top-28">
            <Reveal>
              <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-6">
                Häufige Fragen
              </p>
            </Reveal>
            <h2 className="text-ink text-3xl md:text-4xl font-light leading-snug tracking-tight">
              <SplitWords text="Fragen," className="block" />
              <SplitWords text="die ich kenne." className="block" delay={0.12} />
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-5 text-muted text-sm font-light leading-relaxed max-w-xs">
                Alles, was Sie wissen wollen — bevor Sie fragen müssen.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <div className="border-t border-border">
              {FAQS.map((faq, i) => (
                <Item
                  key={i}
                  q={faq.q}
                  a={faq.a}
                  isOpen={open === i}
                  onToggle={() => toggle(i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
