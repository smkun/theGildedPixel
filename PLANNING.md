# PLANNING.md

## Vision

A blazingly fast, static AI image gallery built with Astro and Tailwind CSS that showcases AI-generated artwork through an optimized, responsive grid with client-side filtering, search, and lightbox viewing. The site delivers WebP images with lazy-loading to achieve sub-2.5s LCP on mobile while maintaining Lighthouse Performance scores ≥90. Content is managed through simple Markdown/JSON files with no backend, enabling quick publishing updates and straightforward static hosting.

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Astro** | ^4.0.0 | Static site generator with islands architecture |
| **Tailwind CSS** | ^3.4.0 | Utility-first CSS framework |
| **TypeScript** | ^5.3.0 | Type-safe component and island development |
| **astro:assets** | (built-in) | Image optimization with `<Image />` component |
| **Sharp** | (via Astro) | Image processing for WebP conversion and responsive derivatives |

**Rationale**: Astro provides zero-JS-by-default SSG perfect for static galleries, while Tailwind enables rapid responsive design. The built-in `astro:assets` integration handles image optimization at build time, eliminating need for external image CDNs.

## Components and Boundaries

### Content Layer (Astro Content Collections)
**Location**: `/src/content/images/*.md`, `/src/content/collections/*.md`

- **Images Collection**: Frontmatter schema with `title`, `slug`, `alt`, `src`, `width`, `height`, `tags[]`, `createdAt`, `prompt`, `model`, `credit`
- **Collections**: Optional curated sets with `title`, `slug`, `description`, `coverImage`, `tags[]`
- **Boundary**: Content is declarative configuration; no business logic

### Static Components (Astro)
**Location**: `/src/components/*.astro`

- **`GalleryGrid.astro`**: Server-rendered grid layout with masonry CSS, accepts `items[]`, `selectedTags[]`, `query` props
- **`ImageCard.astro`**: Individual card with aspect ratio container, hover states, lazy-loading via `<Image />`
- **`Layout.astro`**: Base layout with SEO meta, Open Graph, JSON-LD structured data
- **Boundary**: Zero client JS; pure HTML/CSS rendering

### Interactive Islands (TypeScript)
**Location**: `/src/components/*.ts` with `client:load` or `client:idle` directives

- **`TagFilter.ts`**: Multi-select tag UI, updates URL params, filters grid client-side
- **`SearchBox.ts`**: Text input with debounce, filters by title/prompt/alt
- **`Lightbox.ts`**: Modal with keyboard nav (←/→/Esc), swipe gestures, zoom, caption display
- **Boundary**: Minimal client JS (<90KB gzip); hydrates only interactive features

### Pages (Astro Routes)
**Location**: `/src/pages/*.astro`

- **`/index.astro`**: Landing with featured grid, tag cloud, search box
- **`/gallery.astro`**: Full gallery with pagination/infinite scroll
- **`/image/[slug].astro`**: Dynamic route for image detail with next/prev navigation
- **`/tags/[tag].astro`**: Tag-filtered views with SEO
- **`/collections/[slug].astro`**: Curated collection pages
- **`/about.astro`**: Static bio page
- **Boundary**: All routes pre-rendered at build; no SSR endpoints

## External Services and Data Flow

### Image Storage
**Source**: `/src/images/originals/*.jpg` (local, preferred) or remote URLs with allowed domains

**Note**: Project includes 440 source images in `/SOURCE IMAGES/` directory (character art) that will be migrated to `/src/images/originals/` during M2.1 implementation.

**Flow**:
```
Source Images → astro:assets <Image /> → Build-time Processing (Sharp)
  ├─ Generate responsive srcset: [360, 540, 720, 960, 1200, 2048]px widths
  ├─ Convert to WebP with JPG fallback
  └─ Output to /dist/_astro/*.webp, *.jpg
```

**Remote Images**: Allowed via `<Image />` with explicit `width`/`height` for CLS prevention; no build-time optimization (consider local mirroring for high-traffic images)

### Analytics (Optional)
**Service**: Plausible or Umami (privacy-friendly, cookieless)

**Flow**: Static embed script → client-side pageview tracking → external dashboard (no server-side integration)

