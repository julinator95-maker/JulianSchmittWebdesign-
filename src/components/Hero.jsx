import { WA_NUMBER, WA_MSG } from '../config'
import WhatsAppIcon from './WhatsAppIcon'

export default function Hero() {
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`

  return (
    <section
      id="hero"
      className="min-h-svh bg-dark flex flex-col justify-center px-6 md:px-12 pt-24 pb-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-2xl max-h-2xl rounded-full bg-accent/8 blur-3xl translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] max-w-xl max-h-xl rounded-full bg-accent/5 blur-3xl -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="relative max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2.5 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="text-accent text-xs font-medium tracking-[0.2em] uppercase">
            Trier · Rheinland-Pfalz
          </span>
        </div>

        <h1 className="text-ivory text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.05] tracking-tight mb-8 max-w-2xl">
          Webdesign,
          <br />
          das wirkt.
        </h1>

        <p className="text-ivory/50 text-base md:text-lg font-light leading-relaxed mb-12 max-w-md">
          Klare, schnelle Websites für Handwerker, Winzer, Restaurants und
          Friseure. Solo geführt, direkt aus Trier.
        </p>

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-accent text-ivory px-7 py-4 text-sm font-medium tracking-wide hover:bg-accent/90 active:bg-accent/80 transition-colors"
        >
          <WhatsAppIcon className="w-5 h-5" />
          Kostenlos anfragen
        </a>

        <div className="absolute bottom-10 left-0 md:hidden w-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-1.5 opacity-30">
            <span className="text-ivory text-xs tracking-widest uppercase">Scrollen</span>
            <div className="w-px h-8 bg-ivory/40" />
          </div>
        </div>
      </div>
    </section>
  )
}
