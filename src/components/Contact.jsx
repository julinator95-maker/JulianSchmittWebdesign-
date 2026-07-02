import { WA_NUMBER, WA_MSG, EMAIL } from '../config'
import WhatsAppIcon from './WhatsAppIcon'
import WindBackground from './WindBackground'
import WindField3D from './WindField3D'
import SplitWords from './fx/SplitWords'
import Reveal from './fx/Reveal'
import Magnetic from './fx/Magnetic'

export default function Contact() {
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`
  const mailHref = `mailto:${EMAIL}`

  return (
    <section id="kontakt" className="relative overflow-hidden bg-night py-24 md:py-32 px-6 md:px-12">
      <WindBackground minimal />
      {/* Wind-Partikelfeld — schließt den Kreis zum Hero */}
      <WindField3D count={1700} maxOpacity={0.7} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night/60 via-transparent to-night" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="max-w-lg">
          <Reveal>
            <p className="text-accent-bright text-xs font-medium tracking-[0.2em] uppercase mb-6">
              Kontakt
            </p>
          </Reveal>
          <h2 className="text-ivory text-3xl md:text-4xl font-light leading-snug tracking-tight mb-6">
            <SplitWords text="Bereit für Ihre" className="block" />
            <SplitWords text="neue Website?" className="block font-editorial italic" delay={0.12} />
          </h2>
          <Reveal delay={0.1}>
            <p className="text-ivory/50 text-base font-light leading-relaxed mb-10">
              Schreiben Sie mir auf WhatsApp — kostenlos, unverbindlich und
              ohne Wartezeit. Ich antworte persönlich.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Magnetic>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-accent text-ivory px-7 py-4 text-sm font-medium hover:bg-accent-bright active:bg-accent/80 transition-colors"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span className="relative z-10">WhatsApp schreiben</span>
                  <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                </a>
              </Magnetic>
              <a
                href={mailHref}
                className="inline-flex items-center justify-center px-7 py-4 text-sm font-light text-ivory/50 border border-ivory/15 hover:text-ivory/80 hover:border-ivory/30 transition-colors"
              >
                {EMAIL}
              </a>
            </div>
          </Reveal>
        </div>

        <div className="mt-24 pt-8 border-t border-ivory/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-ivory/25 text-xs font-light tracking-wide">
            © {new Date().getFullYear()} Julian Schmitt Webdesign · Trier
          </span>
          <span className="text-ivory/25 text-xs font-light">
            Impressum · Datenschutz
          </span>
        </div>
      </div>
    </section>
  )
}
