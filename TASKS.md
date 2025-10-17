# TASKS.md

## Milestone 1: Project Foundation & Configuration

### M1.1 - Project Scaffolding
- [x] Initialize Astro project with TypeScript template - Completed: 2025-10-16
- [x] Install Tailwind CSS integration - Completed: 2025-10-16
- [x] Configure TypeScript compiler options - Completed: 2025-10-16
- [x] Create directory structure per PLANNING.md - Completed: 2025-10-17
- [x] Initialize Git repository with .gitignore - Completed: 2025-10-16

### M1.2 - Astro Configuration
- [x] Configure astro.config.mjs for static output - Completed: 2025-10-17
- [x] Enable astro:assets integration - Completed: 2025-10-17
- [x] Set image optimization settings (formats, sizes) - Completed: 2025-10-17
- [x] Define allowed remote image domains - Completed: 2025-10-17
- [x] Configure build output directory - Completed: 2025-10-17

### M1.3 - Tailwind Setup
- [ ] Configure tailwind.config.js with custom theme - Completed: ___________
- [ ] Add responsive breakpoints for gallery grid - Completed: ___________
- [ ] Enable JIT mode for minimal CSS output - Completed: ___________
- [ ] Configure content paths for purging - Completed: ___________
- [ ] Create global styles file - Completed: ___________

### M1.4 - Content Collections Schema
- [ ] Define images collection schema in config.ts - Completed: ___________
- [ ] Add Zod validation for required fields - Completed: ___________
- [ ] Define collections schema (optional) - Completed: ___________
- [ ] Create example image content entry - Completed: ___________
- [ ] Validate schema with sample data - Completed: ___________

---

## Milestone 2: Image Pipeline & Asset Management

### M2.1 - Source Image Setup
**Note**: 440 AI-generated character art images available in `/SOURCE IMAGES/` directory for migration.

- [x] Create /src/images/originals/ directory - Completed: 2025-10-17
- [ ] Migrate sample images from /SOURCE IMAGES/ to /src/images/originals/ - Completed: ___________
- [ ] Document image naming conventions - Completed: ___________
- [ ] Verify image metadata (width, height) - Completed: ___________
- [ ] Test Git LFS setup (if using) - Completed: ___________

### M2.2 - Image Component Testing
- [ ] Create basic Image wrapper component - Completed: ___________
- [ ] Test responsive srcset generation - Completed: ___________
- [ ] Verify WebP output with JPG fallback - Completed: ___________
- [ ] Validate lazy-loading behavior - Completed: ___________
- [ ] Test remote image handling - Completed: ___________

### M2.3 - Image Optimization Validation
- [ ] Build project and inspect /dist/_astro/ output - Completed: ___________
- [ ] Verify responsive widths: [360, 540, 720, 960, 1200, 2048] - Completed: ___________
- [ ] Measure build time with 10+ images - Completed: ___________
- [ ] Test caching behavior on rebuild - Completed: ___________
- [ ] Validate image quality settings - Completed: ___________

---

## Milestone 3: Core Layout & Components

### M3.1 - Base Layout Component
- [ ] Create Layout.astro with HTML structure - Completed: ___________
- [ ] Add meta tags for SEO (title, description) - Completed: ___________
- [ ] Implement Open Graph tags - Completed: ___________
- [ ] Add Twitter Card meta - Completed: ___________
- [ ] Include JSON-LD structured data - Completed: ___________

### M3.2 - ImageCard Component
- [ ] Create ImageCard.astro component - Completed: ___________
- [ ] Implement aspect ratio container - Completed: ___________
- [ ] Add hover state styles - Completed: ___________
- [ ] Display tags on hover - Completed: ___________
- [ ] Add loading skeleton placeholder - Completed: ___________

### M3.3 - GalleryGrid Component
- [ ] Create GalleryGrid.astro component - Completed: ___________
- [ ] Implement CSS grid masonry layout - Completed: ___________
- [ ] Add responsive breakpoints - Completed: ___________
- [ ] Support filtering by tags prop - Completed: ___________
- [ ] Support search query prop - Completed: ___________

