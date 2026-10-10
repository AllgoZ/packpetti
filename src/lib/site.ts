// Single source of truth for Packpetti's contact details and navigation.

export const SITE = {
  name: 'Packpetti',
  tagline: 'Perfectly Packed & Pettified.',
  url: 'https://packpetti.com/',
  phoneDisplay: '+91 96001 53883',
  phoneE164: '+919600153883',
  /** International format without "+" or spaces, as required by wa.me links. */
  whatsappNumber: '919600153883',
  email: 'packpetti@gmail.com',
} as const

export const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Products', href: '#products' },
  { label: 'Who We Serve', href: '#who-we-serve' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#enquiry' },
] as const

export const telHref = `tel:${SITE.phoneE164}`
