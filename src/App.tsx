import { useCallback, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Intro } from './components/Intro'
import { Collection } from './components/Collection'
import { ProductSelector, type Filter } from './components/ProductSelector'
import { WhoWeServe } from './components/WhoWeServe'
import { MaterialStory } from './components/MaterialStory'
import { EnquiryForm, type EnquiryPrefill } from './components/EnquiryForm'
import { FAQ } from './components/FAQ'
import { FinalCTA, Footer } from './components/Footer'
import { WhatsAppButton } from './components/WhatsAppButton'
import { PRODUCT_FAMILIES, categoryById, type CategoryId, type ProductFamily } from './data/products'
import { scrollToId } from './lib/scroll'

export default function App() {
  const [filter, setFilter] = useState<Filter>('all')
  const [familyId, setFamilyId] = useState(PRODUCT_FAMILIES[0].id)
  const [prefill, setPrefill] = useState<EnquiryPrefill | null>(null)

  const changeFilter = useCallback((f: Filter, firstFamilyId: string) => {
    setFilter(f)
    setFamilyId(firstFamilyId)
  }, [])

  const showCategory = useCallback((id: CategoryId) => {
    const first = PRODUCT_FAMILIES.find((f) => f.category === id)
    setFilter(id)
    if (first) setFamilyId(first.id)
    scrollToId('catalogue')
  }, [])

  const showFamily = useCallback((id: string) => {
    const family = PRODUCT_FAMILIES.find((f) => f.id === id)
    if (!family) return
    setFilter(family.category)
    setFamilyId(family.id)
    scrollToId('catalogue')
  }, [])

  const addToForm = useCallback((family: ProductFamily, variantLabel: string) => {
    setPrefill({
      category: categoryById(family.category).name,
      product: variantLabel ? `${family.name} — ${variantLabel}` : family.name,
      nonce: Date.now(),
    })
    scrollToId('enquiry')
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main id="main">
        <Hero />
        <Intro />
        <Collection onSelectCategory={showCategory} />
        <ProductSelector
          filter={filter}
          familyId={familyId}
          onFilterChange={changeFilter}
          onFamilyChange={setFamilyId}
          onAddToForm={addToForm}
        />
        <WhoWeServe onShowFamily={showFamily} />
        <MaterialStory />
        <EnquiryForm prefill={prefill} />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </MotionConfig>
  )
}
