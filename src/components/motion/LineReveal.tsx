import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT } from '../../lib/motion'

interface LineRevealProps {
  /** One entry per visual line. Each line slides up from behind a mask. */
  lines: ReactNode[]
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  /** Optional class for each line, by index. */
  lineClassNames?: string[]
  delay?: number
  stagger?: number
  /** Animate when scrolled into view instead of on mount. */
  inView?: boolean
  id?: string
}

/** Staggered masked-line text reveal. Renders static text when reduced motion is requested. */
export function LineReveal({
  lines,
  as: Tag = 'span',
  className,
  lineClassNames,
  delay = 0,
  stagger = 0.09,
  inView = false,
  id,
}: LineRevealProps) {
  const reduce = useReducedMotion()

  return (
    <Tag id={id} className={className}>
      {lines.map((line, i) => {
        const cls = `block ${lineClassNames?.[i] ?? ''}`
        return (
          <span key={i} className="line-mask">
            {reduce ? (
              <span className={cls}>{line}</span>
            ) : (
              <motion.span
                className={cls}
                initial={{ y: '112%' }}
                {...(inView
                  ? { whileInView: { y: 0 }, viewport: { once: true, margin: '0px 0px -8% 0px' } }
                  : { animate: { y: 0 } })}
                transition={{ duration: 0.95, ease: EASE_OUT, delay: delay + i * stagger }}
              >
                {line}
              </motion.span>
            )}
          </span>
        )
      })}
    </Tag>
  )
}
