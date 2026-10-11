import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CircleAlert, ClipboardList, Info, MessageCircle } from 'lucide-react'
import {
  CATEGORIES,
  PRODUCT_FAMILIES,
  categoryById,
  type CategoryId,
  type ProductFamily,
  type Variant,
} from '../data/products'
import { productEnquiryMessage, whatsappUrl } from '../lib/whatsapp'
import { EASE } from '../lib/motion'
import { Eyebrow } from './Eyebrow'
import { Reveal } from './Reveal'
import { SafeImage } from './SafeImage'
import { LineReveal } from './motion/LineReveal'

export type Filter = CategoryId | 'all'

interface Props {
  filter: Filter
  familyId: string
  onFilterChange: (f: Filter, firstFamilyId: string) => void
  onFamilyChange: (id: string) => void
  onAddToForm: (family: ProductFamily, variantLabel: string) => void
}

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All Products' },
  ...CATEGORIES.map((c) => ({ id: c.id as Filter, label: c.name })),
]

const familiesFor = (f: Filter) => (f === 'all' ? PRODUCT_FAMILIES : PRODUCT_FAMILIES.filter((p) => p.category === f))

/** Parses the leading number of a spec value such as "153 mm". */
const numeric = (v: string) => {
  const m = v.match(/[\d.]+/)
  return m ? parseFloat(m[0]) : NaN
}

/** Relative on-screen scale for a variant when all sizes share one photograph. */
function relativeScale(family: ProductFamily, variant: Variant): number {
  if (!family.scaleSpec || family.variants.some((v) => v.image)) return 1
  const read = (v: Variant) => numeric(v.specs.find((s) => s.label === family.scaleSpec)?.value ?? '')
  const max = Math.max(...family.variants.map(read).filter((n) => !Number.isNaN(n)))
  const cur = read(variant)
  if (!max || Number.isNaN(cur)) return 1
  return Math.max(0.6, cur / max)
}

