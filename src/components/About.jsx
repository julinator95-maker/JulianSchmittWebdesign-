import { motion } from 'motion/react'

export default function About() {
  return (
    <section id="ueber-mich" className="bg-ivory py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">

          {/* Left: Text */}
          <div>
            <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-6">
              Über mich
            </p>
            <h2 className="text-ink text-3xl md:text-4xl font-light leading-snug tracking-tight mb-8">
              Kein Team, kein&nbsp;Overhead.
              <br />
              Nur ich und Ihre Website.
            </h2>
            <div className="space-y-4 text-muted text-base font-light leading-relaxed">
              <p>
                Ich bin Julian Schmitt, freier Webdesigner aus Trier. Ich arbeite
                ausschließlich solo — das bedeutet keine Agentur-Bürokratie, kein
                Durchreichen, keine überraschenden Aufschläge.
              </p>
              <p>
                Sie sprechen direkt mit der Person, die Ihre Website baut. Das spart
                Zeit, schafft Vertrauen und führt zu besseren Ergebnissen.
              </p>
              <p>
                Ich verstehe die Anforderungen lokaler Betriebe — und ich baue Websites,
                die bei echten Menschen auf echten Smartphones funktionieren. Schlüsselfertig
                übergeben, wie ein neu gebautes Haus.
              </p>
            </div>
          </div>

          {/* Right: Dark stat panel */}
          <motion.div
            className="bg-accent-deep h-full min-h-[340px] p-10 flex flex-col justify-between gap-0"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {[
              {
                value: 'Solo',
                label: 'Keine Agentur, kein Overhead — nur direkte Arbeit.',
              },
              {
                value: 'Direkt',
                label: 'Sie sprechen immer mit mir persönlich. Kein Durchreichen.',
              },
              {
                value: 'Trier',
                label: 'Vor Ort für lokale Betriebe. Nah dran, auch nach dem Launch.',
              },
            ].map(({ value, label }, i) => (
              <div
                key={value}
                className={`py-7 ${i !== 0 ? 'border-t border-white/10' : ''}`}
              >
                <div className="text-3xl font-light italic text-accent-bright mb-2">
                  {value}
                </div>
                <div className="text-white/40 text-sm font-light leading-relaxed">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