### Hosting
**Target**: Static file hosts (Netlify, Vercel, Cloudflare Pages, GitHub Pages)

**Flow**: `npm run build` → `/dist` static assets → CDN deployment

## Key Decisions

### Decision 1: Image Optimization Strategy
**Choice**: Use Astro's built-in `astro:assets` with `<Image />` component (Option A from [PRD.md](PRD.md):89-92)

**Rationale**: Build-time optimization eliminates runtime overhead, automatically handles WebP conversion + fallbacks, and provides responsive `srcset` without external tooling. Pre-build scripts (Option B) would require manual maintenance and separate conversion pipeline.

### Decision 2: Content Management
**Choice**: Astro Content Collections with Markdown frontmatter for images

**Rationale**: Type-safe schema validation, no CMS complexity, Git-based workflow for version control, and trivial content updates by editing `.md` files. Aligns with [PRD.md](PRD.md):36-47 content model and [PRD.md](PRD.md):13 goal of "Easy content updates through Markdown/JSON."

### Decision 3: Client-Side Filtering
**Choice**: Island-based TypeScript components (`TagFilter.ts`, `SearchBox.ts`) with URL param persistence

**Rationale**: Maintains static build benefits while enabling rich interactivity. URL params allow shareable filtered views. Fits within <90KB JS budget ([PRD.md](PRD.md):24) since only filter/search/lightbox islands hydrate.

### Decision 4: Masonry Layout
**Choice**: Pure CSS grid with `grid-template-columns` and auto-flow, no JS masonry library

**Rationale**: Eliminates JS dependencies, reduces bundle size, and leverages native browser optimizations. Achieves [PRD.md](PRD.md):64 "fluid columns, gap-based masonry (CSS only)" requirement while supporting responsive breakpoints via Tailwind.

### Decision 5: Accessibility Compliance
**Choice**: WCAG AA compliance with keyboard nav, focus states, `prefers-reduced-motion` support

**Rationale**: [PRD.md](PRD.md):112-117 explicitly requires keyboard-accessible lightbox, ARIA labels, and motion preferences. TypeScript islands enforce focus management programmatically.

## Open Questions and Risks

### Q1: Local vs Remote Image Hosting Strategy
**Question**: Should we commit large source images to Git or use Git LFS / external storage?

**Risk**: Large binary files bloat repository; Git LFS adds complexity; remote images bypass build optimization.

**Next Steps**:
- Estimate total image collection size (if <500MB, commit directly; if >500MB, evaluate Git LFS)
- Define allowed remote domains in `astro.config.mjs` `image.domains` for external sources
- Test build times with 50+ images to validate optimization performance

### Q2: Infinite Scroll vs Pagination
**Question**: [PRD.md](PRD.md):56 mentions "pagination/infinite load" but doesn't specify preference for `/gallery`

**Risk**: Infinite scroll adds JS complexity and can hurt SEO/accessibility; pagination is simpler but less engaging.

**Next Steps**:
- Start with pagination (simpler, better a11y) in MVP
- Add infinite scroll as progressive enhancement if user feedback demands it
- Implement with Intersection Observer API to stay within JS budget

### Q3: Lightbox Library Selection
**Question**: Build custom lightbox or use lightweight library (e.g., PhotoSwipe, GLightbox)?

**Risk**: Custom implementation risks accessibility bugs; libraries add bundle weight and may conflict with Astro islands.

**Next Steps**:
- Evaluate PhotoSwipe 5.x (~30KB gzip) vs custom implementation (~10KB estimated)
- Prototype custom lightbox with keyboard/swipe/zoom in isolated island
- Decision criteria: bundle size + a11y compliance + maintenance effort

### Q4: WebP Fallback Strategy
**Question**: How should we handle browsers that don't support WebP (Safari <14, IE)?

**Risk**: No fallback = broken images for legacy users; `<picture>` elements increase HTML size.

**Next Steps**:
- Use Astro's automatic fallback via `<Image />` (generates `<picture>` with WebP + JPG sources)
- Verify fallback behavior in Safari 13 and Edge Legacy during testing
- Document browser support matrix in README

