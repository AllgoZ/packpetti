import { ArrowRight, Globe, Mail, MessageCircle, Phone } from 'lucide-react'
import { NAV_LINKS, SITE, telHref } from '../lib/site'
import { generalEnquiryMessage, whatsappUrl } from '../lib/whatsapp'
import { Reveal } from './Reveal'
import { LineReveal } from './motion/LineReveal'

export function FinalCTA() {
  return (
    <section id="final-cta" aria-labelledby="cta-title" className="relative overflow-hidden bg-forest text-ivory">
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 opacity-70" />
      {/* Concentric arcs echo the arch used throughout the page */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-52 -top-52 hidden md:block">
        <div className="animate-drift size-[760px] rounded-full border border-ivory/[0.07]">
          <div className="absolute inset-20 rounded-full border border-ivory/[0.07]" />
          <div className="absolute inset-40 rounded-full border border-kraft/25" />
        </div>
      </div>

      <div className="container-wide relative pt-20 sm:pt-24 lg:pb-28 lg:pt-28">
        <div className="relative z-10 max-w-[52rem] lg:max-w-[58%]">
          <Reveal>
            <p className="t-eyebrow flex items-center gap-3 text-kraft-300">
              <span aria-hidden="true" className="h-px w-8 bg-current opacity-70" />
              Bulk enquiries welcome
            </p>
          </Reveal>
          <LineReveal
            as="h2"
            id="cta-title"
            inView
            className="t-mega mt-6 !text-ivory"
            lineClassNames={['', 'text-kraft-300']}
            lines={['Ready to pack', <span className="t-accent text-[1.06em] font-normal">better?</span>]}
          />
          <Reveal delay={0.1}>
            <p className="t-lead mt-8 max-w-[34rem] text-ivory/80">
              Tell us what your business needs and enquire about bulk packaging options.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl(generalEnquiryMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-light group"
              >
                <MessageCircle aria-hidden="true" className="size-4" />
                Enquire on WhatsApp
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a href={telHref} className="btn btn-outline-light">
                <Phone aria-hidden="true" className="size-4" />
                Call Packpetti
              </a>
            </div>
            <p className="mt-6 text-sm text-ivory/65">
              <a href={telHref} className="hover:text-ivory">
                {SITE.phoneDisplay}
              </a>{' '}
              <span aria-hidden="true">·</span>{' '}
              <a href={`mailto:${SITE.email}`} className="hover:text-ivory">
                {SITE.email}
              </a>
            </p>
          </Reveal>
        </div>

        {/* Product composition that bleeds off the section edge */}
        <div
          aria-hidden="true"
          className="relative mt-6 h-[300px] sm:h-[380px] lg:absolute lg:inset-y-0 lg:right-6 lg:mt-0 lg:h-auto lg:w-[42%]"
        >
          <Reveal y={40} className="absolute -right-[8%] top-[6%] w-[72%] lg:top-[12%]">
            <img
              src="/images/products/round-plate.webp"
              alt=""
              loading="lazy"
              decoding="async"
              width={908}
              height={908}
              className="w-full drop-shadow-[0_30px_36px_rgba(0,0,0,0.4)]"
            />
          </Reveal>
          <Reveal y={46} delay={0.12} className="absolute -bottom-[14%] left-[2%] w-[48%] lg:-bottom-[6%]">
            <img
              src="/images/products/clamshell-burger-8x8.webp"
              alt=""
              loading="lazy"
              decoding="async"
              width={616}
              height={616}
              className="w-full drop-shadow-[0_22px_26px_rgba(0,0,0,0.4)]"
            />
          </Reveal>
          <Reveal y={50} delay={0.22} className="absolute -bottom-[12%] right-[6%] w-[30%] lg:-bottom-[8%]">
            <img
              src="/images/products/coffee-cup-250.webp"
              alt=""
              loading="lazy"
              decoding="async"
              width={650}
              height={650}
              className="w-full drop-shadow-[0_18px_22px_rgba(0,0,0,0.4)]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer id="contact" className="bg-forest-950 text-ivory/80">
      <div className="container-wide grid gap-12 py-16 md:grid-cols-12 lg:py-20">
        <div className="md:col-span-5">
          <img
            src="/images/logo-reversed.png"
            alt="Packpetti — Perfectly Packed & Pettified."
            loading="lazy"
            decoding="async"
            width={541}
            height={353}
            className="w-[200px] sm:w-[220px]"
          />
          <p className="mt-6 max-w-[22rem] text-sm leading-relaxed">
            Trading &amp; distribution of bagasse food packaging.
            <br />
            Bulk enquiries welcome.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="t-eyebrow text-kraft-300">Explore</p>
          <ul className="mt-4 space-y-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-flex min-h-9 items-center text-sm hover:text-ivory">
                  <span className="link-underline">{l.label}</span>
                </a>
              </li>
            ))}
            <li>
              <a href="#faq" className="inline-flex min-h-9 items-center text-sm hover:text-ivory">
                <span className="link-underline">FAQ</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="t-eyebrow text-kraft-300">Contact</p>
          <ul className="mt-4 space-y-1 text-sm">
            <li>
              <a href={telHref} className="inline-flex min-h-10 items-center gap-3 hover:text-ivory">
                <Phone aria-hidden="true" className="size-4 text-kraft-300" />
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl(generalEnquiryMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-3 hover:text-ivory"
              >
                <MessageCircle aria-hidden="true" className="size-4 text-kraft-300" />
                WhatsApp {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="inline-flex min-h-10 items-center gap-3 hover:text-ivory">
                <Mail aria-hidden="true" className="size-4 text-kraft-300" />
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={SITE.url} className="inline-flex min-h-10 items-center gap-3 hover:text-ivory">
                <Globe aria-hidden="true" className="size-4 text-kraft-300" />
                packpetti.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="container-wide flex flex-col gap-2 py-6 text-xs text-ivory/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p>{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
