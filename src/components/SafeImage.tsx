import { useState, type ImgHTMLAttributes } from 'react'

/** An <img> that shows a labelled placeholder instead of a broken-image icon if loading fails. */
export function SafeImage({ alt, className = '', ...rest }: ImgHTMLAttributes<HTMLImageElement> & { alt: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-beige p-4 text-center text-xs text-muted ${className}`}
      >
        Photo coming soon
      </div>
    )
  }
  return <img alt={alt} className={className} onError={() => setFailed(true)} {...rest} />
}
