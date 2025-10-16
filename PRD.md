# Product Requirements Document (PRD)

## Overview

You want a fast, no‑backend site to showcase your **AI image creations** using Astro and Tailwind CSS. Images live in hosted storage (local / remote). The site builds to static HTML and serves optimized, responsive images with lazy‑loading and WebP outputs where possible.

## Goals

* Load fast on desktop and mobile.
* Keep hosting simple: static files only.
* Use WebP for delivery, with JPG fallbacks where needed.
* Clean UI with tag filters, search, and a lightbox view.
* Easy content updates through Markdown/JSON (no CMS, no server).

## Non‑Goals

* No user auth, comments, or uploads.
* No SSR endpoints or API layer.
* No image editing in the browser.

## Success Metrics

* LCP ≤ 2.5s on 4G mid‑tier phones for landing/gallery pages.
* Total JS < 90 KB gzip on initial route.
* Image bytes per view ≤ 700 KB median.
* Lighthouse Performance ≥ 90 on gallery and image detail pages.

## Users & Use Cases

* You: publish new AI pieces quickly without touching templates.
* Visitors: browse the grid, filter by tags, open a fullscreen lightbox, share a permalink.
* Curators: link to a specific collection or tag.

## Content Model

**Images** (content collection or JSON):

* `title` (string)
* `slug` (string)
* `alt` (string)
* `src` (path or remote URL)
* `width`, `height` (numbers)
* `tags` (array of strings)
* `createdAt` (ISO date)
* `prompt` (optional, string)
* `model` (optional, string)
* `credit` (optional, string)

**Collections** (optional):

* `title`, `slug`, `description`, `coverImage`, `tags[]`.

## Information Architecture

* `/` — Landing page with featured grid, tag cloud, search.
* `/gallery` — Full, filterable gallery with pagination/infinite load.
* `/image/[slug]` — Image detail page (SEO; shares; next/prev).
* `/tags/[tag]` — Tag landing pages.
* `/collections/[slug]` — Optional curated sets.
* `/about` — Brief bio and contact links.

## UI/UX Requirements

* Grid layout with fluid columns, gap‑based masonry (CSS only).
* Tag filter (multi‑select) and text search (client‑only).
* Lightbox: keyboard nav, swipe, zoom, caption, EXIF‑like meta.
* Focus states, color contrast AA, reduced motion mode.
* Skeletons for image cards while sizing reserves space.

## Tech Stack

* **Astro** (static build) + **Tailwind CSS**.
* **astro:assets** `<Image />` for local images.
* Remote images allowed; use `<Image />` for CLS control.
* Minimal client JS: tag filter, search, lightbox.

## Image Strategy

**Local images (preferred):**

* Source: `/src/images/originals/*.jpg` (or png).
* Build: Astro generates responsive derivatives; deliver WebP + fallback.

**Remote images:**

* Allow specific domains; use `<Image />` for placeholders and sizing.
* Remote images won’t be optimized at build; consider mirroring high‑traffic items locally.

**Conversion to WebP**

* **Option A (build‑time via Astro):** Import images in components; Astro outputs WebP automatically with `<Image />` and `format="webp"` plus `sizes/widths`.
* **Option B (pre‑build script):** CLI tool to batch convert JPG→WebP into `/public/images/webp/` and reference those in content. Keep originals for fallback.

### Recommended Sizes

* Card grid: widths `[360, 540, 720, 960, 1200]`.
* Lightbox: up to 2048px on the long edge.
* Thumbnails: 240px.

### Alt Text & Captions

* Every image must have descriptive `alt` text.
* Optional prompt and model appear below the image in detail and lightbox.

## Performance Budget & Tactics

* Pre‑render all routes. No client frameworks on initial route.
* Use `loading="lazy"` (Image component default) and responsive `srcset`.
* Statically inline critical CSS; purge unused Tailwind utilities.
* Defer non‑essential JS; ship islands for filter/search/lightbox only.

## Accessibility

* Keyboard‑accessible lightbox and controls.
* Visible focus, ARIA labels, roles on controls.
* Respect `prefers-reduced-motion` (disable zoom/animations).

## SEO

* Per‑page `<title>`, meta description, Open Graph, Twitter cards.
* JSON‑LD `ImageObject` on image pages.
* Clean slugs from titles.

## Security/Privacy

* No cookies beyond analytics (optional). If used, go with cookieless or simple pageview counter.
* Only allow remote image domains you control.

## Analytics (Optional)

* Simple, privacy‑friendly analytics (e.g., Plausible/umami). Static embed only.

## Directory Structure (proposed)

```
/
├─ public/
│  └─ images/
│     ├─ webp/           # preconverted outputs (if using Option B)
│     └─ favicon.svg
├─ src/
│  ├─ content/
│  │  ├─ images/         # MD/MDX entries describing images
│  │  └─ collections/
│  ├─ images/originals/  # source JPG/PNG (git‑lfs optional)
│  ├─ components/
│  │  ├─ GalleryGrid.astro
│  │  ├─ ImageCard.astro
│  │  ├─ TagFilter.ts
│  │  ├─ SearchBox.ts
│  │  └─ Lightbox.ts
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ gallery.astro
│  │  ├─ image/[slug].astro
│  │  ├─ tags/[tag].astro
│  │  └─ collections/[slug].astro
│  └─ styles/
│     └─ tailwind.css
├─ astro.config.mjs
├─ tailwind.config.js
└─ package.json
```

## Component Requirements

**GalleryGrid.astro**

* Props: `items[]`, `selectedTags[]`, `query`.
* Renders responsive cards; infinite scroll (optional toggle).

**ImageCard.astro**

* Fixed aspect ratio container; reserved space using `width`/`height`.
* Hover reveals tags; click opens lightbox or navigates to detail.

**Lightbox.ts** (Astro island)

* SSR‑false, imported only on pages that need it.
* Keyboard: Esc close, ←/→ naviga