### Q5: Performance Budget Enforcement
**Question**: How do we continuously validate [PRD.md](PRD.md):23-26 success metrics (LCP ≤2.5s, JS <90KB, image bytes ≤700KB)?

**Risk**: Manual testing is unreliable; metrics can regress without CI checks.

**Next Steps**:
- Add Lighthouse CI to build pipeline with performance budget assertions
- Implement bundle size monitoring with `astro-bundle-analyzer` (dev dependency)
- Set up synthetic monitoring (e.g., SpeedCurve, Calibre) for production tracking
- Create `/lighthouserc.json` with thresholds from PRD success metrics

### Q6: Tag Taxonomy Management
**Question**: How should tags be normalized (case-sensitive, hyphens, categories)?

**Risk**: Inconsistent tagging creates duplicate tag pages; poor UX for filtering.

**Next Steps**:
- Define tag schema in Content Collection (lowercase, hyphen-separated, max 3 words)
- Implement Zod validation to enforce tag format at build time
- Create `/src/data/tags.json` with official tag list + descriptions for SEO
- Build tag suggestion UI for content authoring (dev-time only)

### R1: Build Time Scalability
**Risk**: With 440 high-res images (confirmed in `/SOURCE IMAGES/`), Astro build time may exceed acceptable limits (>5 min)

**Actual Context**: Project has 440 AI-generated character art images ready for migration.

**Mitigation**:
- Enable `astro:assets` caching to avoid reprocessing unchanged images
- Use incremental builds if deploying to Vercel/Netlify (only rebuild changed routes)
- Profile build with `ASTRO_TELEMETRY_DISABLED=1 astro build --verbose` to identify bottlenecks
- Consider splitting collections across multiple Astro projects if scale demands it

### R2: CLS (Cumulative Layout Shift)
**Risk**: Grid reflow during image load causes layout shift, hurting Core Web Vitals

**Mitigation**:
- Always specify `width` and `height` in image frontmatter ([PRD.md](PRD.md):42)
- Use `aspect-ratio` CSS to reserve space before images load
- Implement skeleton loaders for image cards ([PRD.md](PRD.md):68)
- Test with throttled network (Fast 3G) in Chrome DevTools

### R3: SEO for Client-Side Filtering
**Risk**: Client-side tag filtering means filtered views aren't indexed by search engines

**Mitigation**:
- Pre-render `/tags/[tag].astro` static pages for all tags (server-side filtering)
- Use URL params for client-side state (`/gallery?tags=abstract,vibrant`) but link to static tag pages in navigation
- Implement canonical URLs to prevent duplicate content issues
- Add JSON-LD `CollectionPage` structured data to tag pages

## Next Steps

1. **Scaffold Project** ([PRD.md](PRD.md):133-163 directory structure)
   - `npm create astro@latest` with TypeScript + Tailwind template
   - Configure `astro.config.mjs` with `image` settings and `output: 'static'`
   - Set up Content Collections schema in `/src/content/config.ts`

2. **Image Pipeline Setup**
   - Create `/src/images/originals/` with sample images
   - Test `<Image />` component with responsive sizes and WebP conversion
   - Validate build output in `/dist/_astro/`

3. **Core Component Development**
   - Build `ImageCard.astro` with aspect ratio containers and hover states
   - Implement `GalleryGrid.astro` with CSS masonry layout
   - Create `Layout.astro` with SEO meta and structured data

4. **Interactive Islands**
   - Develop `TagFilter.ts` with URL param sync
   - Implement `SearchBox.ts` with debounced filtering
   - Build or integrate `Lightbox.ts` (decision pending Q3)

5. **Performance Validation**
   - Set up Lighthouse CI with budgets from [PRD.md](PRD.md):23-26
   - Run bundle analysis to verify <90KB JS budget
   - Test on real mobile devices (4G throttled)

6. **Content Authoring**
   - Migrate sample images to Content Collections
   - Document content authoring workflow in README
   - Create tag taxonomy (answer Q6)

7. **Deployment Setup**
   - Configure static host (Netlify/Vercel) with build caching
   - Set up analytics (Plausible/Umami) if desired
   - Implement monitoring for performance metrics (answer Q5)
