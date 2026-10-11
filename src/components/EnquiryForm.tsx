import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { CircleAlert, ExternalLink, Mail, MessageCircle, Phone, X, CheckCircle2 } from 'lucide-react'
import { CATEGORIES } from '../data/products'
import { SITE, telHref } from '../lib/site'
import { formEnquiryMessage, mailtoUrl, normaliseIndianPhone, whatsappUrl, type EnquiryDetails } from '../lib/whatsapp'
import { Eyebrow } from './Eyebrow'
import { Reveal } from './Reveal'
import { LineReveal } from './motion/LineReveal'

export interface EnquiryPrefill {
  category: string
  product: string
  /** Changes on every request so the same product can be re-applied. */
  nonce: number
}

interface Props {
  prefill: EnquiryPrefill | null
}

type FieldName = 'name' | 'business' | 'phone' | 'email' | 'category' | 'quantity' | 'message'
type Values = Record<FieldName, string>
type Errors = Partial<Record<FieldName, string>>

const EMPTY: Values = { name: '', business: '', phone: '', email: '', category: '', quantity: '', message: '' }
const MIXED = 'Multiple categories / not sure yet'
const CATEGORY_OPTIONS = [...CATEGORIES.map((c) => c.name), MIXED]
const FIELD_ORDER: FieldName[] = ['name', 'business', 'phone', 'email', 'category', 'quantity', 'message']

function validate(v: Values): Errors {
  const e: Errors = {}
  if (!v.name.trim()) e.name = 'Please enter your name.'
  if (!v.business.trim()) e.business = 'Please enter your business name.'
  if (!v.phone.trim()) e.phone = 'Please enter a phone number.'
  else if (!normaliseIndianPhone(v.phone)) e.phone = 'Enter a 10-digit Indian mobile number, e.g. 98765 43210.'
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Please check the email address.'
  if (!v.category) e.category = 'Please choose a product category.'
  if (!v.quantity.trim()) e.quantity = 'Please give an approximate quantity or requirement.'
  return e
}

