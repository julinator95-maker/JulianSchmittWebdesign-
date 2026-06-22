// Echte Kontaktdaten (aus Dienstleistungsvertrag)
export const PHONE_DISPLAY = '0152 01988880'
export const WA_NUMBER = '4915201988880'
export const WA_MSG = 'Hallo Julian, ich interessiere mich für eine neue Website.'
export const EMAIL = 'julian.schmitt.trier@gmail.com'
export const ADDRESS = 'Schweringstraße 18, 54294 Trier'
export const CITY = 'Trier'

export const waLink = (msg = WA_MSG) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
