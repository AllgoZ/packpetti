# Packpetti website: architecture

Last updated: 2026-10-11

Single-page marketing site for Packpetti, a bagasse food-packaging trading and distribution business
selling in bulk to hotels, restaurants, caterers, canteens and other food-service buyers. The goal of the
site is to generate bulk enquiries by WhatsApp, phone and email.

## 1. Overview

| Item | Choice |
|---|---|
| Framework | React 19 (function components, hooks only) |
| Language | TypeScript (`tsc -b` runs before every build) |
| Build tool | Vite 8 with `@vitejs/plugin-react` |
| Styling | Tailwind CSS 4 via `@tailwindcss/vite`; design tokens in `@theme` inside `src/styles/index.css` |
| Motion | Framer Motion, wrapped in `<MotionConfig reducedMotion="user">` |
| Icons | lucide-react |
| Fonts | Manrope (display), Inter (body), Fraunces (hero), Instrument Serif italic (single highlighted phrases), all self-hosted via `@fontsource` |
| Hosting | Fully static. `dist/` can be served by any static host. One route, so no rewrite rules |
| Backend | None. Nothing is sent or stored by the site |

## 2. Repository layout

```
site/
├─ index.html                 Vite entry document
├─ vite.config.ts             react + tailwind plugins only
├─ package.json               scripts: dev, build, typecheck, preview
├─ src/
│  ├─ main.tsx                mounts <App /> and imports styles
│  ├─ App.tsx                 page assembly and the only cross-section state
│  ├─ components/             one file per page section, plus small shared pieces
│  │  └─ motion/              ImageReveal, LineReveal, Parallax primitives
│  ├─ data/
│  │  ├─ products.ts          categories, product families, size variants, specs
│  │  └─ scenes.ts            lifestyle photographs (paths, sizes, alt text, status)
│  ├─ hooks/                  useActiveSection, useAnyInView, useMediaQuery, useScrolled
│  ├─ lib/
│  │  ├─ site.ts              contact details and nav links (single source of truth)
│  │  ├─ whatsapp.ts          wa.me / mailto builders, Indian phone validation
│  │  ├─ scroll.ts            scrollToId helper
│  │  └─ motion.ts            shared easing
│  └─ styles/index.css        Tailwind import, @theme tokens, base/type/button classes
├─ public/
│  ├─ images/products/        transparent square product cut-outs (webp)
│  ├─ images/scenes/          lifestyle photographs (webp, 1-2 widths each)
│  ├─ images/                 logo files (lockups, mark, reversed)
│  └─ favicon.png, apple-touch-icon.png
├─ product photos/PackPetti/  original supplied product photographs (see section 6)
├─ reference/                 logo and supplier catalogue used as reference (PDF is git-ignored)
├─ docs/image-manifest.md     image provenance and replacement list
├─ prompts/                   the briefs the site was built from (initial, V2, update)
└─ architecture files/        this document
```

## 3. Page structure and component tree

`App.tsx` renders, in order:

```
MotionConfig (respects prefers-reduced-motion)
├─ Header            fixed nav; desktop links + mobile slide-down menu (#mobile-menu)
├─ <main id="main">
│  ├─ Hero           #top
│  ├─ Intro          #about
│  ├─ Collection     #products   six category panels (photo or product-stage panels)
│  ├─ ProductSelector #catalogue filters, family list, size selector, spec stage
│  ├─ WhoWeServe     #who-we-serve   customer segments, each linking to a product family
│  ├─ MaterialStory  bagasse material story
│  ├─ EnquiryForm    #enquiry    bulk enquiry form
│  ├─ FAQ
│  └─ FinalCTA       closing call to action (exported from Footer.tsx)
├─ Footer            #contact
└─ WhatsAppButton    floating action button (see section 5)
```

Nav links (`NAV_LINKS` in `src/lib/site.ts`): Home `#top`, Products `#products`,
Who We Serve `#who-we-serve`, About `#about`, Contact `#enquiry`.

