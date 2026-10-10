import type { ReactNode } from 'react'

interface EyebrowProps {
  children: ReactNode
  tone?: 'kraft' | 'light'
  className?: string
}

/** Small uppercase label preceded by a fine kraft rule. */
export function Eyebrow({ children, tone = 'kraft', className = '' }: EyebrowProps) {
  const color = tone === 'light' ? 'text-kraft-300' : 'text-kraft-700'
  return (
    <p className={`t-eyebrow flex items-center gap-3 ${color} ${className}`}>
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-70" />
      {children}
    </p>
  )
}
