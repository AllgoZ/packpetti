import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Info } from 'lucide-react'
import { scene } from '../data/scenes'
import { Eyebrow } from './Eyebrow'
import { Reveal } from './Reveal'
import { ImageReveal } from './motion/ImageReveal'
import { LineReveal } from './motion/LineReveal'
import { Parallax } from './motion/Parallax'

const PROCESS = [
  { title: 'Sugarcane', text: 'Cane is crushed to extract its juice.' },
  { title: 'Bagasse', text: 'The fibrous residue left behind is bagasse.' },
  { title: 'Moulding', text: 'The fibre is pulped and pressed into shape.' },
  { title: 'Tableware', text: 'Plates, bowls, trays and containers.' },
]

const POINTS = [
  {
    title: 'Plant-derived material',
    text: 'Made from sugarcane fibre rather than petroleum-based plastics or polystyrene foam.',
  },
  {
    title: 'Uses a processing by-product',
    text: 'Bagasse is what remains after sugarcane has been processed for juice.',
  },
  {
    title: 'An alternative for everyday disposables',
    text: 'A practical option in place of many conventional plastic and foam plates, bowls and boxes.',
  },
  {
    title: 'Formed for real service',
    text: 'Moulded into rigid plates, compartment trays and takeaway formats used in day-to-day food service.',
  },
]

export function MaterialStory() {
  const reduce = useReducedMotion()
  const photo = scene('bowls')

  // The panel starts as an inset, rounded card and opens to full width as it scrolls into view.
  const wrapRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start end', 'start 0.2'] })
  const inset = useTransform(scrollYProgress, [0, 1], ['3.5vw', '0vw'])
  const radius = useTransform(scrollYProgress, [0, 1], [56, 0])

  // Line that draws through the four steps.
  const stepsRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress: stepsProgress } = useScroll({ target: stepsRef, offset: ['start 88%', 'end 62%'] })
  const draw = useTransform(stepsProgress, [0, 1], [0, 1])

  return (
    <div ref={wrapRef}>
      <motion.section
        id="why-bagasse"
        aria-labelledby="material-title"
        style={reduce ? undefined : { marginInline: inset, borderRadius: radius }}
        className="relative overflow-hidden bg-forest text-ivory"
      >
        <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 opacity-70" />
        <div
          aria-hidden="true"
          className="animate-drift pointer-events-none absolute -right-48 -top-48 hidden size-[640px] rounded-full border border-ivory/[0.07] md:block"
        >
          <div className="absolute inset-14 rounded-full border border-ivory/[0.07]" />
        </div>

        <div className="container-wide relative py-20 sm:py-24 lg:py-32">
          <div>
            <Reveal>
              <Eyebrow tone="light">The material</Eyebrow>
            </Reveal>
            <LineReveal
              as="h2"
              id="material-title"
              inView
              className="mt-6 font-display text-[clamp(2.4rem,1rem+5.1vw,5.6rem)] font-extrabold leading-[0.97] tracking-[-0.045em] !text-ivory"
              lineClassNames={['', 'text-kraft-300']}
              lines={['From sugarcane fibre', 'to everyday essentials.']}
            />
          </div>

          <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:items-center lg:gap-x-14">
            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <p className="t-lead max-w-[34rem] text-ivory/85">
                  Bagasse is the fibrous residue left after juice is extracted from sugarcane. Instead of being
                  discarded, that fibre can be pulped and moulded into sturdy food packaging and tableware.
                </p>
                <aside className="mt-8 flex max-w-[34rem] gap-3 text-sm leading-relaxed text-ivory/70">
                  <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-kraft-300" />
                  <p>
                    <strong className="font-semibold text-ivory">A note on compostability.</strong> Whether a bagasse
                    product can be composted depends on its composition and on suitable disposal conditions. Ask us for
                    product-specific information before making environmental claims to your own customers.
                  </p>
                </aside>
              </Reveal>
            </div>

            {/* A leaf-shaped crop, echoing the leaf in the logo */}
            <div className="relative lg:col-span-7">
              <ImageReveal
                inView
                from="right"
                duration={1.25}
                className="relative aspect-[4/4.2] overflow-hidden rounded-bl-[120px] rounded-br-[14px] rounded-tl-[14px] rounded-tr-[120px] bg-forest-950 sm:aspect-[7/5.4] lg:rounded-bl-[200px] lg:rounded-tr-[200px]"
              >
                <Parallax className="h-full" range={5}>
                  <img
                    src={photo.src}
                    srcSet={photo.srcSet}
                    sizes="(min-width: 1024px) 760px, 92vw"
                    width={photo.width}
                    height={photo.height}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-[50%_48%]"
                  />
                </Parallax>
              </ImageReveal>
              <Reveal delay={0.35} y={26} className="pointer-events-none absolute -bottom-6 -left-3 w-[30%] max-w-[230px] lg:-left-10">
                <img
                  src="/images/products/antileak-container-500.webp"
                  alt="Natural-coloured moulded bagasse container, top view"
                  loading="lazy"
                  decoding="async"
                  width={490}
                  height={490}
                  className="w-full drop-shadow-[0_18px_22px_rgba(0,0,0,0.4)]"
                />
              </Reveal>
            </div>
          </div>

          {/* From cane to container */}
          <div className="mt-20 lg:mt-28">
            <ol ref={stepsRef} aria-label="How bagasse tableware is made" className="relative grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
              <span aria-hidden="true" className="absolute left-0 right-0 top-[15px] hidden h-px bg-ivory/15 lg:block" />
              <motion.span
                aria-hidden="true"
                style={reduce ? { scaleX: 1 } : { scaleX: draw }}
                className="absolute left-0 right-0 top-[15px] hidden h-px origin-left bg-kraft-300 lg:block"
              />
              {PROCESS.map((step) => (
                <li key={step.title} className="relative">
                  <span className="relative flex size-8 items-center justify-center rounded-full border border-kraft-300 bg-forest">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-kraft-300" />
                  </span>
                  <p className="mt-4 font-display text-lg font-bold text-ivory">{step.title}</p>
                  <p className="mt-1 max-w-[15rem] text-sm leading-snug text-ivory/70">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-16 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {POINTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06} className="border-t border-ivory/20 pt-5">
                <h3 className="font-display text-[1.0625rem] font-bold leading-snug !text-ivory">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/70">{p.text}</p>
              </Reveal>
            ))}
          </div>

        </div>
      </motion.section>
    </div>
  )
}
