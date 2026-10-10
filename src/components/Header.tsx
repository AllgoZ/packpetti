import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { NAV_LINKS, SITE, telHref } from '../lib/site'
import { EASE } from '../lib/motion'
import { useScrolled } from '../hooks/useScrolled'
import { useActiveSection } from '../hooks/useActiveSection'

const SECTION_IDS = ['top', 'about', 'products', 'catalogue', 'who-we-serve', 'enquiry', 'faq'] as const

/** Maps sub-sections onto the nav item they belong to. */
const NAV_FOR_SECTION: Record<string, string> = {
  top: '#top',
  about: '#about',
  products: '#products',
  catalogue: '#products',
  'who-we-serve': '#who-we-serve',
  enquiry: '#enquiry',
  faq: '#enquiry',
}

export function Header() {
  const scrolled = useScrolled(24)
  const active = useActiveSection(SECTION_IDS)
  const activeHref = active ? NAV_FOR_SECTION[active] : null
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Escape to close, simple focus trap, and scroll lock while the menu is open.
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const panel = panelRef.current
    panel?.querySelector<HTMLElement>('a, button')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      const items = [toggleRef.current, ...panel.querySelectorAll<HTMLElement>('a, button')].filter(
        (el): el is HTMLElement => !!el,
      )
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Close the mobile menu if the viewport grows to desktop width.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Over the green hero the header is transparent with light text; once the page
  // scrolls it becomes a solid ivory bar with dark text.
  const onDark = !scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        open
          ? 'border-b border-ivory/10 bg-forest-950'
          : scrolled
            ? 'border-b border-line bg-ivory/90 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-ivory focus:px-4 focus:py-2 focus:text-forest"
      >
        Skip to content
      </a>
      <div className="container-wide flex h-[68px] items-center justify-between gap-3 sm:gap-6 lg:h-[76px]">
        <a href="#top" className="relative block shrink-0" aria-label="Packpetti — back to top">
          <img
            src="/images/lockup-reversed.png"
            alt="Packpetti"
            width={677}
            height={120}
            className={`h-[26px] w-auto transition-opacity duration-300 sm:h-[30px] lg:h-[32px] ${onDark ? 'opacity-100' : 'opacity-0'}`}
          />
          <img
            src="/images/lockup-transparent.png"
            alt=""
            aria-hidden="true"
            width={677}
            height={120}
            className={`absolute inset-0 h-[26px] w-auto transition-opacity duration-300 sm:h-[30px] lg:h-[32px] ${onDark ? 'opacity-0' : 'opacity-100'}`}
          />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((l) => {
              const current = activeHref === l.href
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={current ? 'true' : undefined}
                    className={`link-underline py-1 font-display text-[0.9375rem] font-semibold transition-colors duration-300 ${
                      onDark
                        ? current
                          ? 'text-ivory'
                          : 'text-ivory/75 hover:text-ivory'
                        : current
                          ? 'text-forest'
                          : 'text-ink/75 hover:text-forest'
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href={telHref}
            className={`hidden items-center gap-2 px-3 font-display text-sm font-semibold transition-colors duration-300 xl:flex ${
              onDark ? 'text-ivory' : 'text-forest'
            }`}
          >
            <Phone aria-hidden="true" className={`size-4 ${onDark ? 'text-kraft-300' : 'text-kraft'}`} strokeWidth={2} />
            {SITE.phoneDisplay}
          </a>
          <a href="#enquiry" className={`btn hidden min-h-11 sm:inline-flex ${onDark ? 'btn-light' : 'btn-primary'}`}>
            Bulk Enquiry
          </a>
          <a
            href="#enquiry"
            className={`btn min-h-11 px-4 text-sm sm:hidden ${onDark ? 'btn-light' : 'btn-primary'}`}
            aria-label="Bulk enquiry"
          >
            Enquire
          </a>
          <button
            ref={toggleRef}
            type="button"
            className={`inline-flex size-11 items-center justify-center rounded-md transition-colors lg:hidden ${
              onDark ? 'text-ivory hover:bg-ivory/10' : 'text-forest hover:bg-paper'
            }`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="absolute inset-x-0 top-full h-[calc(100dvh-68px)] overflow-y-auto bg-forest-950 text-ivory lg:hidden"
          >
            <nav aria-label="Mobile" className="container-wide flex min-h-full flex-col py-6">
              <ul>
                {NAV_LINKS.map((l, i) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 border-b border-ivory/10 py-4 font-display text-[1.75rem] font-bold tracking-tight text-ivory"
                    >
                      <span className="w-6 font-sans text-xs font-medium text-kraft-300">0{i + 1}</span>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-8 grid gap-3">
                <a href="#enquiry" onClick={() => setOpen(false)} className="btn btn-light w-full">
                  Bulk Enquiry
                </a>
                <a href={telHref} className="btn btn-outline-light w-full">
                  <Phone aria-hidden="true" className="size-4" /> Call {SITE.phoneDisplay}
                </a>
              </div>
              <p className="t-caption mt-auto pt-10 text-ivory/60">{SITE.tagline}</p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
