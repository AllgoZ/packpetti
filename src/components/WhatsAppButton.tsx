import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useScrolled } from '../hooks/useScrolled'
import { useAnyInView } from '../hooks/useAnyInView'
import { generalEnquiryMessage, whatsappUrl } from '../lib/whatsapp'

// Hidden near the top of the page and wherever WhatsApp actions are already on screen.
const HIDE_NEAR = ['top', 'stage-actions', 'enquiry', 'final-cta', 'contact'] as const

export function WhatsAppButton() {
  const pastHero = useScrolled(560)
  const overlapping = useAnyInView(HIDE_NEAR)
  const show = pastHero && !overlapping

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={whatsappUrl(generalEnquiryMessage())}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Enquire on WhatsApp"
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
          className="group fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 inline-flex size-12 items-center justify-center rounded-full bg-forest text-ivory shadow-[0_10px_30px_-10px_rgba(10,42,19,0.6)] transition-colors hover:bg-forest-900 sm:right-6 sm:bottom-6"
        >
          <MessageCircle aria-hidden="true" className="size-5" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
