import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { EASE, EASE_OUT } from '../lib/motion'
import { scene } from '../data/scenes'
import { ImageReveal } from './motion/ImageReveal'
import { LineReveal } from './motion/LineReveal'
import { Parallax } from './motion/Parallax'

/** Fade-up used for the hero's supporting content. */
function useRise() {
  const reduce = useReducedMotion()
  return (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: EASE_OUT, delay },
        }
}

export function Hero() {
  const img = scene('hero')
  const rise = useRise()
  const reduce = useReducedMotion()

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-x-clip rounded-b-[2.25rem] bg-forest text-ivory lg:rounded-b-[4rem]"
    >
      {/* Surface texture and quiet organic geometry */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-b-[2.25rem] lg:rounded-b-[4rem]"
      >
        <div className="grain absolute inset-0 opacity-70" />
        <div className="animate-drift absolute -bottom-72 -left-56 size-[720px] rounded-full border border-ivory/[0.07]">
          <div className="absolute inset-16 rounded-full border border-ivory/[0.07]" />
          <div className="absolute inset-32 rounded-full border border-kraft/25" />
        </div>
      </div>

      <div className="container-wide relative grid gap-y-5 pb-14 pt-[84px] lg:grid-cols-12 lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-8 lg:gap-y-0 lg:pb-0 lg:pt-[100px]">
        {/* Headline */}
        <div className="relative z-10 order-1 lg:order-none lg:col-span-6 lg:row-start-2 lg:self-end lg:pb-9">
          <motion.p
            {...(reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6, delay: 0.1 } })}
            className="t-eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-kraft-300"
          >
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-70" />
            <span>Bagasse food packaging</span>
            <span aria-hidden="true" className="hidden sm:inline">
              ·
            </span>
            <span>Bulk supply</span>
          </motion.p>

          <LineReveal
            as="h1"
            id="hero-title"
            className="font-hero mt-5 text-[clamp(2.75rem,0.4rem+5.1vw,5.6rem)] font-[560] leading-[1.03] tracking-[-0.022em] !text-ivory lg:mt-7"
            delay={0.2}
            stagger={0.12}
            lineClassNames={['', 'text-kraft-300']}
            lines={['Pack better.', 'Choose greener.']}
          />
        </div>

        {/* Photograph: an arch rising from the seam between this section and the next */}
        <div className="relative order-2 lg:order-none lg:col-span-6 lg:col-start-7 lg:row-span-4 lg:row-start-1 lg:-mb-28">
          <motion.div
            aria-hidden="true"
            {...(reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.9, delay: 0.7 } })}
            className="arch absolute inset-0 translate-x-2.5 -translate-y-2.5 rounded-b-[18px] border border-kraft/50 lg:translate-x-3.5 lg:-translate-y-3.5"
          />
          <ImageReveal
            from="bottom"
            delay={0.15}
            duration={1.3}
            className="arch relative h-[min(38svh,400px)] min-h-[250px] overflow-hidden rounded-b-[18px] bg-forest-950 lg:h-[clamp(540px,80vh,780px)]"
          >
            <Parallax className="h-full" range={4}>
              <img
                src={img.src}
                srcSet={img.srcSet}
                sizes="(min-width: 1024px) 640px, 92vw"
                width={img.width}
                height={img.height}
                alt={img.alt}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover object-[50%_58%]"
              />
            </Parallax>
          </ImageReveal>

          {/* A real product cut-out overlapping the arch for depth */}
          <motion.div
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 28 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.9, ease: EASE, delay: 1.15 },
                })}
            className="pointer-events-none absolute -bottom-3 -left-2 w-[30%] max-w-[230px] lg:bottom-32 lg:-left-14"
          >
            <span className="ground-shadow" aria-hidden="true" />
            <img
              src="/images/products/antileak-container-750.webp"
              alt="Kraft-coloured round bagasse takeaway container"
              width={553}
              height={553}
              className="relative w-full drop-shadow-[0_16px_20px_rgba(0,0,0,0.35)]"
            />
          </motion.div>
        </div>

        {/* Supporting copy and actions */}
        <div className="relative z-10 order-3 lg:order-none lg:col-span-6 lg:row-start-3 lg:self-start lg:pb-24">
          <motion.p {...rise(0.65)} className="t-lead max-w-[30rem] text-ivory/85">
            Eco-conscious tableware and takeaway packaging for hotels, restaurants and caterers.
          </motion.p>

          <motion.div {...rise(0.8)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#products" className="btn btn-light group">
              Explore the Collection
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a href="#enquiry" className="btn btn-outline-light">
              Discuss a Bulk Order
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to the next section"
        className="absolute bottom-7 left-[max(2rem,calc((100vw-1360px)/2+3rem))] z-10 hidden items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ivory/60 hover:text-ivory lg:flex"
      >
        <span aria-hidden="true" className="relative h-10 w-px overflow-hidden bg-ivory/20">
          <span className="animate-cue absolute inset-x-0 top-0 h-4 bg-kraft-300" />
        </span>
        Scroll
      </a>
    </section>
  )
}
