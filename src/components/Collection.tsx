import { ArrowUpRight } from 'lucide-react'
import { CATEGORIES, familiesIn, formatCount, type CategoryId } from '../data/products'
import { scene, type SceneId } from '../data/scenes'
import { Eyebrow } from './Eyebrow'
import { Reveal } from './Reveal'
import { LineReveal } from './motion/LineReveal'
import { ImageReveal } from './motion/ImageReveal'

interface Props {
  onSelectCategory: (id: CategoryId) => void
}

interface PanelDef {
  id: CategoryId
  /** Grid placement on large screens. */
  place: string
  /** Mobile proportions. */
  mobileAspect: string
  /** 'photo' panels are full-bleed photographs; 'stage' panels hold product cut-outs on a tinted surface. */
  kind: 'photo' | 'stage'
  sceneId?: SceneId
  objectPosition?: string
  surface?: string
  cutouts?: { src: string; className: string }[]
  /** Larger type for the feature panel. */
  feature?: boolean
}

const PANELS: PanelDef[] = [
  {
    id: 'plates-bowls',
    place: 'lg:col-span-6 lg:row-span-2',
    mobileAspect: 'aspect-[4/4.7]',
    kind: 'photo',
    sceneId: 'plates',
    objectPosition: '50% 40%',
    feature: true,
  },
  {
    id: 'meal-trays',
    place: 'lg:col-span-6',
    mobileAspect: 'aspect-[4/3.2]',
    kind: 'photo',
    sceneId: 'tray',
    objectPosition: '50% 38%',
  },
  {
    id: 'takeaway',
    place: 'lg:col-span-3',
    mobileAspect: 'aspect-[4/3.6]',
    kind: 'stage',
    surface: 'bg-kraft-100',
    cutouts: [
      { src: '/images/products/rectangle-container.webp', className: 'left-[0%] top-[8%] w-[52%]' },
      { src: '/images/products/antileak-container-750.webp', className: 'right-[3%] top-[30%] w-[36%]' },
    ],
  },
  {
    id: 'clamshells',
    place: 'lg:col-span-3',
    mobileAspect: 'aspect-[4/3.6]',
    kind: 'stage',
    surface: 'bg-sage',
    cutouts: [
      { src: '/images/products/clamshell-subway-9x6.webp', className: 'left-[0%] top-[20%] w-[50%]' },
      { src: '/images/products/clamshell-burger-6x6.webp', className: 'right-[0%] top-[4%] w-[46%]' },
    ],
  },
  {
    id: 'cups-lids',
    place: 'lg:col-span-7',
    mobileAspect: 'aspect-[4/3.3]',
    kind: 'photo',
    sceneId: 'cups',
    objectPosition: '50% 46%',
  },
  {
    id: 'cutlery',
    place: 'lg:col-span-5',
    mobileAspect: 'aspect-[4/3.3]',
    kind: 'photo',
    sceneId: 'cutlery',
    objectPosition: '50% 62%',
  },
]

