import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, Plus } from 'lucide-react'
import { SITE, telHref } from '../lib/site'
import { generalEnquiryMessage, whatsappUrl } from '../lib/whatsapp'
import { Eyebrow } from './Eyebrow'
import { Reveal } from './Reveal'
import { LineReveal } from './motion/LineReveal'

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: 'What is bagasse food packaging?',
    a: 'Bagasse is the fibrous material left after juice is extracted from sugarcane. It can be pulped and moulded into plates, bowls, trays and containers for food service.',
  },
  {
    q: 'Which types of packaging can I enquire about?',
    a: (
      <>
        Round and compartment plates, bowls, square meal trays, round and rectangular takeaway containers with lids,
        clamshell boxes, sauce and coffee cups, sipper lids, and paper or bio-plastic cutlery. See the{' '}
        <a href="#catalogue" className="font-medium text-forest underline underline-offset-2">
          product range
        </a>{' '}
        for formats and sizes.
      </>
    ),
  },
  {
    q: 'Can I enquire about bulk orders?',
    a: 'Yes. Packpetti focuses on bulk and business enquiries. Share the products and approximate quantities you need, and we will respond with suitable options.',
  },
  {
    q: 'How can I request product specifications?',
    a: 'Use “Enquire About This” on any product, or name the product in the enquiry form. Specifications on this website are indicative; we confirm the details for the exact item you are considering.',
  },
  {
    q: 'How do I check product availability and pricing?',
    a: 'Availability and pricing depend on the product, size and quantity, so they are shared on enquiry rather than listed here. Send your requirement on WhatsApp, by phone or by email.',
  },
  {
    q: 'Are your products compostable?',
    a: 'Compostability depends on each product’s composition and on the disposal conditions available. Ask us about the specific product you are considering and we will share the information we have for it.',
  },
  {
    q: 'How can I contact Packpetti?',
    a: (
      <>
        WhatsApp or call{' '}
        <a href={telHref} className="font-medium text-forest underline underline-offset-2">
          {SITE.phoneDisplay}
        </a>
        , or email{' '}
        <a href={`mailto:${SITE.email}`} className="font-medium text-forest underline underline-offset-2">
          {SITE.email}
        </a>
        .
      </>
    ),
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y bg-soft-white">
      <div className="container-wide grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Eyebrow>FAQ</Eyebrow>
          <LineReveal
            as="h2"
            id="faq-title"
            inView
            className="mt-6 font-display text-[clamp(2.3rem,1.1rem+3.6vw,4.2rem)] font-extrabold leading-[0.98] tracking-[-0.04em]"
            lineClassNames={['text-forest', 'text-kraft']}
            lines={['Questions,', 'answered.']}
          />
          <p className="mt-6 max-w-[24rem] text-ink/75">Can't find what you're looking for? Ask us directly.</p>
          <a
            href={whatsappUrl(generalEnquiryMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary mt-6"
          >
            <MessageCircle aria-hidden="true" className="size-4" /> Ask on WhatsApp
          </a>
        </Reveal>

        <div className="lg:col-span-8 lg:col-start-5 lg:pl-8">
          <ul className="border-t border-line">
            {FAQS.map((item, i) => {
              const isOpen = open === i
              const btnId = `faq-btn-${i}`
              const panelId = `faq-panel-${i}`
              return (
                <li key={item.q} className="border-b border-line">
                  <h3 className="!font-sans !tracking-normal">
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-center justify-between gap-6 py-5 text-left lg:py-6"
                    >
                      <span className="flex items-baseline gap-4">
                        <span aria-hidden="true" className="w-6 shrink-0 font-display text-sm font-bold text-kraft-700">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-display text-[1.1875rem] font-bold tracking-[-0.015em] text-forest group-hover:text-kraft-700 sm:text-[1.375rem]">
                          {item.q}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color] duration-300 ${
                          isOpen ? 'rotate-45 border-forest bg-forest text-ivory' : 'border-line-strong text-forest'
                        }`}
                      >
                        <Plus className="size-4" />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[44rem] pb-6 pl-10 pr-12 text-base leading-relaxed text-ink/75">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
