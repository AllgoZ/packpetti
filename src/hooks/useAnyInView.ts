import { useEffect, useState } from 'react'

/** True while any of the elements with the given ids intersects the viewport. */
export function useAnyInView(ids: readonly string[]): boolean {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    if (!els.length) return
    const state = new Map<Element, boolean>()
    const observer = new IntersectionObserver((entries) => {
      for (const e of entries) state.set(e.target, e.isIntersecting)
      setInView([...state.values()].some(Boolean))
    })
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return inView
}
