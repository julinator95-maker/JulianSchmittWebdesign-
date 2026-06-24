import { WA_NUMBER, WA_MSG } from '../config'
import WhatsAppIcon from './WhatsAppIcon'

export default function WhatsAppButton() {
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`

  return (
    <a
      href={waHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Auf WhatsApp schreiben"
      className="fixed bottom-5 right-5 z-50 md:hidden flex items-center justify-center w-14 h-14 bg-accent text-white shadow-lg shadow-black/30 rounded-full active:bg-[#25D366] transition-colors duration-150"
    >
      <WhatsAppIcon className="w-7 h-7" />
    </a>
  )
}
