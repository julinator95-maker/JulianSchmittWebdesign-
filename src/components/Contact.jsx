import { WA_NUMBER, WA_MSG, EMAIL } from '../config'
import WhatsAppIcon from './WhatsAppIcon'

export default function Contact() {
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`
  const mailHref = `mailto:${EMAIL}`

  return (
    <section id="kontakt" className="bg-night py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-lg">
          <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-6">
            Kontakt
          </p>
          <h2 className="text-ivory text-3xl md:text-4xl font-light leading-snug tracking-tight mb-6">
            Bereit für Ihre
            <br />
            neue Website?
          </h2>
          <p className="text-ivory/50 text-base font-light leading-relaxed mb-10">
            Schreiben Sie mir auf WhatsApp — kostenlos, unverbindlich und
            ohne Wartezeit. Ich antworte persönlich.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-accent text-ivory px-7 py-4 text-sm font-medium hover:bg-accent/90 active:bg-accent/80 transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5" />
              WhatsApp schreiben
            </a>
            <a
              href={mailHref}
              className="inline-flex items-center justify-center px-7 py-4 text-sm font-light text-ivory/50 border border-ivory/15 hover:text-ivory/80 hover:border-ivory/30 transition-colors"
            >
              {EMAIL}
            </a>
          </div>
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
