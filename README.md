# alfcs.dev

Personal site and CV of Alfredo Castañeda Sierra, built with [Astro](https://astro.build), TypeScript and Tailwind CSS.

## Development

Requires Node.js 22.12+.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # type-check + static build into ./dist
npm run preview  # serve ./dist locally
```

## Updating the CV

All CV content lives in [`src/data/cv.en.json`](src/data/cv.en.json). The page is generated from it.

- The shape is defined with Zod in [`src/lib/cv.ts`](src/lib/cv.ts). If a field is missing or invalid
  (for example a date not in `YYYY-MM` format), the build fails, so mistakes never reach the live site.
- A job without `end` is shown as current ("Present").
- Jobs with `"compact": true` are listed under "Earlier career" with title and dates only.
- `caseStudies` feed the "Selected work" section (title, description and outcome).
- The "Download CV" button uses a print stylesheet, so the browser produces a clean PDF CV.

## Design

- Fonts are self-hosted with Fontsource: Instrument Serif (headings), Instrument Sans (text), JetBrains Mono (dates, labels).
- Colors are tokens in [`src/styles/global.css`](src/styles/global.css). Change `--color-accent` and
  `--color-accent-soft` (light and dark) to change the accent color.
- Light/dark theme follows the system setting until the visitor uses the toggle; the choice is remembered.

## Languages

English is the default (`/`). Spanish is prepared at `/es/`:

1. Add `src/data/cv.es.json` (same shape as the English file).
2. Register it in `src/lib/cv.ts` (`es: cvSchema.parse(es)`).
3. Add `src/pages/es/index.astro` rendering `<CvPage locale="es" />`.

UI labels for both languages live in [`src/lib/i18n.ts`](src/lib/i18n.ts).

## Deployment (Cloudflare)

The site is fully static. Connect this repository in the Cloudflare dashboard:

- **Workers & Pages → Create → Import a repository**
- Build command: `npm run build`
- Output / assets directory: `dist` (already set in [`wrangler.jsonc`](wrangler.jsonc))

Then add `alfcs.dev` as a custom domain once the domain's DNS is managed by Cloudflare.
