# Packpetti website

Single-page static marketing site for a bagasse food-packaging trader (React 19, Vite 8, TypeScript, Tailwind 4,
Framer Motion). Read `architecture files/ARCHITECTURE.md` first: it covers the component tree, state, data files,
image provenance and design tokens. `README.md` covers running, deploying and what is still needed from the client.

## Commands
- `npm run dev` (http://localhost:5173), `npm run build` (runs `tsc -b`, then Vite), `npm run preview` (http://localhost:4173)
- There are no tests or linter. `npm run build` is the check: it must pass before committing.

## Working rules
- Change only what the request names, plus what is strictly needed for it to work. Do not touch other code,
  design or behaviour. The client reviews in detail and has asked for this repeatedly.
- Contact details live only in `src/lib/site.ts`. Products live only in `src/data/products.ts`; scenes in `src/data/scenes.ts`.
- Use the tokens in `@theme` (`src/styles/index.css`), not hard-coded colours. Keep reveals respecting reduced motion.
- No numbering on sections or panels. No environmental or compostability claims without certificates.
- Only list products that appear in `product photos/PackPetti/`. Product specs do not show diameter or depth.
- Cut-outs in `public/images/products/` are square transparent webp; keep the file name and canvas when replacing one.
- Remove a product's image file when you remove the product.

## Verifying visually
Headless Chrome works for screenshots. Scroll through the page first so lazy images and `whileInView` reveals fire,
and check desktop widths 1280, 1440 and 1920 as well as mobile. Reduced-motion screenshots hide reveal bugs, so
also check without it.

## Git
Branch `main`, remote `origin` (github.com/AllgoZ/packpetti). Commit only when asked.