### M3.4 - Navigation & Header
- [ ] Create Header.astro component - Completed: ___________
- [ ] Add site navigation links - Completed: ___________
- [ ] Implement mobile menu toggle - Completed: ___________
- [ ] Add tag cloud component - Completed: ___________
- [ ] Style active route indicators - Completed: ___________

---

## Milestone 4: Page Routes & Static Generation

### M4.1 - Landing Page
- [ ] Create /src/pages/index.astro - Completed: ___________
- [ ] Fetch featured images from collection - Completed: ___________
- [ ] Render hero section with tagline - Completed: ___________
- [ ] Display featured gallery grid - Completed: ___________
- [ ] Add call-to-action to full gallery - Completed: ___________

### M4.2 - Gallery Page
- [ ] Create /src/pages/gallery.astro - Completed: ___________
- [ ] Fetch all images from collection - Completed: ___________
- [ ] Render full GalleryGrid - Completed: ___________
- [ ] Implement pagination logic (20 per page) - Completed: ___________
- [ ] Add pagination controls - Completed: ___________

### M4.3 - Image Detail Pages
- [ ] Create /src/pages/image/[slug].astro - Completed: ___________
- [ ] Implement getStaticPaths for all images - Completed: ___________
- [ ] Display full-size image with metadata - Completed: ___________
- [ ] Add next/previous navigation - Completed: ___________
- [ ] Show prompt, model, and creation date - Completed: ___________

### M4.4 - Tag Pages
- [ ] Create /src/pages/tags/[tag].astro - Completed: ___________
- [ ] Implement getStaticPaths for all tags - Completed: ___________
- [ ] Filter images by tag - Completed: ___________
- [ ] Add tag description (from tags.json) - Completed: ___________
- [ ] Include related tags section - Completed: ___________

### M4.5 - Collection Pages (Optional)
- [ ] Create /src/pages/collections/[slug].astro - Completed: ___________
- [ ] Implement getStaticPaths for collections - Completed: ___________
- [ ] Display collection cover and description - Completed: ___________
- [ ] Render collection image grid - Completed: ___________
- [ ] Add collection metadata - Completed: ___________

### M4.6 - About Page
- [ ] Create /src/pages/about.astro - Completed: ___________
- [ ] Add bio content - Completed: ___________
- [ ] Include contact links - Completed: ___________
- [ ] Add social media links - Completed: ___________
- [ ] Style with responsive layout - Completed: ___________

---

## Milestone 5: Interactive Islands (Client-Side)

### M5.1 - TagFilter Island
- [ ] Create TagFilter.ts component - Completed: ___________
- [ ] Implement multi-select UI - Completed: ___________
- [ ] Add URL param synchronization - Completed: ___________
- [ ] Filter gallery grid client-side - Completed: ___________
- [ ] Add "Clear filters" button - Completed: ___________

### M5.2 - SearchBox Island
- [ ] Create SearchBox.ts component - Completed: ___________
- [ ] Implement debounced input handling - Completed: ___________
- [ ] Filter by title, alt, and prompt - Completed: ___________
- [ ] Update URL with search query - Completed: ___________
- [ ] Add search clear button - Completed: ___________

### M5.3 - Lightbox Island
- [ ] Create Lightbox.ts component - Completed: ___________
- [ ] Implement modal overlay with backdrop - Completed: ___________
- [ ] Add keyboard navigation (←/→/Esc) - Completed: ___________
- [ ] Implement swipe gestures (touch) - Completed: ___________
- [ ] Add zoom functionality - Completed: ___________
- [ ] Display image caption and metadata - Completed: ___________
- [ ] Add accessibility (ARIA labels, focus trap) - Completed: ___________
- [ ] Support prefers-reduced-motion - Completed: ___________

### M5.4 - Island Integration
- [ ] Integrate TagFilter into gallery page - Completed: ___________
- [ ] Integrate SearchBox into landing page - Completed: ___________
- [ ] Integrate Lightbox into all gallery views - Completed: ___________
- [ ] Test island hydration timing - Completed: ___________
- [ ] Verify <90KB JS budget - Completed: ___________

