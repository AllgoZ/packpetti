# Image manifest

**Status: every photograph on the site is a temporary reference image.**

All images were extracted from the third-party supplier catalogue supplied as reference
(`reference/Vegnar catlog (9).pdf`). They are another company's photography. **Replace them with
Packpetti-owned, licensed or approved original imagery before the site goes live publicly.**
The page reads every image path from data files, so replacing one is a file swap, not a code change.

## Lifestyle scenes: `public/images/scenes/` (configured in `src/data/scenes.ts`)

| Scene id | Files | Where it is used | Status |
|---|---|---|---|
| `hero` | hero-bowl-800 / 1400.webp | **Hero photograph** (largest, most visible) | interim, catalogue p.10 |
| `plates` | plates-800 / 1288.webp | Collection "Plates & Bowls" panel; Who We Serve (Caterers) | interim, catalogue p.6 |
| `tray` | tray-864.webp | Collection "Meal Trays" panel | interim, catalogue p.8 |
| `clamshell` | clamshell-800 / 1400.webp | Who We Serve (Takeaway) | interim, catalogue p.16 |
| `cups` | cups-856.webp | Collection "Cups & Lids" panel; Who We Serve (Cafeterias) | interim, catalogue p.22 |
| `cutlery` | cutlery-800 / 1246.webp | Collection "Cutlery" panel; Who We Serve (Institutional) | interim, catalogue p.20 |
| `bowls` | bowls-800 / 1330.webp | Material story photograph; Who We Serve (Restaurants) | interim, catalogue p.12 |
| `sauce` | sauce-558.webp | Who We Serve (Cloud kitchens) | interim, catalogue p.18 |
| `hotel` | hotel-800 / 1257.webp | Who We Serve (Hotels) | interim, catalogue p.4, **cropped to remove a third-party bottle label** |

The hero scene is the highest-priority replacement. Briefs for replacements: warm natural light,
real food, bagasse products clearly visible, portrait orientation (about 4:5), at least 1600 px wide.

## Product cut-outs: `public/images/products/`

Isolated product photographs extracted from the same catalogue. Native sizes are small
(roughly 150–400 px; two are about 900 px and 680 px). Those under 600 px were enlarged 1.7× with a
Lanczos resample and mild sharpening so they hold up in the larger selector stage. They remain
soft compared with real photography.

| Files | Used for |
|---|---|
| round-plate | Round plate (all sizes; scaled by diameter in the selector), hero-adjacent compositions, closing section |
| compartment-plate-3cp / 4cp / 9cp | Compartment plates |
| meal-tray-3cp / 5cp, square-plate | Meal trays |
| bowl-6oz … 32oz, bowl-lid | Bowls |
| antileak-container-500 / 750 / 1000, antileak-lid | Round containers (also hero overlay, material story) |
| rectangle-container | All rectangle containers (one photo for every size) |
| clamshell-burger-6x6 / 8x8 / sandwich-9x9 / subway-9x6 / 3cp-8x8 / 3cp-9x9 | Clamshells |
| sauce-cup-30 / 55 / 60, coffee-cup-220 / 250 | Cups |
| paper-spoon / fork / knife / icecream-spoon, bio-spoon / fork / knife | Cutlery |
| sipper-lid-80 / 90, paper-cups-straws | Lids, paper cups |

Replacement spec: transparent-background WebP/PNG, product centred on a square canvas with about 6%
padding, at least 1000 × 1000 px, soft natural shadow. Keep the filename.

## Brand files: `public/images/`

`logo.jpeg` (original), `logo-transparent.png`, `logo-reversed.png`, `lockup-transparent.png`,
`lockup-reversed.png`, `logo-mark.png` and the favicons are derived from Packpetti's own
`reference/logo.jpeg`. A vector (SVG) logo from the designer would let these be replaced with
sharper versions.

## Not used

The catalogue's sugarcane, factory and planting photographs, the competitor logo and branding,
and full catalogue pages.
