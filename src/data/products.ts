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

export type CategoryId = 'plates-bowls' | 'meal-trays' | 'takeaway' | 'clamshells' | 'cups-lids' | 'cutlery'

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
    summary: 'Sauce cups, coffee cups and sipper lids for portions and beverages.',
    heroImages: [img('coffee-cup-250'), img('sauce-cup-55'), img('sipper-lid-90')],
  },
  {
    id: 'cutlery',
    name: 'Cutlery',
    summary: 'Paper and bio-plastic spoons, forks and knives to complete the order.',
    heroImages: [img('paper-spoon'), img('paper-fork'), img('paper-knife')],
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
      { id: '6in', label: '6"', specs: [{ label: 'Diameter', value: '153 mm' }, { label: 'Depth', value: '18 mm' }] },
      { id: '7in', label: '7"', specs: [{ label: 'Diameter', value: '175 mm' }, { label: 'Depth', value: '20 mm' }] },
      { id: '9in', label: '9"', specs: [{ label: 'Diameter', value: '229 mm' }, { label: 'Depth', value: '20 mm' }] },
      { id: '10in', label: '10"', specs: [{ label: 'Diameter', value: '255 mm' }, { label: 'Depth', value: '22 mm' }] },
      { id: '11in', label: '11"', specs: [{ label: 'Diameter', value: '275 mm' }, { label: 'Depth', value: '25 mm' }] },
      { id: '12in', label: '12"', specs: [{ label: 'Diameter', value: '305 mm' }, { label: 'Depth', value: '25.5 mm' }] },
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
      { id: '9in-3cp', label: '9" 3CP', image: img('compartment-plate-3cp'), specs: [{ label: 'Compartments', value: '3' }, { label: 'Diameter', value: '229 mm' }, { label: 'Depth', value: '20 mm' }] },
      { id: '10in-3cp', label: '10" 3CP', image: img('compartment-plate-3cp'), specs: [{ label: 'Compartments', value: '3' }, { label: 'Diameter', value: '255 mm' }, { label: 'Depth', value: '22 mm' }] },
      { id: '11in-4cp', label: '11" 4CP', image: img('compartment-plate-4cp'), specs: [{ label: 'Compartments', value: '4' }, { label: 'Diameter', value: '272 mm' }, { label: 'Depth', value: '25 mm' }] },
      { id: '12in-4cp', label: '12" 4CP', image: img('compartment-plate-4cp'), specs: [{ label: 'Compartments', value: '4' }, { label: 'Diameter', value: '305 mm' }, { label: 'Depth', value: '25.5 mm' }] },
      { id: '12in-9cp', label: '12" 9CP', image: img('compartment-plate-9cp'), specs: [{ label: 'Compartments', value: '9' }, { label: 'Diameter', value: '318 mm' }, { label: 'Depth', value: '25.5 mm' }] },
    ],
  },
  {
    id: 'bowl',
    name: 'Bowl',
    category: 'plates-bowls',
    description: 'Round bowls from 180 ml to 1000 ml, with a lid for the 24 and 32 oz sizes.',
    image: img('bowl-12oz'),
    imageAlt: 'White bagasse bowl, top view',
    inventoryConfirmed: false,
    variants: [
      { id: '6oz', label: '6 oz', image: img('bowl-6oz'), specs: [{ label: 'Volume', value: '180 ml' }, { label: 'Diameter', value: '108 mm' }, { label: 'Depth', value: '38 mm' }] },
      { id: '8oz', label: '8 oz', image: img('bowl-8oz'), specs: [{ label: 'Volume', value: '230 ml' }, { label: 'Diameter', value: '134 mm' }, { label: 'Depth', value: '39 mm' }] },
      { id: '12oz', label: '12 oz', image: img('bowl-12oz'), specs: [{ label: 'Volume', value: '350 ml' }, { label: 'Diameter', value: '134 mm' }, { label: 'Depth', value: '44 mm' }] },
      { id: '24oz', label: '24 oz', image: img('bowl-24oz'), specs: [{ label: 'Volume', value: '750 ml' }, { label: 'Diameter', value: '210 mm' }, { label: 'Depth', value: '47.9 mm' }] },
      { id: '32oz', label: '32 oz', image: img('bowl-32oz'), specs: [{ label: 'Volume', value: '1000 ml' }, { label: 'Diameter', value: '210 mm' }, { label: 'Depth', value: '58.9 mm' }] },
      {
        id: 'lid-24-32',
        label: '24/32 oz Lid',
        image: img('bowl-lid'),
        specs: [{ label: 'Fits', value: '24 oz & 32 oz bowls' }, { label: 'Diameter', value: '210 mm' }],
        // Source repeats the 32 oz bowl's depth and volume for the lid; omitted.
        verify: 'Lid depth not listed — confirm with our team.',
      },
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
      { id: '3cp', label: '9" 3CP', image: img('meal-tray-3cp'), specs: [{ label: 'Compartments', value: '3' }, { label: 'Size', value: '255 × 255 mm' }, { label: 'Depth', value: '25 mm' }] },
      { id: '5cp', label: '5CP', image: img('meal-tray-5cp'), specs: [{ label: 'Compartments', value: '5' }, { label: 'Size', value: '295 × 225 mm' }, { label: 'Depth', value: '33 mm' }] },
      {
        id: 'square',
        label: 'Square Plate',
        image: img('square-plate'),
        specs: [{ label: 'Compartments', value: 'None' }, { label: 'Size', value: '305 × 305 mm' }, { label: 'Depth', value: '33 mm' }],
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
    note: 'Source lists depth and diameter under swapped labels; values shown here are corrected.',
    variants: [
      { id: '500', label: '500 ml', image: img('antileak-container-500'), specs: [{ label: 'Diameter', value: '158 mm' }, { label: 'Depth', value: '56 mm' }], verify: 'Corrected from source — please confirm.' },
      { id: '500-lid', label: '500 ml Lid', image: img('antileak-lid'), specs: [{ label: 'Diameter', value: '157 mm' }, { label: 'Depth', value: '7 mm' }], verify: 'Corrected from source — please confirm.' },
      { id: '750', label: '750 ml', image: img('antileak-container-750'), specs: [{ label: 'Diameter', value: '175 mm' }, { label: 'Depth', value: '65 mm' }], verify: 'Corrected from source — please confirm.' },
      { id: '750-lid', label: '750 ml Lid', image: img('antileak-lid'), specs: [{ label: 'Diameter', value: '174 mm' }, { label: 'Depth', value: '7 mm' }], verify: 'Corrected from source — please confirm.' },
      { id: '1000', label: '1000 ml', image: img('antileak-container-1000'), specs: [{ label: 'Diameter', value: '197 mm' }, { label: 'Depth', value: '65 mm' }], verify: 'Corrected from source — please confirm.' },
      { id: '1000-lid', label: '1000 ml Lid', image: img('antileak-lid'), specs: [{ label: 'Diameter', value: '196 mm' }, { label: 'Depth', value: '7 mm' }], verify: 'Corrected from source — please confirm.' },
    ],
  },
  {
    id: 'rectangle-container',
    name: 'Rectangle Takeaway Container',
    category: 'takeaway',
    description: 'Rectangular containers in 500, 750 and 1000 ml, including a two-compartment option.',
    image: img('rectangle-container'),
    imageAlt: 'Natural kraft-coloured rectangular bagasse container with lid',
    inventoryConfirmed: false,
    note: 'One representative photograph is used for all sizes.',
    variants: [
      { id: '500', label: '500 ml', specs: [{ label: 'Length', value: '182 mm' }, { label: 'Width', value: '142 mm' }, { label: 'Depth', value: '45 mm' }] },
      { id: '500-lid', label: '500 ml Lid', specs: [{ label: 'Length', value: '180 mm' }, { label: 'Width', value: '141 mm' }, { label: 'Depth', value: '8 mm' }] },
      { id: '750', label: '750 ml', specs: [{ label: 'Length', value: '152 mm' }, { label: 'Width', value: '197 mm' }, { label: 'Depth', value: '57 mm' }], verify: 'Length and width appear transposed in the source — confirm.' },
      { id: '750-2cp', label: '750 ml 2CP', specs: [{ label: 'Compartments', value: '2' }, { label: 'Length', value: '152 mm' }, { label: 'Width', value: '197 mm' }, { label: 'Depth', value: '57 mm' }], verify: 'Length and width appear transposed in the source — confirm.' },
      { id: '750-lid', label: '750 ml Lid', specs: [{ label: 'Length', value: '196 mm' }, { label: 'Width', value: '153 mm' }, { label: 'Depth', value: '8 mm' }] },
      { id: '1000', label: '1000 ml', specs: [{ label: 'Length', value: '152 mm' }, { label: 'Width', value: '197 mm' }, { label: 'Depth', value: '57 mm' }], verify: 'Source lists the same dimensions as the 750 ml — confirm.' },
      { id: '1000-lid', label: '1000 ml Lid', specs: [{ label: 'Length', value: '196 mm' }, { label: 'Width', value: '153 mm' }, { label: 'Depth', value: '8 mm' }] },
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
      { id: '6x6', label: '6×6 Burger', image: img('clamshell-burger-6x6'), specs: [{ label: 'Length', value: '153 mm' }, { label: 'Width', value: '153 mm' }, { label: 'Depth', value: '44 mm' }] },
      { id: '8x8', label: '8×8 Burger', image: img('clamshell-burger-8x8'), specs: [{ label: 'Length', value: '153 mm' }, { label: 'Width', value: '153 mm' }, { label: 'Depth', value: '90 mm' }], verify: 'Source lists the same length and width as the 6×6 — confirm.' },
      { id: '9x9', label: '9×9 Sandwich', image: img('clamshell-sandwich-9x9'), specs: [{ label: 'Length', value: '230 mm' }, { label: 'Width', value: '235 mm' }, { label: 'Depth', value: '44 mm' }] },
      { id: '9x6', label: '9×6 Subway', image: img('clamshell-subway-9x6'), specs: [{ label: 'Length', value: '240 mm' }, { label: 'Width', value: '145 mm' }, { label: 'Depth', value: '40 mm' }] },
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
      { id: '8x8', label: '8×8 3CP', image: img('clamshell-3cp-8x8'), specs: [{ label: 'Length', value: '205 mm' }, { label: 'Width', value: '205 mm' }, { label: 'Depth', value: '90 mm' }] },
      { id: '9x9', label: '9×9 3CP', image: img('clamshell-3cp-9x9'), specs: [{ label: 'Length', value: '230 mm' }, { label: 'Width', value: '230 mm' }, { label: 'Depth', value: '91 mm' }] },
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
      { id: '30', label: '30 ml', image: img('sauce-cup-30'), specs: [{ label: 'Capacity', value: '30 ml' }, { label: 'Size', value: '67 mm' }] },
      { id: '55', label: '55 ml', image: img('sauce-cup-55'), specs: [{ label: 'Capacity', value: '55 ml' }, { label: 'Size', value: '47 mm' }, { label: 'Top diameter', value: '55 mm' }] },
      { id: '60', label: '60 ml', image: img('sauce-cup-60'), specs: [{ label: 'Capacity', value: '60 ml' }, { label: 'Size', value: '60 mm' }] },
    ],
  },
  {
    id: 'coffee-cup',
    name: 'Coffee Cup',
    category: 'cups-lids',
    description: 'Bagasse cups for hot beverages in two serving sizes.',
    image: img('coffee-cup-250'),
    imageAlt: 'White bagasse coffee cup, side view',
    inventoryConfirmed: false,
    note: 'Source lists cup weights in an unclear unit; weights are available on request.',
    variants: [
      { id: '220', label: '220 ml', image: img('coffee-cup-220'), specs: [{ label: 'Capacity', value: '220 ml' }, { label: 'Size', value: '80 mm' }, { label: 'Top diameter', value: '78 mm' }] },
      { id: '250', label: '250 ml', image: img('coffee-cup-250'), specs: [{ label: 'Capacity', value: '250 ml' }, { label: 'Size', value: '80 mm' }, { label: 'Top diameter', value: '89 mm' }] },
    ],
  },
  {
    id: 'sipper-lid',
    name: 'Sipper Lid',
    category: 'cups-lids',
    description: 'Domed lids with a sip opening, in 80 mm and 90 mm locking sizes.',
    image: img('sipper-lid-90'),
    imageAlt: 'White domed sipper lid with drinking opening',
    inventoryConfirmed: false,
    note: 'Lid depth is listed in an unclear unit in the source; available on request.',
    variants: [
      { id: '80', label: '80 mm', image: img('sipper-lid-80'), specs: [{ label: 'Diameter', value: '84 mm' }, { label: 'Locking diameter', value: '80 mm' }] },
      { id: '90', label: '90 mm', image: img('sipper-lid-90'), specs: [{ label: 'Diameter', value: '94 mm' }, { label: 'Locking diameter', value: '90 mm' }] },
    ],
  },
  {
    id: 'paper-cups-straws',
    name: 'Paper Cups & Straws',
    category: 'cups-lids',
    description: 'Paper cups with paper straws and lids for takeaway beverages.',
    image: img('paper-cups-straws'),
    imageAlt: 'Brown paper cups stacked with lids and striped paper straws',
    inventoryConfirmed: false,
    variants: [
      {
        id: 'standard',
        label: 'Assorted',
        specs: [{ label: 'Specifications', value: 'On request' }],
      },
    ],
  },

  // ── Cutlery ───────────────────────────────────────────────────────────────
  {
    id: 'paper-cutlery',
    name: 'Paper Cutlery',
    category: 'cutlery',
    description: 'Paper spoon, fork and butter knife, plus a short ice-cream spoon.',
    image: img('paper-spoon'),
    imageAlt: 'Paper spoon',
    inventoryConfirmed: false,
    variants: [
      { id: 'spoon', label: 'Spoon', image: img('paper-spoon'), specs: [{ label: 'Length', value: '158 mm' }] },
      { id: 'fork', label: 'Fork', image: img('paper-fork'), specs: [{ label: 'Length', value: '158 mm' }] },
      { id: 'knife', label: 'Butter Knife', image: img('paper-knife'), specs: [{ label: 'Length', value: '158 mm' }] },
      { id: 'icecream', label: 'Ice-cream Spoon', image: img('paper-icecream-spoon'), specs: [{ label: 'Length', value: '90 mm' }] },
    ],
  },
  {
    id: 'bio-cutlery',
    name: 'Bio-Plastic Cutlery',
    category: 'cutlery',
    description: 'Spoon, fork and butter knife in a bio-plastic material.',
    image: img('bio-spoon'),
    imageAlt: 'Off-white bio-plastic spoon',
    inventoryConfirmed: false,
    variants: [
      { id: 'spoon', label: 'Spoon', image: img('bio-spoon'), specs: [{ label: 'Length', value: '145 mm' }] },
      { id: 'fork', label: 'Fork', image: img('bio-fork'), specs: [{ label: 'Length', value: '165 mm' }] },
      { id: 'knife', label: 'Butter Knife', image: img('bio-knife'), specs: [{ label: 'Length', value: '160 mm' }] },
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