---

## Milestone 6: Performance Optimization

### M6.1 - Build Optimization
- [ ] Enable Astro asset caching - Completed: ___________
- [ ] Configure incremental builds - Completed: ___________
- [ ] Optimize Tailwind purge settings - Completed: ___________
- [ ] Inline critical CSS - Completed: ___________
- [ ] Defer non-essential scripts - Completed: ___________

### M6.2 - Image Performance
- [ ] Verify lazy-loading on all images - Completed: ___________
- [ ] Test srcset responsiveness - Completed: ___________
- [ ] Validate aspect ratio reservations - Completed: ___________
- [ ] Measure median image bytes per view - Completed: ___________
- [ ] Test WebP fallback in Safari 13 - Completed: ___________

### M6.3 - Lighthouse CI Setup
- [ ] Install Lighthouse CI package - Completed: ___________
- [ ] Create lighthouserc.json config - Completed: ___________
- [ ] Set performance budget thresholds - Completed: ___________
- [ ] Add Lighthouse CI to build script - Completed: ___________
- [ ] Test CI assertions locally - Completed: ___________

### M6.4 - Bundle Analysis
- [ ] Install astro-bundle-analyzer - Completed: ___________
- [ ] Run bundle analysis report - Completed: ___________
- [ ] Identify large dependencies - Completed: ___________
- [ ] Optimize imports and tree-shaking - Completed: ___________
- [ ] Verify final bundle size - Completed: ___________

### M6.5 - Core Web Vitals Testing
- [ ] Test LCP on landing page (target ≤2.5s) - Completed: ___________
- [ ] Test LCP on gallery page (target ≤2.5s) - Completed: ___________
- [ ] Measure CLS on image grids (target <0.1) - Completed: ___________
- [ ] Test FID on interactive islands (target <100ms) - Completed: ___________
- [ ] Run tests on throttled 4G network - Completed: ___________

---

## Milestone 7: Accessibility & SEO

### M7.1 - Keyboard Accessibility
- [ ] Test keyboard navigation on all pages - Completed: ___________
- [ ] Verify focus indicators on interactive elements - Completed: ___________
- [ ] Test lightbox keyboard controls - Completed: ___________
- [ ] Validate tab order in forms - Completed: ___________
- [ ] Test skip-to-content link - Completed: ___________

### M7.2 - ARIA & Screen Reader Testing
- [ ] Add ARIA labels to icon buttons - Completed: ___________
- [ ] Add ARIA roles to custom controls - Completed: ___________
- [ ] Test with NVDA screen reader - Completed: ___________
- [ ] Test with VoiceOver (macOS/iOS) - Completed: ___________
- [ ] Validate alt text on all images - Completed: ___________

### M7.3 - Color Contrast & Visual Accessibility
- [ ] Verify WCAG AA color contrast ratios - Completed: ___________
- [ ] Test with high contrast mode - Completed: ___________
- [ ] Validate prefers-reduced-motion support - Completed: ___________
- [ ] Test with 200% zoom - Completed: ___________
- [ ] Check focus visibility in dark mode - Completed: ___________

### M7.4 - SEO Implementation
- [ ] Validate meta tags on all pages - Completed: ___________
- [ ] Test Open Graph preview in Facebook - Completed: ___________
- [ ] Test Twitter Card preview - Completed: ___________
- [ ] Validate JSON-LD structured data - Completed: ___________
- [ ] Generate and test sitemap.xml - Completed: ___________
- [ ] Create robots.txt - Completed: ___________
- [ ] Add canonical URLs to all pages - Completed: ___________

---

## Milestone 8: Content Authoring & Documentation

### M8.1 - Content Schema Documentation
- [ ] Document content collection schema - Completed: ___________
- [ ] Create example image .md template - Completed: ___________
- [ ] Define tag taxonomy guidelines - Completed: ___________
- [ ] Create tags.json with official tags - Completed: ___________
- [ ] Add tag validation in schema - Completed: ___________

