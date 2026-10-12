import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Plus } from 'lucide-react'
import { PRODUCT_FAMILIES } from '../data/products'
import { SEGMENT_SCENE, scene } from '../data/scenes'
import { EASE } from '../lib/motion'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { Eyebrow } from './Eyebrow'
import { Reveal } from './Reveal'
import { LineReveal } from './motion/LineReveal'

interface Props {
  onShowFamily: (familyId: string) => void
}

const SEGMENTS: { id: string; name: string; text: string; families: string[] }[] = [
  {
    id: 'hotels',
    name: 'Hotels',
    text: 'Banquets, buffets, room service and staff dining each need different formats.',
    families: ['round-plate', 'compartment-plate', 'bowl'],
  },
  {
    id: 'restaurants',
    name: 'Restaurants',
    text: 'Takeaway counters and delivery orders that need containers with matching lids.',
    families: ['round-container', 'rectangle-container', 'clamshell-box'],
  },
  {
    id: 'caterers',
    name: 'Caterers',
    text: 'Events where hundreds of plates go out at once and service has to keep moving.',
    families: ['compartment-plate', 'meal-tray'],
  },
  {
    id: 'canteens',
    name: 'Canteens',
    text: 'Daily set meals served in volume, from breakfast to the evening shift.',
    families: ['meal-tray', 'bowl', 'round-plate'],
  },
  {
    id: 'cafeterias',
    name: 'Cafeterias',
    text: 'Quick-service food and beverages, often eaten on the go.',
    families: ['coffee-cup', 'clamshell-box'],
  },
  {
    id: 'takeaway',
    name: 'Takeaway & food service',
    text: 'Counters, kiosks and stalls that pack food to go all day.',
    families: ['clamshell-3cp', 'rectangle-container', 'sauce-cup'],
  },
  {
    id: 'cloud-kitchens',
    name: 'Cloud kitchens',
    text: 'Delivery-only kitchens that want consistent formats across the whole menu.',
    families: ['round-container', 'rectangle-container', 'sauce-cup'],
  },
  {
    id: 'institutional',
    name: 'Institutional buyers',
    text: 'Offices, campuses and institutions with recurring, high-volume requirements.',
    families: ['meal-tray', 'compartment-plate', 'bowl'],
  },
]

const familyName = (id: string) => PRODUCT_FAMILIES.find((f) => f.id === id)?.name ?? id

export function WhoWeServe({ onShowFamily }: Props) {
  const [active, setActive] = useState(0)
  const desktop = useMediaQuery('(min-width: 1024px)')
  const current = SEGMENTS[Math.max(active, 0)]
  const currentScene = scene(SEGMENT_SCENE[current.id])

  return (
    <section id="who-we-serve" aria-labelledby="serve-title" className="section-y">
      <div className="container-wide grid gap-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Eyebrow>Who we serve</Eyebrow>
            </Reveal>
            <LineReveal
              as="h2"
              id="serve-title"
              inView
              className="mt-6 font-display text-[clamp(2.2rem,1.1rem+3.6vw,4.2rem)] font-extrabold leading-[0.98] tracking-[-0.04em]"
              lineClassNames={['text-forest', 'text-forest', 'text-kraft']}
              lines={['Built for the way', 'your business', 'serves.']}
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[26rem] text-ink/75">
                Every operation packs food differently. These are the formats each type of business most often asks
                about.
              </p>
            </Reveal>

            {/* Photograph that follows the selected row (large screens) */}
            <div className="mt-10 hidden lg:block">
              <div className="arch relative aspect-[5/5.3] overflow-hidden rounded-b-[14px] bg-beige">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img
                    key={currentScene.src}
                    src={currentScene.src}
                    srcSet={currentScene.srcSet}
                    sizes="520px"
                    width={currentScene.width}
                    height={currentScene.height}
                    alt={currentScene.alt}
                    loading="lazy"
                    decoding="async"
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.75, ease: EASE }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
              </div>
              <p className="t-caption mt-3 flex items-center gap-3 text-muted">
                <span aria-hidden="true" className="h-px w-6 bg-kraft" />
                {current.name}
              </p>
            </div>
          </div>
        </div>

        <ol className="lg:col-span-7">
          {SEGMENTS.map((s, i) => {
            const open = active === i
            const sceneImg = scene(SEGMENT_SCENE[s.id])
            return (
              <li key={s.id}>
                <div
                  onMouseEnter={() => desktop && setActive(i)}
                  onFocus={() => desktop && setActive(i)}
                  className={`rounded-[10px] px-1 transition-colors duration-300 sm:px-4 lg:px-6 ${
                    open ? 'lg:bg-beige/70' : ''
                  }`}
                >
                  <h3 className="!font-sans !tracking-normal">
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`serve-panel-${s.id}`}
                      onClick={() => setActive(!desktop && open ? -1 : i)}
                      className="flex w-full items-center gap-4 py-5 text-left lg:cursor-default lg:pb-2 lg:pt-6"
                    >
                      <span
                        className={`flex-1 font-display text-[clamp(1.5rem,1.2rem+1.1vw,2.2rem)] font-extrabold leading-none tracking-[-0.03em] transition-colors duration-300 ${
                          open ? 'text-forest' : 'text-forest/65'
                        }`}
                      >
                        {s.name}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color] duration-300 lg:hidden ${
                          open ? 'rotate-45 border-forest bg-forest text-ivory' : 'border-line-strong text-forest'
                        }`}
                      >
                        <Plus className="size-4" />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`serve-panel-${s.id}`}
                    inert={!desktop && !open}
                    className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-brand)] lg:grid-rows-[1fr] ${
                      open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="pb-6 lg:pb-7">
                        <div>
                          <p className="max-w-[28rem] text-[0.9375rem] text-ink/75">{s.text}</p>
                          {/* Inline photograph for touch layouts */}
                          <img
                            src={sceneImg.src}
                            srcSet={sceneImg.srcSet}
                            sizes="(min-width: 640px) 420px, 92vw"
                            width={sceneImg.width}
                            height={sceneImg.height}
                            alt={sceneImg.alt}
                            loading="lazy"
                            decoding="async"
                            className="mt-4 aspect-[16/10] w-full rounded-[10px] object-cover lg:hidden"
                          />
                        </div>
                        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1">
                          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Often enquire about</p>
                          <ul className="flex flex-wrap gap-x-5">
                            {s.families.map((id) => (
                              <li key={id}>
                                <a
                                  href={`#catalogue`}
                                  onClick={(e) => {
                                    e.preventDefault()
                                    onShowFamily(id)
                                  }}
                                  className="group inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-forest hover:text-kraft-700"
                                >
                                  <span className="link-underline">{familyName(id)}</span>
                                  <ArrowRight
                                    aria-hidden="true"
                                    className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
                                  />
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