Shared pieces: `Eyebrow` (small section label), `Reveal` (fade/slide on scroll), `SafeImage`
(image that shows a "Photo coming soon" placeholder if loading fails), and the motion primitives in `components/motion/`.

## 4. State and data flow

There is no store, router or context. The only shared state lives in `App.tsx`:

| State | Meaning | Written by | Read by |
|---|---|---|---|
| `filter` | selected category, or `all` | Collection (via `showCategory`), ProductSelector | ProductSelector |
| `familyId` | selected product family | Collection, ProductSelector, WhoWeServe (via `showFamily`) | ProductSelector |
| `prefill` | `{ category, product, nonce }` for the enquiry form | ProductSelector "Enquire About This" (via `addToForm`) | EnquiryForm |

Flow in practice:

1. A visitor taps a collection panel. `Collection` calls `onSelectCategory(id)`. `App` sets `filter` and
   the first family of that category, then scrolls to `#catalogue`.
2. A customer-segment row in `WhoWeServe` calls `onShowFamily(id)`, which selects the family's category and
   family and scrolls to `#catalogue`.
3. In `ProductSelector`, choosing a size and pressing enquire calls `onAddToForm`. `App` stores the
   prefill (the `nonce` makes repeat picks of the same product re-trigger the form) and scrolls to `#enquiry`.
4. `EnquiryForm` validates, then builds a message with `lib/whatsapp.ts`.

Static data:

- `src/data/products.ts`: `CATEGORIES` (6: plates-bowls, meal-trays, takeaway, clamshells, cups-lids,
  cutlery) and `PRODUCT_FAMILIES` (14 families, each with one or more size `variants` and specs).
  Helpers: `categoryById`, `familiesIn`, `formatCount`. Every family has `inventoryConfirmed: false`
  until Packpetti confirms stock. A variant's `verify` note surfaces a "please confirm" flag in the UI.
  `img(file)` turns a file name into `/images/products/<file>.webp`.
- `src/data/scenes.ts`: nine lifestyle scenes (hero, plates, tray, clamshell, cups, cutlery, bowls, sauce,
  hotel). `scene(id)` returns `src`, `srcSet`, size and alt text. `SEGMENT_SCENE` maps each customer
  segment to a scene.

## 5. Behaviours worth knowing

**Enquiry channels.** All outbound contact is a link, never a request from the site.
- `whatsappUrl(message)` builds `https://wa.me/<SITE.whatsappNumber>?text=<encoded message>`.
- The enquiry form validates Indian mobile numbers (10 digits starting 6-9), then opens WhatsApp or the
  visitor's email app with a pre-written message. The visitor presses send, and the success screen says so.
- Product "Enquire About This" buttons open WhatsApp naming the product and size.
- Contact details are only in `src/lib/site.ts`.

**Floating WhatsApp button** (`WhatsAppButton.tsx`). A fixed round link that opens `wa.me` in a new tab with
a general-enquiry message. It appears after scrolling 560 px and hides while a section that already has
WhatsApp actions is in view (`top`, `stage-actions`, `enquiry`, `final-cta`, `contact`). Size is 56 px on
mobile and 48 px from the `sm` breakpoint up.

**Mobile menu** (`Header.tsx`). A toggle shows a full-height forest-green panel under the header, hidden at
`lg` and above. Links are plain text rows at 18 px with no numbering.

**Collection panels** (`Collection.tsx`). Each of the six panels is either a full-bleed photograph
(`kind: 'photo'`, from `scenes.ts`) or a tinted "stage" holding product cut-outs (`kind: 'stage'`,
from `public/images/products/`). Panels carry the category name, summary, family and format counts, and an
Explore control. Panels are not numbered.

**Motion.** Reveals, masks and small scroll-linked effects use Framer Motion and render in place when the
user prefers reduced motion. Nothing hijacks scrolling.

**Responsive images.** Scene images ship at one or two widths and use `srcSet`. Product cut-outs are single
files that components size by percentage, so a replacement should keep a square canvas.

## 6. Images and assets

Two image families, both under `public/images/` and both referenced from data or components by path:

