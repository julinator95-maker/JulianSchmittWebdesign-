import Reveal from './fx/Reveal'
import portrait from '../assets/julian-cutout.webp'

// Freigestelltes Portrait (kein Hintergrund, kein Rahmen, keine Box) —
// steht einfach ruhig da. Nur ein sanfter Boden-Schatten zur Erdung,
// keine Dauerbewegung, kein Cursor-Effekt.
export default function Portrait() {
  return (
    <Reveal className="flex justify-center md:justify-start" y={20}>
      <img
        src={portrait}
        alt="Julian Schmitt, Webdesigner aus Trier"
        draggable="false"
        className="w-[72%] max-w-[300px] md:max-w-[340px] h-auto block"
        style={{ filter: 'drop-shadow(0 22px 30px rgba(58,24,30,0.22))' }}
      />
    </Reveal>
  )
}
