import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

interface ParallaxProps {
  children: ReactNode
  className?: string
  /** Travel as a percentage of the element height, in each direction. Keep small. */
  range?: number
}

/** Small scroll-linked vertical drift for an image. Static under reduced motion. */
export function Parallax({ children, className = '', range = 5 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`])

  if (reduce) return <div className={`overflow-hidden ${className}`}>{children}</div>

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {/* Scaled just enough that the drift never exposes an edge. */}
      <motion.div style={{ y, scale: 1 + (range * 2) / 100 }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  )
}
