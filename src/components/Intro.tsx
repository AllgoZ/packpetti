import { Eyebrow } from './Eyebrow'
import { Reveal } from './Reveal'
import { LineReveal } from './motion/LineReveal'

const PRINCIPLES = [
  {
    title: 'Formats for real service',
    text: 'Plates, trays, containers, cups and cutlery for everyday serving and takeaway.',
  },
  {
    title: 'Bulk enquiries welcome',
    text: 'Tell us the products and quantities you need, and we respond with suitable options.',
  },
  {
    title: 'Clear information',
    text: 'Ask for sizes and specifications for any format before you place an order.',
  },
]

/** Brand introduction. The hero's arched photograph rises into the top-right of this section. */
export function Intro() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative pb-section pt-16 lg:pt-44">
      <div className="container-wide grid gap-y-12 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-16">
        <div className="lg:col-span-12">
          <Reveal>
            <Eyebrow>About Packpetti</Eyebrow>
          </Reveal>
          <LineReveal
            as="h2"
            id="about-title"
            inView
            className="mt-6 font-display text-[clamp(2.4rem,1.1rem+4.2vw,4.9rem)] font-extrabold leading-[0.98] tracking-[-0.04em]"
            lineClassNames={['text-forest', 'text-kraft']}
            lines={['Thoughtful packaging.', 'Practical choices.']}
          />
        </div>

        <div className="lg:col-span-5 lg:row-start-2">
          <Reveal>
            <img
              src="/images/logo-mark.png"
              alt=""
              aria-hidden="true"
              loading="lazy"
              width={174}
              height={202}
              className="mb-6 h-14 w-auto"
            />
            <p className="t-lead max-w-[32rem] text-ink/80">
              Packpetti helps food-service businesses explore practical bagasse packaging options for everyday serving
              and takeaway needs, with bulk enquiries welcome.
            </p>
          </Reveal>
        </div>

        <ol className="grid gap-8 lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:gap-9">
          {PRINCIPLES.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 0.07} className="grid grid-cols-[3rem_1fr] gap-x-2">
                <span className="font-display text-sm font-bold text-kraft-700">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-forest">{p.title}</h3>
                  <p className="mt-1.5 max-w-[26rem] text-[0.9375rem] text-ink/70">{p.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
