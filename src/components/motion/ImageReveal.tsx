import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT } from '../../lib/motion'

type From = 'bottom' | 'top' | 'left' | 'right' | 'center'

const HIDDEN: Record<From, string> = {
  bottom: 'inset(100% 0% 0% 0%)',
  top: 'inset(0% 0% 100% 0%)',
  left: 'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
  center: 'inset(50% 50% 50% 50%)',
}
const SHOWN = 'inset(0% 0% 0% 0%)'

interface ImageRevealProps {
  children: ReactNode
  className?: string
  from?: From
  delay?: number
  duration?: number
  /** Reveal when scrolled into view instead of on mount. */
  inView?: boolean
  /** Subtle settle: the content starts slightly zoomed and eases to 1. */
  settle?: boolean
}

/** Clip-path reveal with an inner scale settle. Shows content immediately under reduced motion. */
export function ImageReveal({
  children,
  className,
  from = 'bottom',
  delay = 0,
  duration = 1.15,
  inView = false,
  settle = true,
}: ImageRevealProps) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>

  const trigger = inView
    ? { whileInView: { clipPath: SHOWN }, viewport: { once: true, margin: '0px 0px -8% 0px' } }
    : { animate: { clipPath: SHOWN } }
  const settleTrigger = inView
    ? { whileInView: { scale: 1 }, viewport: { once: true, margin: '0px 0px -8% 0px' } }
    : { animate: { scale: 1 } }

  return (
    <motion.div
      className={className}
      initial={{ clipPath: HIDDEN[from] }}
      {...trigger}
      transition={{ duration, ease: EASE_OUT, delay }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: settle ? 1.14 : 1 }}
        {...settleTrigger}
        transition={{ duration: duration + 0.5, ease: EASE_OUT, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
