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
      className="fixed bottom-5 right-5 z-50 md:hidden flex items-center justify-center w-14 h-14 bg-[#25D366] text-white shadow-lg shadow-black/20 rounded-full active:scale-95 transition-transform"
    >
      <WhatsAppIcon className="w-7 h-7" />
    </a>
  )
}
