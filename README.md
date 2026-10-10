# Packpetti website

Single-page marketing site for Packpetti, a bagasse food packaging trading and distribution business.
It is built with React 19, Vite 8, TypeScript, Tailwind CSS 4, Framer Motion and Lucide icons.
Fonts are Manrope and Inter, plus Instrument Serif italic for single highlighted phrases.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build and preview

```bash
npm run build      # type-checks, then outputs static files to dist/
npm run preview    # serves dist/ at http://localhost:4173
```

## Deploy

The site is fully static. Upload `dist/` to any static host:

- **Netlify / Cloudflare Pages:** build command `npm run build`, output directory `dist`
- **Vercel:** framework preset "Vite" (defaults are correct)
- **Any web server / shared hosting:** copy the contents of `dist/` to the web root

There is a single route, so no rewrite rules are needed.

## Where things live

| What | File |
|---|---|
| Phone, email, WhatsApp number, nav links | `src/lib/site.ts` |
| WhatsApp / email message builders, phone validation | `src/lib/whatsapp.ts` |
| **Product data** (categories, families, sizes, specs) | `src/data/products.ts` |
| **Lifestyle photographs** (hero, collection panels, who-we-serve) | `src/data/scenes.ts` + `public/images/scenes/` |
| Colours, fonts, type scale, buttons | `src/styles/index.css` |
| Motion primitives (line reveal, image reveal, parallax) | `src/components/motion/` |
| Page sections | `src/components/*.tsx` (assembled in `src/App.tsx`) |
| Product cut-outs and replacement list | `public/images/products/` (list: `docs/image-manifest.md`) |

### Page structure

Hero (green) → About → Collection → Product selector → Who we serve → Material story (green) →
Bulk enquiry → FAQ → Closing call to action (green) → Footer. The category panels, the customer rows and
the selector all link into each other, and the selected product and size feed the WhatsApp message.

**Motion:** reveals, masks and the small scroll-linked effects are built with Framer Motion and respect
`prefers-reduced-motion` (content simply appears in place). Nothing hijacks scrolling.

**Add or remove a product:** edit `PRODUCT_FAMILIES` in `src/data/products.ts`. Each family has a
category, an image and one or more size variants with their specs. Filters, counts and category tiles
update automatically. Set `inventoryConfirmed: true` once Packpetti confirms an item is stocked.

## What works in the browser, and what would need a backend

All of these work entirely client-side with no server:

- Category filters, size selectors, navigation, mobile menu, FAQ
- Product "Enquire About This" opens WhatsApp with a message naming the product and size
- The bulk enquiry form validates input (Indian mobile numbers), then opens WhatsApp, or the
  visitor's email app, with a pre-written message. The visitor presses send; **the site does not send
  or store anything**, and the success screen says so.

A backend or form service (e.g. Formspree, Netlify Forms, a CRM webhook) would be needed only to
capture enquiries automatically without the visitor sending a WhatsApp message or email.

## Product data caveats

Product formats and dimensions were transcribed from a third-party catalogue supplied as reference.
Obvious errors were corrected and flagged in the UI (`verify` notes), questionable values were omitted,
and the catalogue's unverified environmental claims (home-compostable timeframes, PFAS, carbon figures)
were deliberately not used. See comments in `src/data/products.ts`.

## Inputs still needed from Packpetti

1. **Confirmed inventory:** which families and sizes Packpetti actually stocks. Trim `products.ts`
   to match.
2. **Photography:** Packpetti-owned or licensed images to replace the temporary catalogue photographs
   and cut-outs (see `docs/image-manifest.md`). The **hero photograph is the highest priority** and the
   biggest visual upgrade available. Product cut-outs are small and look soft when shown large.
3. **Verified specifications** for the items flagged "confirm" (antileak containers, 750/1000 ml
   rectangle containers, 8×8 burger box, square plate, bowl lid, cup weights, sipper lid depth).
4. **Any certifications or test reports** for specific products, before making compostability or
   food-safety claims.
5. **Vector logo (SVG)** for sharper rendering. The current lockups are derived from the JPEG.
6. Optional: a form backend, if enquiries should be captured without WhatsApp or email.
