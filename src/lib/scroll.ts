const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Scrolls a section into view, respecting reduced-motion preferences. */
export function scrollToId(id: string): void {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
}
