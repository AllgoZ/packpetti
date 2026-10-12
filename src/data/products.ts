/**
 * PACKPETTI PRODUCT DATA
 * ----------------------------------------------------------------------------
 * Source: product formats and specifications transcribed from a third-party
 * bagasse packaging catalogue supplied as reference. This is NOT a confirmed
 * Packpetti inventory list.
 *
 *  - `inventoryConfirmed: false` on every family until Packpetti confirms stock.
 *  - `verify` on a variant flags specs that looked inconsistent in the source
 *    and must be checked before being relied on (see the inline notes).
 *  - Images are interim catalogue cut-outs — see docs/image-manifest.md.
 *
 * To add a product: add a family object to PRODUCT_FAMILIES with a unique id,
 * one of the CATEGORY ids, and at least one variant.
 * To remove a product: delete its family (or variant) object.
 */

export type CategoryId = 'plates-bowls' | 'meal-trays' | 'takeaway' | 'clamshells' | 'cups-lids'

export interface Category {
  id: CategoryId
  name: string
  /** One line used on the category showcase. */
  summary: string
  /** Families shown in the category tile image composition. */
  heroImages: string[]
}

export interface Spec {
  label: string
  value: string
  /** Kept only to drive the on-screen scale; not shown in the specification list. */
  hidden?: boolean
}

export interface Variant {
  id: string
  /** Size / format label as it appears in the source, cleaned for typos. */
  label: string
  specs: Spec[]
  /** Overrides the family image when this variant has its own photograph. */
  image?: string
  /** Set when a value in the source looked wrong or ambiguous. */
  verify?: string
}

export interface ProductFamily {
  id: string
  name: string
  category: CategoryId
  description: string
  image: string
  imageAlt: string
  variants: Variant[]
  /** Keep false until Packpetti confirms the item is stocked. */
  inventoryConfirmed: boolean
  /** Shown under the specs when relevant. */
  note?: string
  /**
   * When every size shares one photograph, name the spec (e.g. 'Diameter') whose
   * numeric value should drive the on-screen scale so size changes are visible.
   */
  scaleSpec?: string
}

const img = (file: string) => `/images/products/${file}.webp`

export const CATEGORIES: Category[] = [
  {
    id: 'plates-bowls',
    name: 'Plates & Bowls',
    summary: 'Round plates, compartment plates and bowls for buffets, banquets and everyday service.',
    heroImages: [img('round-plate'), img('compartment-plate-4cp'), img('bowl-12oz')],
  },
  {
    id: 'meal-trays',
    name: 'Meal Trays',
    summary: 'Square compartment trays that keep a full meal organised on one plate.',
    heroImages: [img('meal-tray-5cp'), img('meal-tray-3cp')],
  },
  {
    id: 'takeaway',
    name: 'Takeaway Containers',
    summary: 'Round and rectangular containers with matching lids for delivery and takeaway.',
    heroImages: [img('rectangle-container'), img('antileak-container-750')],
  },
  {
    id: 'clamshells',
    name: 'Clamshells',
    summary: 'Hinged burger, sandwich, subway and compartment boxes for grab-and-go food.',
    heroImages: [img('clamshell-burger-6x6'), img('clamshell-subway-9x6')],
  },
  {
    id: 'cups-lids',
    name: 'Cups & Lids',
    summary: 'Sauce cups and coffee cups for portions and beverages.',
    heroImages: [img('coffee-cup-250'), img('sauce-cup-55')],
  },
]

