import Reveal from './fx/Reveal'
import portrait from '../assets/julian-hero.webp'

// Echtes Foto (Backsteinwand) statt Freisteller — wirkt natürlich statt
// ausgeschnitten. Weiche Rundum-Maske löst die Kanten auf, sanfter
// Weinrot-Schein dahinter. Keine Dauerbewegung, nur einmaliges Reveal.
export default function Portrait() {
  return (
    <Reveal className="flex justify-center md:justify-start" y={20}>
      <div className="relative w-[80%] max-w-[380px]">
        <div
          aria-hidden="true"
          className="absolute -inset-10 blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse at 50% 45%, rgba(177,69,82,0.4), transparent 68%)',
          }}
        />
        <img
          src={portrait}
          alt="Julian Schmitt, Webdesigner aus Trier, vor einer Backsteinwand"
          draggable="false"
          width="900"
          height="1124"
          loading="lazy"
          decoding="async"
          className="relative w-full h-auto block"
          style={{
            maskImage:
              'radial-gradient(ellipse 84% 88% at 50% 44%, black 60%, transparent 97%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 84% 88% at 50% 44%, black 60%, transparent 97%)',
          }}
        />
      </div>
    </Reveal>
  )
}