### M8.2 - Content Migration
- [ ] Migrate 10+ sample images to content/ - Completed: ___________
- [ ] Write alt text for all images - Completed: ___________
- [ ] Categorize images with tags - Completed: ___________
- [ ] Add prompts and model info - Completed: ___________
- [ ] Create 2-3 sample collections - Completed: ___________

### M8.3 - Author Documentation
- [ ] Write README.md with setup instructions - Completed: ___________
- [ ] Document content authoring workflow - Completed: ___________
- [ ] Create troubleshooting guide - Completed: ___________
- [ ] Add contributing guidelines - Completed: ___________
- [ ] Document deployment process - Completed: ___________

---

## Milestone 9: Deployment & Monitoring

### M9.1 - Hosting Configuration
- [ ] Choose static host (Netlify/Vercel/Cloudflare) - Completed: ___________
- [ ] Configure build command and directory - Completed: ___________
- [ ] Set up environment variables - Completed: ___________
- [ ] Enable build caching - Completed: ___________
- [ ] Configure custom domain (if applicable) - Completed: ___________

### M9.2 - Analytics Integration (Optional)
- [ ] Choose analytics provider (Plausible/Umami) - Completed: ___________
- [ ] Create analytics account - Completed: ___________
- [ ] Add tracking script to Layout.astro - Completed: ___________
- [ ] Test pageview tracking - Completed: ___________
- [ ] Configure privacy settings - Completed: ___________

### M9.3 - Performance Monitoring
- [ ] Set up synthetic monitoring (SpeedCurve/Calibre) - Completed: ___________
- [ ] Configure Core Web Vitals alerts - Completed: ___________
- [ ] Set up build time monitoring - Completed: ___________
- [ ] Create performance dashboard - Completed: ___________
- [ ] Schedule weekly performance reports - Completed: ___________

### M9.4 - Production Validation
- [ ] Run full Lighthouse audit on production - Completed: ___________
- [ ] Verify all routes are accessible - Completed: ___________
- [ ] Test on real mobile devices - Completed: ___________
- [ ] Validate image loading on slow networks - Completed: ___________
- [ ] Check browser compatibility (last 2 versions) - Completed: ___________

---

## Newly Discovered Tasks

### Configuration
- [ ] Create src/content.config.ts to replace auto-generated collections - Completed: ___________
<!-- Reason: Build warning suggests defining collections explicitly per M1.4 requirements -->

### Performance
- [ ] Investigate image preloading for LCP improvement - Completed: ___________
- [ ] Benchmark build time with 100+ images - Completed: ___________
- [ ] Test edge caching headers configuration - Completed: ___________

### Features
- [ ] Explore RSS feed generation for new images - Completed: ___________
- [ ] Consider dark mode toggle implementation - Completed: ___________
- [ ] Investigate image download button functionality - Completed: ___________

### Quality
- [ ] Add E2E tests with Playwright - Completed: ___________
- [ ] Set up visual regression testing - Completed: ___________
- [ ] Create component unit tests - Completed: ___________

### Content
- [ ] Build tag suggestion tool for authoring - Completed: ___________
- [ ] Create bulk image import script - Completed: ___________
- [ ] Design content versioning strategy - Completed: ___________

---

## Next 5 Tasks to Run

Based on current progress (M1.1 - COMPLETE, M1.2 - COMPLETE), these are the immediate next tasks:

1. **Configure tailwind.config.js with custom theme** (M1.3) ⭐ NEXT
   - Note: Tailwind 4.x uses different config format (CSS-based)
   - Set up content paths for purging
   - Define responsive breakpoints for gallery grid
   - Configure custom theme colors if needed

2. **Create global styles file** (M1.3)
   - Already exists at `/src/styles/global.css`
   - Add custom Tailwind utilities
   - Import Tailwind base/components/utilities
   - Add project-specific global styles

3. **Define images collection schema in config.ts** (M1.4)
   - Create `/src/content/config.ts`
   - Define Zod schema with all fields from PRD:
     - title, slug, alt, src, width, height, tags[], createdAt, prompt, model, credit
   - Add validation rules for required fields
   - Enable TypeScript type generation