| Folder | Contents | Used by |
|---|---|---|
| `products/` | transparent, square, product-only webp cut-outs | `products.ts`, Collection stages, Hero overlay, MaterialStory, Footer/FinalCTA |
| `scenes/` | lifestyle photographs | `scenes.ts` |

**Provenance as of 2026-10-11**
- **22 product cut-outs come from Packpetti's own supplied photographs** in `product photos/PackPetti/`.
  The originals are JPGs on a black background with product-name captions. They were processed into
  transparent, caption-free, square webp files (about 800 px) by removing the black background, cropping out
  the caption rows, and cropping to the product. The processing script was a one-off and is not in the repo,
  so repeat it by hand or script for new photos. Updated files: bowl 6/8/12 oz; antileak-container 500/750;
  rectangle-container; round-plate; compartment-plate 3cp/4cp/9cp; meal-tray 3cp/5cp; square-plate; all
  six clamshell files; coffee-cup-250; sauce-cup 55/60.
- **The remaining product cut-outs are still interim images from a third-party supplier catalogue**: bowl
  24/32 oz and lid, antileak 1000 ml and lid, coffee-cup-220, sauce-cup-30, both sipper lids,
  paper-cups-straws, and all cutlery. No supplied photograph covers them, so they look different next to
  the new ones.
- **All nine scene photographs are still interim third-party images.**
- Supplied photographs with no matching product entry: 0001 (4x4 dona), 0006 (650 ml container),
  0014, 0017-0019, 0021, 0022, 0024 (extra plate and tray sizes) and 0031 (4 oz bowl).
- `docs/image-manifest.md` still describes every image as third-party and predates the swap. Update it
  when the remaining images are replaced.

**Replacing an image.** Overwrite the file in `public/images/products/` (keep the name and a square canvas),
or for a scene drop new files in `public/images/scenes/` and edit its entry in `scenes.ts`. No component
changes are needed.

**Brand.** Logo lockups and the mark are in `public/images/`; the JPEG original is in `reference/`. An SVG
logo would give sharper rendering and is still needed.

## 7. Design system

Tokens are defined once in `@theme` in `src/styles/index.css` and used as Tailwind utilities.

- Greens: `forest-950/900`, `forest`, `botanical`, `forest-600`, `forest-100`
- Kraft browns: `kraft`, `kraft-700/300/100`
- Neutrals: `ivory`, `paper`, `beige`, `sage`, `soft-white`, `ink`, `muted`, `line`
- Error: `error`
- Fonts: `font-display` (Manrope), `font-sans` (Inter), `font-serif` (Instrument Serif), `font-hero` (Fraunces)
- Easing: `--ease-brand`

Layout and type helpers (`container-wide`, `section-y`, `t-lead`, `t-caption`, `btn`, `btn-light`,
`btn-outline-light`, `link-underline`) are defined in the same file. Dark (forest) sections alternate with
light (ivory, beige, sage) ones: Hero, Material story and Final CTA are green.

## 8. Build, run and deploy

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b, then vite build to dist/
npm run preview    # http://localhost:4173
```

Requires Node 20 or newer. `dist/` and `node_modules/` are git-ignored. Deploy by uploading `dist/` to
Netlify, Cloudflare Pages, Vercel (Vite preset) or any web server.

## 9. Known gaps and decisions pending

- Packpetti has not confirmed which families and sizes it stocks, so `inventoryConfirmed` is `false`
  everywhere and the catalogue mirrors a third-party list.
- Specifications flagged "confirm" (antileak containers, 750/1000 ml rectangle containers, 8x8 burger box,
  square plate, bowl lid, cup weights, sipper lid depth) are unverified.
- Environmental and compostability claims from the source catalogue were deliberately left out until
  certificates or test reports exist.
- Hero and scene photography is third-party and needs replacing before a public launch, with the hero first.
- No form backend: enquiries only exist if the visitor sends the WhatsApp message or email.
- Variants that share one product photo (for example the 10" 3CP plate, and the rectangle container sizes)
  would each need a new `image` entry in `products.ts` to show their own picture.
