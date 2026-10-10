/**
 * LIFESTYLE / SCENE IMAGES
 * ----------------------------------------------------------------------------
 * All scenes below are INTERIM images cropped from the third-party supplier
 * catalogue supplied as reference (status: 'interim-catalogue'). They are
 * another company's photography and must be replaced with Packpetti-owned or
 * licensed photography (or approved original imagery) before public launch.
 * See docs/image-manifest.md.
 *
 * To replace one: drop new files into public/images/scenes/ and update its
 * `files` list below. Components read everything from here.
 */

export type SceneId =
  | 'hero'
  | 'plates'
  | 'tray'
  | 'clamshell'
  | 'cups'
  | 'cutlery'
  | 'bowls'
  | 'sauce'
  | 'hotel'

export type SceneStatus = 'interim-catalogue' | 'generated' | 'owned'

interface SceneDef {
  /** [width, filename] pairs, smallest first. */
  files: [number, string][]
  /** Pixel size of the largest file, used to reserve space and avoid layout shift. */
  width: number
  height: number
  alt: string
  status: SceneStatus
}

const DEFS: Record<SceneId, SceneDef> = {
  hero: {
    files: [[800, 'hero-bowl-800.webp'], [1400, 'hero-bowl-1400.webp']],
    width: 1400,
    height: 1576,
    alt: 'A fresh salad served in a white moulded-fibre bowl on a slate tabletop',
    status: 'interim-catalogue',
  },
  plates: {
    files: [[800, 'plates-800.webp'], [1288, 'plates-1288.webp']],
    width: 1288,
    height: 1447,
    alt: 'Two white compartment plates holding a breakfast spread, seen from above',
    status: 'interim-catalogue',
  },
  tray: {
    files: [[864, 'tray-864.webp']],
    width: 864,
    height: 971,
    alt: 'A server placing a white compartment tray of rice and sides on a table',
    status: 'interim-catalogue',
  },
  clamshell: {
    files: [[800, 'clamshell-800.webp'], [1400, 'clamshell-1400.webp']],
    width: 1400,
    height: 1574,
    alt: 'A white hinged clamshell box holding a burger on a dark tabletop',
    status: 'interim-catalogue',
  },
  cups: {
    files: [[856, 'cups-856.webp']],
    width: 856,
    height: 962,
    alt: 'Paper cups with white lids on a wooden tray beside coffee beans',
    status: 'interim-catalogue',
  },
  cutlery: {
    files: [[800, 'cutlery-800.webp'], [1246, 'cutlery-1246.webp']],
    width: 1246,
    height: 1400,
    alt: 'A natural-toned spoon, fork and knife laid beside a bowl of porridge and berries',
    status: 'interim-catalogue',
  },
  bowls: {
    files: [[800, 'bowls-800.webp'], [1330, 'bowls-1330.webp']],
    width: 1330,
    height: 1495,
    alt: 'Natural fibre-coloured bowls filled with strawberries and a hearty salad',
    status: 'interim-catalogue',
  },
  sauce: {
    files: [[558, 'sauce-558.webp']],
    width: 558,
    height: 626,
    alt: 'Small white cups of pasta and chips with a wooden fork on a light wooden table',
    status: 'interim-catalogue',
  },
  hotel: {
    files: [[800, 'hotel-800.webp'], [1257, 'hotel-1257.webp']],
    width: 1257,
    height: 822,
    alt: 'A plated meal of pasta, salad and egg on a white round plate on a woven placemat',
    status: 'interim-catalogue',
  },
}

export interface SceneImage {
  src: string
  srcSet: string
  width: number
  height: number
  alt: string
}

export function scene(id: SceneId): SceneImage {
  const d = DEFS[id]
  const path = (f: string) => `/images/scenes/${f}`
  const largest = d.files[d.files.length - 1]
  return {
    src: path(largest[1]),
    srcSet: d.files.map(([w, f]) => `${path(f)} ${w}w`).join(', '),
    width: d.width,
    height: d.height,
    alt: d.alt,
  }
}

/** Which scene illustrates each customer type (see WhoWeServe). */
export const SEGMENT_SCENE: Record<string, SceneId> = {
  hotels: 'hotel',
  restaurants: 'bowls',
  caterers: 'plates',
  canteens: 'tray',
  cafeterias: 'cups',
  takeaway: 'clamshell',
  'cloud-kitchens': 'sauce',
  institutional: 'cutlery',
}