export const PRODUCT_FAMILIES: ProductFamily[] = [
  // ── Plates & Bowls ────────────────────────────────────────────────────────
  {
    id: 'round-plate',
    name: 'Round Plate',
    category: 'plates-bowls',
    description: 'A plain round plate in six sizes, from side plates to full dinner plates.',
    image: img('round-plate'),
    imageAlt: 'White bagasse round plate, top view',
    inventoryConfirmed: false,
    scaleSpec: 'Diameter',
    variants: [
      { id: '6in', label: '6"', specs: [{ label: 'Diameter', value: '153 mm', hidden: true }] },
      { id: '7in', label: '7"', specs: [{ label: 'Diameter', value: '175 mm', hidden: true }] },
      { id: '9in', label: '9"', specs: [{ label: 'Diameter', value: '229 mm', hidden: true }] },
      { id: '10in', label: '10"', specs: [{ label: 'Diameter', value: '255 mm', hidden: true }] },
      { id: '11in', label: '11"', specs: [{ label: 'Diameter', value: '275 mm', hidden: true }] },
      { id: '12in', label: '12"', specs: [{ label: 'Diameter', value: '305 mm', hidden: true }] },
    ],
  },
  {
    id: 'compartment-plate',
    name: 'Compartment Round Plate',
    category: 'plates-bowls',
    description: 'Divided round plates with three, four or nine compartments for thalis and set meals.',
    image: img('compartment-plate-3cp'),
    imageAlt: 'White bagasse round plate with three compartments, top view',
    inventoryConfirmed: false,
    variants: [
      { id: '9in-3cp', label: '9" 3CP', image: img('compartment-plate-3cp'), specs: [{ label: 'Compartments', value: '3' }] },
      { id: '10in-3cp', label: '10" 3CP', image: img('compartment-plate-3cp'), specs: [{ label: 'Compartments', value: '3' }] },
      { id: '11in-4cp', label: '11" 4CP', image: img('compartment-plate-4cp'), specs: [{ label: 'Compartments', value: '4' }] },
      { id: '12in-4cp', label: '12" 4CP', image: img('compartment-plate-4cp'), specs: [{ label: 'Compartments', value: '4' }] },
      { id: '12in-9cp', label: '12" 9CP', image: img('compartment-plate-9cp'), specs: [{ label: 'Compartments', value: '9' }] },
    ],
  },
  {
    id: 'bowl',
    name: 'Bowl',
    category: 'plates-bowls',
    description: 'Round bowls from 180 ml to 350 ml in three sizes.',
    image: img('bowl-12oz'),
    imageAlt: 'White bagasse bowl, top view',
    inventoryConfirmed: false,
    variants: [
      { id: '6oz', label: '6 oz', image: img('bowl-6oz'), specs: [{ label: 'Volume', value: '180 ml' }] },
      { id: '8oz', label: '8 oz', image: img('bowl-8oz'), specs: [{ label: 'Volume', value: '230 ml' }] },
      { id: '12oz', label: '12 oz', image: img('bowl-12oz'), specs: [{ label: 'Volume', value: '350 ml' }] },
    ],
  },

  // ── Meal Trays ────────────────────────────────────────────────────────────
  {
    id: 'meal-tray',
    name: 'Square Meal Tray',
    category: 'meal-trays',
    description: 'Square trays with three or five compartments, plus a plain square plate.',
    image: img('meal-tray-5cp'),
    imageAlt: 'White bagasse meal tray with five compartments',
    inventoryConfirmed: false,
    variants: [
      { id: '3cp', label: '9" 3CP', image: img('meal-tray-3cp'), specs: [{ label: 'Compartments', value: '3' }, { label: 'Size', value: '255 × 255 mm' }] },
      { id: '5cp', label: '5"CP', image: img('meal-tray-5cp'), specs: [{ label: 'Compartments', value: '5' }, { label: 'Size', value: '295 × 225 mm' }] },
      {
        id: 'square',
        label: 'Square Plate',
        image: img('square-plate'),
        specs: [{ label: 'Compartments', value: 'None' }, { label: 'Size', value: '305 × 305 mm' }],
        // Source labels this a 6" square plate but lists 305 × 305 mm.
        verify: 'Size label and dimensions differ in the source — confirm before ordering.',
      },
    ],
  },

  // ── Takeaway Containers ───────────────────────────────────────────────────
  {
    id: 'round-container',
    name: 'Antileak-style Round Container',
    category: 'takeaway',
    description: 'Deep round containers for curries, rice and gravies, each with a matching lid.',
    image: img('antileak-container-750'),
    imageAlt: 'Natural kraft-coloured round bagasse takeaway container, side view',
    inventoryConfirmed: false,
    variants: [
      { id: '500', label: '500 ml', image: img('antileak-container-500'), specs: [] },
      { id: '750', label: '750 ml', image: img('antileak-container-750'), specs: [] },
    ],
  },
  {
    id: 'rectangle-container',
    name: 'Rectangle Takeaway Container',
    category: 'takeaway',
    description: 'Rectangular containers in 500, 750 and 1000 ml.',
    image: img('rectangle-container'),
    imageAlt: 'Natural kraft-coloured rectangular bagasse container with lid',
    inventoryConfirmed: false,
    note: 'One representative photograph is used for all sizes.',
    variants: [
      { id: '500', label: '500 ml', specs: [{ label: 'Length', value: '182 mm' }, { label: 'Width', value: '142 mm' }] },
      { id: '750', label: '750 ml', specs: [{ label: 'Length', value: '152 mm' }, { label: 'Width', value: '197 mm' }], verify: 'Length and width appear transposed in the source — confirm.' },
      { id: '1000', label: '1000 ml', specs: [{ label: 'Length', value: '152 mm' }, { label: 'Width', value: '197 mm' }], verify: 'Source lists the same dimensions as the 750 ml — confirm.' },
    ],
  },

  // ── Clamshells ────────────────────────────────────────────────────────────
  {
    id: 'clamshell-box',
    name: 'Burger, Sandwich & Subway Box',
    category: 'clamshells',
    description: 'Hinged single-compartment boxes sized for burgers, sandwiches and subs.',
    image: img('clamshell-burger-6x6'),
    imageAlt: 'White hinged bagasse burger box, open',
    inventoryConfirmed: false,
    variants: [
      { id: '6x6', label: '6×6 Burger', image: img('clamshell-burger-6x6'), specs: [{ label: 'Length', value: '153 mm' }, { label: 'Width', value: '153 mm' }] },
      { id: '8x8', label: '8×8 Burger', image: img('clamshell-burger-8x8'), specs: [{ label: 'Length', value: '153 mm' }, { label: 'Width', value: '153 mm' }], verify: 'Source lists the same length and width as the 6×6 — confirm.' },
      { id: '9x9', label: '9×9 Sandwich', image: img('clamshell-sandwich-9x9'), specs: [{ label: 'Length', value: '230 mm' }, { label: 'Width', value: '235 mm' }] },
      { id: '9x6', label: '9×6 Subway', image: img('clamshell-subway-9x6'), specs: [{ label: 'Length', value: '240 mm' }, { label: 'Width', value: '145 mm' }] },
    ],
  },
  {
    id: 'clamshell-3cp',
    name: '3-Compartment Clamshell',
    category: 'clamshells',
    description: 'Hinged boxes with three sections, so a main and sides travel separately.',
    image: img('clamshell-3cp-9x9'),
    imageAlt: 'White hinged bagasse clamshell with three compartments, open',
    inventoryConfirmed: false,
    variants: [
      { id: '8x8', label: '8×8 3CP', image: img('clamshell-3cp-8x8'), specs: [{ label: 'Length', value: '205 mm' }, { label: 'Width', value: '205 mm' }] },
      { id: '9x9', label: '9×9 3CP', image: img('clamshell-3cp-9x9'), specs: [{ label: 'Length', value: '230 mm' }, { label: 'Width', value: '230 mm' }] },
    ],
  },

  // ── Cups & Lids ───────────────────────────────────────────────────────────
  {
    id: 'sauce-cup',
    name: 'Sauce Cup',
    category: 'cups-lids',
    description: 'Small portion cups for chutneys, dips and sauces.',
    image: img('sauce-cup-55'),
    imageAlt: 'Small natural bagasse sauce cup, side view',
    inventoryConfirmed: false,
    note: 'Source lists cup weights in an unclear unit; weights are available on request.',
    variants: [
      { id: '55', label: '55 ml', image: img('sauce-cup-55'), specs: [{ label: 'Capacity', value: '55 ml' }, { label: 'Size', value: '47 mm' }] },
      { id: '60', label: '60 ml', image: img('sauce-cup-60'), specs: [{ label: 'Capacity', value: '60 ml' }, { label: 'Size', value: '60 mm' }] },
    ],
  },
  {
    id: 'coffee-cup',
    name: 'Coffee Cup',
    category: 'cups-lids',
    description: 'Bagasse cups for hot beverages.',
    image: img('coffee-cup-250'),
    imageAlt: 'White bagasse coffee cup, side view',
    inventoryConfirmed: false,
    note: 'Source lists cup weights in an unclear unit; weights are available on request.',
    variants: [
      { id: '250', label: '250 ml', image: img('coffee-cup-250'), specs: [{ label: 'Capacity', value: '250 ml' }, { label: 'Size', value: '80 mm' }] },
    ],
  },
]

export function categoryById(id: CategoryId): Category {
  const c = CATEGORIES.find((x) => x.id === id)
  if (!c) throw new Error(`Unknown category: ${id}`)
  return c
}

export function familiesIn(id: CategoryId): ProductFamily[] {
  return PRODUCT_FAMILIES.filter((f) => f.category === id)
}

export function formatCount(id: CategoryId): number {
  return familiesIn(id).reduce((n, f) => n + f.variants.length, 0)
}