/** Radio-style size chips with arrow-key navigation and a sliding selected indicator. */
function VariantChips({ family, value, onChange }: { family: ProductFamily; value: string; onChange: (id: string) => void }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const labelId = useId()

  const onKey = (e: KeyboardEvent, i: number) => {
    const n = family.variants.length
    let next = i
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % n
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + n) % n
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = n - 1
    else return
    e.preventDefault()
    onChange(family.variants[next].id)
    refs.current[next]?.focus()
  }

  return (
    <div>
      <p id={labelId} className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        Size / format
      </p>
      <div role="radiogroup" aria-labelledby={labelId} className="flex flex-wrap gap-2">
        {family.variants.map((v, i) => {
          const selected = v.id === value
          return (
            <button
              key={v.id}
              ref={(el) => {
                refs.current[i] = el
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(v.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`relative min-h-11 rounded-md border px-3.5 text-sm font-semibold transition-colors duration-200 ${
                selected ? 'border-forest text-ivory' : 'border-line-strong text-ink/80 hover:border-kraft hover:text-forest'
              }`}
            >
              {selected && (
                <motion.span
                  layoutId={`chip-${family.id}`}
                  className="absolute inset-0 rounded-[5px] bg-forest"
                  transition={{ type: 'spring', stiffness: 520, damping: 40 }}
                />
              )}
              <span className="relative">{v.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function ProductSelector({ filter, familyId, onFilterChange, onFamilyChange, onAddToForm }: Props) {
  const list = familiesFor(filter)
  const family = list.find((f) => f.id === familyId) ?? list[0]
  const index = list.findIndex((f) => f.id === family.id)
  const [variantByFamily, setVariantByFamily] = useState<Record<string, string>>({})
  const railRef = useRef<HTMLUListElement>(null)

  const variant = family.variants.find((v) => v.id === variantByFamily[family.id]) ?? family.variants[0]
  const hasChoice = family.variants.length > 1
  const variantLabel = hasChoice ? variant.label : ''
  const category = categoryById(family.category)
  const image = variant.image ?? family.image
  const scale = relativeScale(family, variant)
  const note = variant.verify ?? family.note

  const step = (dir: 1 | -1) => onFamilyChange(list[(index + dir + list.length) % list.length].id)
  const scrollRail = (dir: 1 | -1) => railRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' })

  return (
    <section id="catalogue" aria-labelledby="catalogue-title" className="section-y bg-sage">
      <div className="container-wide">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Product range</Eyebrow>
            </Reveal>
            <LineReveal
              as="h2"
              id="catalogue-title"
              inView
              className="mt-6 font-display text-[clamp(2.4rem,1.1rem+4.2vw,4.9rem)] font-extrabold leading-[0.98] tracking-[-0.04em]"
              lineClassNames={['text-forest']}
              lines={['Browse the range.']}
            />
          </div>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <p className="flex gap-2.5 text-sm leading-relaxed text-ink/70">
              <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-kraft-700" />
              <span>
                Formats and specifications are indicative and based on standard bagasse packaging ranges. Availability,
                final specifications and pricing are confirmed on enquiry. Images are representative.
              </span>
            </p>
          </Reveal>
        </div>

        {/* Category filter */}
        <div className="relative -mx-4 mt-10 sm:mx-0">
          <div
            role="group"
            aria-label="Filter products by category"
            className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-1 sm:flex-wrap sm:overflow-visible sm:px-0 [mask-image:linear-gradient(to_right,black_92%,transparent)] sm:[mask-image:none]"
          >
            {FILTERS.map((f) => {
              const active = f.id === filter
              const count = familiesFor(f.id).length
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onFilterChange(f.id, familiesFor(f.id)[0].id)}
                  className={`relative inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md border px-4 font-display text-sm font-semibold transition-colors duration-200 ${
                    active ? 'border-forest text-ivory' : 'border-line-strong bg-ivory/60 text-forest hover:border-kraft'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-[5px] bg-forest"
                      transition={{ type: 'spring', stiffness: 460, damping: 38 }}
                    />
                  )}
                  <span className="relative">{f.label}</span>
                  <span className={`relative text-xs font-medium ${active ? 'text-ivory/70' : 'text-muted'}`}>{count}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Featured stage + details */}
        <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-12 lg:gap-8">
          <div className="grain relative aspect-square overflow-hidden rounded-[10px] bg-beige sm:aspect-[6/5] lg:col-span-7">
            {/* Arched backdrop echoing the hero */}
            <div
              aria-hidden="true"
              className="arch absolute bottom-0 left-1/2 h-[88%] w-[66%] -translate-x-1/2 rounded-b-none bg-ivory/75"
            />
            <div
              aria-hidden="true"
              className="arch absolute bottom-0 left-1/2 h-[92%] w-[70%] -translate-x-1/2 border border-b-0 border-kraft/45"
            />

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${family.id}-${image}`}
                initial={{ opacity: 0, y: 14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.16 } }}
                transition={{ duration: 0.45, ease: EASE }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  animate={{ scale }}
                  transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                  className="relative h-[88%] w-[88%]"
                >
                  <span className="ground-shadow" aria-hidden="true" />
                  <SafeImage
                    src={image}
                    alt={`${family.imageAlt}${hasChoice ? `, representative of ${variant.label}` : ''}`}
                    width={500}
                    height={500}
                    decoding="async"
                    className="relative h-full w-full object-contain drop-shadow-[0_18px_20px_rgba(74,52,20,0.18)]"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <p className="absolute left-5 top-5 font-display text-sm font-bold tracking-wide text-kraft-700">
              {category.name}
            </p>
            <div className="absolute right-4 top-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous product family"
                className="flex size-11 items-center justify-center rounded-full border border-line-strong bg-ivory/80 text-forest transition-colors hover:border-forest hover:bg-forest hover:text-ivory"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next product family"
                className="flex size-11 items-center justify-center rounded-full border border-line-strong bg-ivory/80 text-forest transition-colors hover:border-forest hover:bg-forest hover:text-ivory"
              >
                <ArrowRight aria-hidden="true" className="size-4" />
              </button>
            </div>
            {family.scaleSpec && hasChoice && scale !== 1 && (
              <p className="t-caption absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-muted">Relative sizes, approximate</p>
            )}
          </div>

          <div className="flex flex-col lg:col-span-5 lg:justify-center lg:py-2">
            <div aria-live="polite">
              <p className="sr-only">
                Showing {family.name}
                {variantLabel ? `, ${variantLabel}` : ''}
              </p>
              <motion.div
                key={family.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <h3 className="font-display text-[clamp(2rem,1.4rem+2vw,3.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
                  {family.name}
                </h3>
                <p className="mt-3 max-w-[32rem] text-ink/75">{family.description}</p>
              </motion.div>
            </div>

            {hasChoice && (
              <div className="mt-7">
                <VariantChips
                  family={family}
                  value={variant.id}
                  onChange={(id) => setVariantByFamily((s) => ({ ...s, [family.id]: id }))}
                />
              </div>
            )}

            <motion.dl
              key={`${family.id}-${variant.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3"
            >
              {variant.specs.map((s) => (
                <div key={s.label}>
                  <dt className="text-xs font-medium uppercase tracking-[0.1em] text-muted">{s.label}</dt>
                  <dd className="mt-1 font-display text-[1.45rem] font-bold leading-tight tracking-[-0.02em] text-forest">
                    {s.value}
                  </dd>
                </div>
              ))}
            </motion.dl>

            {note && (
              <p className="mt-5 flex gap-2 text-xs leading-relaxed text-kraft-700">
                <CircleAlert aria-hidden="true" className="mt-px size-3.5 shrink-0" />
                <span>{note}</span>
              </p>
            )}

            <div id="stage-actions" className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-stretch xl:flex-row xl:items-center">
              <a
                href={whatsappUrl(productEnquiryMessage(family.name, variantLabel || undefined, category.name))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary group"
                aria-label={`Enquire about ${family.name}${variantLabel ? ` ${variantLabel}` : ''} on WhatsApp`}
              >
                <MessageCircle aria-hidden="true" className="size-4" />
                Enquire About This
              </a>
              <button
                type="button"
                onClick={() => onAddToForm(family, variantLabel)}
                className="btn btn-secondary"
                aria-label={`Add ${family.name}${variantLabel ? ` ${variantLabel}` : ''} to the enquiry form`}
              >
                <ClipboardList aria-hidden="true" className="size-4 text-kraft" />
                Add to enquiry form
              </button>
            </div>
          </div>
        </div>

        {/* Family rail */}
        <div className="mt-10 lg:mt-12">
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted" aria-live="polite">
              {list.length} product {list.length === 1 ? 'family' : 'families'}
            </p>
            <div className="hidden gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scrollRail(-1)}
                aria-label="Scroll product list left"
                className="flex size-10 items-center justify-center rounded-full border border-line-strong text-forest hover:border-forest hover:bg-forest hover:text-ivory"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollRail(1)}
                aria-label="Scroll product list right"
                className="flex size-10 items-center justify-center rounded-full border border-line-strong text-forest hover:border-forest hover:bg-forest hover:text-ivory"
              >
                <ArrowRight aria-hidden="true" className="size-4" />
              </button>
            </div>
          </div>
          <motion.ul
            key={filter}
            ref={railRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0"
          >
            {list.map((f) => {
              const active = f.id === family.id
              return (
                <li key={f.id} className="shrink-0 snap-start">
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => onFamilyChange(f.id)}
                    className={`group flex h-full w-[178px] flex-col items-start gap-2 rounded-lg border p-3 text-left transition-colors duration-200 sm:w-[190px] ${
                      active ? 'border-forest bg-ivory' : 'border-transparent bg-ivory/50 hover:border-line-strong hover:bg-ivory/80'
                    }`}
                  >
                    <span className="grain flex h-24 w-full items-center justify-center rounded-md bg-beige">
                      <SafeImage
                        src={f.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        width={96}
                        height={96}
                        className="h-[82%] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </span>
                    <span className="font-display text-[0.9375rem] font-bold leading-tight text-forest">{f.name}</span>
                    <span className="text-xs text-muted">
                      {f.variants.length} {f.variants.length === 1 ? 'format' : 'formats'}
                    </span>
                  </button>
                </li>
              )
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