function PanelBody({ def, onSelect }: { def: PanelDef; onSelect: Props['onSelectCategory'] }) {
  const cat = CATEGORIES.find((c) => c.id === def.id)!
  const families = familiesIn(def.id).length
  const formats = formatCount(def.id)
  const photo = def.kind === 'photo'
  const img = def.sceneId ? scene(def.sceneId) : null

  return (
    <a
      href="#catalogue"
      onClick={(e) => {
        e.preventDefault()
        onSelect(def.id)
      }}
      className={`group relative h-full w-full overflow-hidden ${def.mobileAspect} lg:aspect-auto ${
        photo ? 'block bg-forest-950' : `flex flex-col ${def.surface}`
      }`}
      style={{ borderRadius: '10px' }}
    >
      {photo && img && (
        <>
          <img
            src={img.src}
            srcSet={img.srcSet}
            sizes={def.feature ? '(min-width: 1024px) 660px, 92vw' : '(min-width: 1024px) 700px, 92vw'}
            width={img.width}
            height={img.height}
            alt={img.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-brand)] group-hover:scale-[1.045]"
            style={{ objectPosition: def.objectPosition }}
          />
          {/* Legibility scrim for the caption */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/45 via-45% to-transparent"
          />
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-forest-950/45 to-transparent" />
        </>
      )}

      {!photo && (
        <div
          aria-hidden="true"
          className="relative min-h-[120px] flex-1 transition-transform duration-[900ms] ease-[var(--ease-brand)] group-hover:scale-[1.05]"
        >
          {def.cutouts?.map((c) => (
            <img
              key={c.src}
              src={c.src}
              alt=""
              loading="lazy"
              decoding="async"
              width={400}
              height={400}
              className={`absolute drop-shadow-[0_14px_16px_rgba(74,52,20,0.2)] ${c.className}`}
            />
          ))}
        </div>
      )}

      <div className={`${photo ? 'absolute inset-x-0 bottom-0' : 'relative'} p-5 sm:p-6 ${def.feature ? 'lg:p-8' : ''}`}>
        <h3
          className={`font-display font-extrabold tracking-[-0.03em] ${photo ? '!text-ivory' : '!text-forest'} ${
            def.feature ? 'text-[clamp(1.9rem,1.3rem+1.8vw,2.9rem)] leading-none' : 'text-[clamp(1.25rem,1.1rem+0.4vw,1.5rem)] leading-[1.05]'
          }`}
        >
          {cat.name}
        </h3>
        <p
          className={`mt-2 max-w-[30rem] text-[0.9375rem] leading-snug ${
            photo ? 'text-ivory/85' : 'text-ink/75'
          } ${''}`}
        >
          {cat.summary}
        </p>
        <div className={`mt-4 flex items-center justify-between gap-3 ${photo ? 'text-ivory' : 'text-forest'}`}>
          <span
            className={`text-xs font-medium transition-all duration-500 hoverable:translate-y-1 hoverable:opacity-0 hoverable:group-hover:translate-y-0 hoverable:group-hover:opacity-100 hoverable:group-focus-visible:translate-y-0 hoverable:group-focus-visible:opacity-100 ${
              photo ? 'text-ivory/80' : 'text-muted'
            }`}
          >
            {families} {families === 1 ? 'family' : 'families'} · {formats} formats
          </span>
          <span
            className={`inline-flex items-center gap-1.5 font-display text-sm font-bold ${
              photo ? 'text-ivory' : 'text-forest'
            }`}
          >
            Explore
            <span
              aria-hidden="true"
              className={`flex size-8 items-center justify-center rounded-full transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                photo ? 'bg-ivory text-forest' : 'bg-forest text-ivory'
              }`}
            >
              <ArrowUpRight className="size-4" />
            </span>
          </span>
        </div>
      </div>
    </a>
  )
}

export function Collection({ onSelectCategory }: Props) {
  return (
    <section id="products" aria-labelledby="collection-title" className="section-y bg-beige">
      <div className="container-wide">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow>The collection</Eyebrow>
            </Reveal>
            <LineReveal
              as="h2"
              id="collection-title"
              inView
              className="mt-6 font-display text-[clamp(2.4rem,1.1rem+4.2vw,4.9rem)] font-extrabold leading-[0.98] tracking-[-0.04em]"
              lineClassNames={['text-forest', 'text-forest']}
              lines={['Good packaging.', <span className="text-kraft">Thoughtfully chosen.</span>]}
            />
          </div>
          <Reveal className="lg:col-span-4" delay={0.1}>
            <p className="t-lead max-w-[26rem] text-ink/75">
              Explore practical bagasse formats for everyday serving, takeaway and food-service operations.
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-12 lg:gap-5 lg:[grid-template-rows:300px_340px_340px]">
          {PANELS.map((def, i) => (
            <li key={def.id} className={`min-w-0 ${def.place}`}>
              <ImageReveal
                inView
                from={i % 2 === 0 ? 'bottom' : 'left'}
                settle={false}
                duration={0.9}
                delay={(i % 2) * 0.08}
                className="h-full rounded-[10px]"
              >
                <PanelBody def={def} onSelect={onSelectCategory} />
              </ImageReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