export function EnquiryForm({ prefill }: Props) {
  const uid = useId()
  const [values, setValues] = useState<Values>(EMPTY)
  const [product, setProduct] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState<{ url: string } | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  // Apply a product chosen elsewhere on the page.
  useEffect(() => {
    if (!prefill) return
    setSubmitted(null)
    setProduct(prefill.product)
    setValues((v) => ({ ...v, category: prefill.category || v.category }))
    setErrors((e) => ({ ...e, category: undefined }))
    // Focus the first empty required field, without fighting the smooth scroll.
    const t = window.setTimeout(() => {
      const form = formRef.current
      if (!form) return
      const firstEmpty = (['name', 'business', 'phone', 'quantity'] as FieldName[]).find(
        (n) => !(form.elements.namedItem(n) as HTMLInputElement | null)?.value,
      )
      ;(form.elements.namedItem(firstEmpty ?? 'message') as HTMLElement | null)?.focus({ preventScroll: true })
    }, 450)
    return () => window.clearTimeout(t)
  }, [prefill])

  useEffect(() => {
    if (submitted) successRef.current?.focus()
  }, [submitted])

  const id = (n: FieldName) => `${uid}-${n}`

  const update = (name: FieldName, value: string) => {
    setValues((v) => ({ ...v, [name]: value }))
    // Clear an error as soon as the field becomes valid.
    if (errors[name]) {
      const next = validate({ ...values, [name]: value })
      setErrors((e) => ({ ...e, [name]: next[name] }))
    }
  }

  const onBlur = (name: FieldName) => {
    const next = validate(values)
    if (values[name] || errors[name]) setErrors((e) => ({ ...e, [name]: next[name] }))
  }

  const details = (): EnquiryDetails => ({
    name: values.name.trim(),
    business: values.business.trim(),
    phone: normaliseIndianPhone(values.phone) ?? values.phone.trim(),
    email: values.email.trim() || undefined,
    category: values.category,
    product: product || undefined,
    quantity: values.quantity.trim(),
    message: values.message.trim() || undefined,
  })

  const check = (): boolean => {
    const e = validate(values)
    setErrors(e)
    const firstInvalid = FIELD_ORDER.find((n) => e[n])
    if (firstInvalid) {
      summaryRef.current?.focus()
      return false
    }
    return true
  }

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    if (!check()) return
    const url = whatsappUrl(formEnquiryMessage(details()))
    window.open(url, '_blank', 'noopener,noreferrer')
    setSubmitted({ url })
  }

  const onEmail = () => {
    if (!check()) return
    const d = details()
    window.location.href = mailtoUrl(`Bulk enquiry — ${d.business}`, formEnquiryMessage(d))
  }

  const errorList = FIELD_ORDER.filter((n) => errors[n])

  const fieldProps = (name: FieldName) => ({
    id: id(name),
    name,
    value: values[name],
    onBlur: () => onBlur(name),
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${id(name)}-error` : undefined,
    className: 'field',
  })

  const FieldError = ({ name }: { name: FieldName }) =>
    errors[name] ? (
      <p id={`${id(name)}-error`} className="mt-1.5 flex items-center gap-1.5 text-[0.8125rem] text-error">
        <CircleAlert aria-hidden="true" className="size-3.5 shrink-0" />
        {errors[name]}
      </p>
    ) : null

  return (
    <section id="enquiry" aria-labelledby="enquiry-title" className="section-y grain bg-paper">
      <div className="container-wide grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>Bulk enquiry</Eyebrow>
          </Reveal>
          <LineReveal
            as="h2"
            id="enquiry-title"
            inView
            className="mt-6 font-display text-[clamp(2.3rem,1.1rem+3.8vw,4.4rem)] font-extrabold leading-[0.98] tracking-[-0.04em]"
            lineClassNames={['text-forest', 'text-forest', 'text-kraft']}
            lines={['Planning your', 'next bulk', 'order?']}
          />
          <Reveal delay={0.1}>
            <p className="t-lead mt-6 max-w-[30rem] text-ink/75">
              Tell us what your business needs. Our team can help you enquire about suitable packaging options.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <ol className="mt-10 space-y-5">
              {[
                ['Share your requirement', 'Products, sizes and approximate quantities.'],
                ['Send it on WhatsApp', 'The form prepares a message with your details. You press send.'],
                ['Hear back from Packpetti', 'We reply with available options, specifications and pricing.'],
              ].map(([t, d]) => (
                <li key={t} className="grid grid-cols-[1.25rem_1fr]">
                  <span aria-hidden="true" className="mt-2 size-1.5 rounded-full bg-kraft" />
                  <div>
                    <p className="font-display text-base font-bold text-forest">{t}</p>
                    <p className="text-sm text-muted">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 pt-2">
              <p className="text-sm text-muted">Prefer to talk directly?</p>
              <div className="mt-3 flex flex-col gap-2 text-forest">
                <a href={telHref} className="inline-flex min-h-11 items-center gap-3 font-display font-semibold hover:text-kraft-700">
                  <Phone aria-hidden="true" className="size-4 text-kraft" /> {SITE.phoneDisplay}
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex min-h-11 items-center gap-3 font-display font-semibold hover:text-kraft-700"
                >
                  <Mail aria-hidden="true" className="size-4 text-kraft" /> {SITE.email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7" delay={0.05}>
          <div className="rounded-[10px] bg-soft-white p-5 shadow-[0_30px_70px_-45px_rgba(60,42,15,0.5)] sm:p-8 lg:p-10">
            {submitted ? (
              <div ref={successRef} tabIndex={-1} role="status" className="outline-none">
                <CheckCircle2 aria-hidden="true" className="size-8 text-forest" />
                <h3 className="t-h3 mt-4">Your enquiry is ready in WhatsApp.</h3>
                <p className="mt-3 text-ink/75">
                  WhatsApp should now be open in a new tab with your details filled in.{' '}
                  <strong className="font-semibold text-forest">Press send in WhatsApp</strong> to reach the Packpetti
                  team. Your enquiry has not been sent until you do.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a href={submitted.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <ExternalLink aria-hidden="true" className="size-4" /> Open WhatsApp again
                  </a>
                  <button type="button" className="btn btn-secondary" onClick={() => setSubmitted(null)}>
                    Edit enquiry
                  </button>
                </div>
                <p className="t-caption mt-6 text-muted">
                  WhatsApp didn't open? Call {SITE.phoneDisplay} or{' '}
                  <button type="button" onClick={onEmail} className="font-medium text-forest underline underline-offset-2">
                    send the same enquiry by email
                  </button>
                  .
                </p>
              </div>
            ) : (
              <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby={`${uid}-req`}>
                <div
                  ref={summaryRef}
                  tabIndex={-1}
                  aria-live="assertive"
                  className={errorList.length ? 'mb-6 rounded-md border border-error/30 bg-error/5 p-4 outline-none' : 'sr-only'}
                >
                  {errorList.length > 0 && (
                    <>
                      <p className="flex items-center gap-2 text-sm font-semibold text-error">
                        <CircleAlert aria-hidden="true" className="size-4" />
                        Please check {errorList.length === 1 ? '1 field' : `${errorList.length} fields`} below.
                      </p>
                      <ul className="mt-2 list-disc pl-6 text-sm text-error">
                        {errorList.map((n) => (
                          <li key={n}>
                            <a href={`#${id(n)}`} className="underline underline-offset-2">
                              {errors[n]}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                <p id={`${uid}-req`} className="mb-6 text-sm text-muted">
                  Fields marked <span className="text-kraft-700">*</span> are required.
                </p>

                {product && (
                  <div className="mb-6 flex items-center justify-between gap-3 rounded-md border border-forest/20 bg-sage px-4 py-3">
                    <p className="text-sm">
                      <span className="text-muted">Product: </span>
                      <span className="font-semibold text-forest">{product}</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => setProduct('')}
                      className="inline-flex size-9 shrink-0 items-center justify-center rounded text-forest hover:bg-sage-deep"
                      aria-label={`Remove ${product} from enquiry`}
                    >
                      <X aria-hidden="true" className="size-4" />
                    </button>
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor={id('name')} className="field-label">
                      Name <span className="text-kraft-700">*</span>
                    </label>
                    <input {...fieldProps('name')} type="text" autoComplete="name" required onChange={(e) => update('name', e.target.value)} />
                    <FieldError name="name" />
                  </div>
                  <div>
                    <label htmlFor={id('business')} className="field-label">
                      Business name <span className="text-kraft-700">*</span>
                    </label>
                    <input
                      {...fieldProps('business')}
                      type="text"
                      autoComplete="organization"
                      required
                      onChange={(e) => update('business', e.target.value)}
                    />
                    <FieldError name="business" />
                  </div>
                  <div>
                    <label htmlFor={id('phone')} className="field-label">
                      Phone number <span className="text-kraft-700">*</span>
                    </label>
                    <div className="relative">
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-0 flex items-center border-r border-line pl-3.5 pr-3 text-sm font-medium text-muted"
                      >
                        +91
                      </span>
                      <input
                        {...fieldProps('phone')}
                        className="field pl-16"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel-national"
                        placeholder="98765 43210"
                        required
                        onChange={(e) => update('phone', e.target.value)}
                      />
                    </div>
                    <FieldError name="phone" />
                  </div>
                  <div>
                    <label htmlFor={id('email')} className="field-label">
                      Email <span className="font-normal text-muted">(optional)</span>
                    </label>
                    <input
                      {...fieldProps('email')}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      onChange={(e) => update('email', e.target.value)}
                    />
                    <FieldError name="email" />
                  </div>
                  <div>
                    <label htmlFor={id('category')} className="field-label">
                      Product category <span className="text-kraft-700">*</span>
                    </label>
                    <select {...fieldProps('category')} required onChange={(e) => update('category', e.target.value)}>
                      <option value="" disabled>
                        Select a category
                      </option>
                      {CATEGORY_OPTIONS.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <FieldError name="category" />
                  </div>
                  <div>
                    <label htmlFor={id('quantity')} className="field-label">
                      Estimated quantity <span className="text-kraft-700">*</span>
                    </label>
                    <input
                      {...fieldProps('quantity')}
                      type="text"
                      placeholder="e.g. 5,000 plates per month"
                      required
                      onChange={(e) => update('quantity', e.target.value)}
                    />
                    <FieldError name="quantity" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor={id('message')} className="field-label">
                      Message <span className="font-normal text-muted">(optional)</span>
                    </label>
                    <textarea
                      {...fieldProps('message')}
                      rows={4}
                      placeholder="Sizes, delivery location, or anything else we should know."
                      className="field resize-y"
                      onChange={(e) => update('message', e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button type="submit" className="btn btn-primary">
                    <MessageCircle aria-hidden="true" className="size-4" />
                    Continue on WhatsApp
                  </button>
                  <button type="button" onClick={onEmail} className="btn text-forest hover:bg-paper">
                    <Mail aria-hidden="true" className="size-4 text-kraft" />
                    Send by email instead
                  </button>
                </div>
                <p className="t-caption mt-4 text-muted">
                  Your details are placed in a WhatsApp or email message for you to review and send. Nothing is stored
                  on this website.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
