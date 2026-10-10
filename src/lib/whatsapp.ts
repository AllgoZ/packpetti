import { SITE } from './site'

/** Builds a wa.me link with a fully URL-encoded message. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`
}

/** Builds a mailto: link with an encoded subject and body. */
export function mailtoUrl(subject: string, body: string): string {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function generalEnquiryMessage(): string {
  return (
    'Hello Packpetti, I would like to enquire about bagasse food packaging for my business. ' +
    'Please share the available products, specifications, pricing and minimum order quantity.'
  )
}

export function productEnquiryMessage(productName: string, variant?: string, category?: string): string {
  const item = variant ? `${productName} (${variant})` : productName
  const cat = category ? ` from your ${category} range` : ''
  return (
    `Hello Packpetti, I would like to enquire about bulk orders for ${item}${cat}. ` +
    'Please share the available sizes, specifications, pricing and minimum order quantity.'
  )
}

export function categoryEnquiryMessage(category: string): string {
  return (
    `Hello Packpetti, I would like to enquire about your ${category} range for bulk orders. ` +
    'Please share the available products, sizes, specifications, pricing and minimum order quantity.'
  )
}

export interface EnquiryDetails {
  name: string
  business: string
  phone: string
  email?: string
  category: string
  product?: string
  quantity: string
  message?: string
}

export function formEnquiryMessage(d: EnquiryDetails): string {
  const lines = [
    'Hello Packpetti, I would like to make a bulk packaging enquiry.',
    '',
    `Name: ${d.name}`,
    `Business: ${d.business}`,
    `Phone: ${d.phone}`,
  ]
  if (d.email) lines.push(`Email: ${d.email}`)
  lines.push(`Product category: ${d.category}`)
  if (d.product) lines.push(`Product: ${d.product}`)
  lines.push(`Estimated quantity: ${d.quantity}`)
  if (d.message) lines.push('', `Details: ${d.message}`)
  lines.push('', 'Please share the available options, specifications, pricing and minimum order quantity.')
  return lines.join('\n')
}

/**
 * Indian phone validation. Accepts 10-digit mobile numbers starting 6–9,
 * optionally prefixed with +91, 91 or 0, with spaces, dashes or brackets.
 */
export function normaliseIndianPhone(input: string): string | null {
  let digits = input.replace(/[\s\-().]/g, '')
  if (digits.startsWith('+')) digits = digits.slice(1)
  if (!/^\d+$/.test(digits)) return null
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2)
  else if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1)
  if (!/^[6-9]\d{9}$/.test(digits)) return null
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`
}
