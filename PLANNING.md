# PLANNING.md

## Vision

**"The Gilded Pixel - Where prompts meet polish."**

A fast, elegant static gallery showcasing AI-generated character art by multiple artists. Built with Astro and Tailwind CSS, the site features a simple two-level navigation: an artist selection landing page and per-artist galleries with integrated lightbox viewing. Images are optimized as WebP format, managed through minimal Markdown frontmatter, and deployed as static files with zero backend complexity.

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Astro** | 5.14.5 | Static site generator with Content Collections |
| **Tailwind CSS** | 4.1.14 | Utility-first CSS framework via Vite plugin |
| **TypeScript** | 5.6.3 | Type-safe development (strict mode) |
| **astro:assets** | (built-in) | Image optimization with `<Image />` component |
| **Sharp** | (via Astro) | Image processing for WebP and responsive derivatives |

**Rationale**: Astro's Content Collections provide type-safe content management with zero runtime overhead. Tailwind's utility classes enable rapid styling with a custom dark theme. Images are converted to WebP via build scripts and optimized by Astro at build time.

## Architecture (Simplified)

### Content Layer (Astro Content Collections)
**Location**: `/src/content/`

**Images Collection** (`/src/content/images/*.md`):
- Minimal schema: `artist` (string), `src` (string), `width` (number), `height` (number)
- Example:
  ```markdown
  ---
  artist: "nice-and-satisfying"
  src: "/src/images/nice-and-satisfying/image.webp"
  width: 1158
  height: 2048
  ---
  ```

**Artists Collection** (`/src/content/artists/*.md`):
- Schema: `name` (string), `profileUrl` (optional string), `bio` (optional string)
- Auto-created by `scripts/import-artist-images.js`

**Boundary**: Pure data, no logic. Content files created by import scripts.

### Pages (Astro Routes)
**Location**: `/src/pages/`

**Landing Page** (`/index.astro`):
- Displays artist grid with preview images
- Shows artist names and image counts
- Links to individual artist galleries

**Artist Gallery** (`/artist/[slug].astro`):
- Dynamic route for each artist
- Responsive grid of all artist's images
- Inline lightbox script (no separate islands)
- Keyboard navigation (←/→/Esc)

**Boundary**: All routes pre-rendered at build time. No SSR. Minimal client-side JS (lightbox only).

## External Services and Data Flow

### Image Storage and Processing

**Source**: `/SOURCE IMAGES/[artist-name]/` - organized by artist subdirectories

**Processing**: `scripts/import-artist-images.js`
- Reads all subdirectories in `/SOURCE IMAGES/`
- Converts JPG/PNG → WebP using ffmpeg (fallback: cwebp)
- Auto-creates artist profiles in `/src/content/artists/`
- Generates `.md` files in `/src/content/images/` with minimal frontmatter
- Deletes source files after successful conversion
- Organizes WebP files in `/src/images/[artist-slug]/`

**Build-time Flow**:
```
SOURCE IMAGES/
  ├─ artist-name/
  │   └─ image.jpg
  └─ another-artist/
      └─ image.png

        ↓ [import-artist-images.js]

/src/images/artist-slug/image.webp
/src/content/images/image.md
/src/content/artists/artist-slug.md

        ↓ [Astro build]

/dist/_astro/[hash].webp (optimized, responsive)
```

### Hosting
**Target**: Static file hosts (Netlify, Vercel, Cloudflare Pages)

**Flow**: `npm run build` → `/dist` static assets → CDN deployment

**Note**: No analytics, no backend, no external services. Pure static site.

## Key Implementation Decisions

### Simplified Schema (No Tags, No Metadata)
**Choice**: Minimal frontmatter with just `artist`, `src`, `width`, `height`

**Rationale**: Eliminated complexity of tags, search, filtering, prompts, and metadata. Focus on pure visual gallery experience. Content creation is fully automated via import script.

### Two-Page Architecture
**Choice**: Landing page (artist grid) + Artist galleries (with lightbox)

**Rationale**: Simple navigation hierarchy. No individual image pages, no tag pages, no collections. Just browse by artist and view in lightbox.

### Inline Lightbox Script
**Choice**: Vanilla JavaScript in `<script>` tag, not separate island component

**Rationale**: Minimal JS footprint. Keyboard navigation (←/→/Esc) built-in. No external libraries, no framework overhead.

### Automated Content Pipeline
**Choice**: Single script (`import-artist-images.js`) handles everything

**Rationale**: Drop images in artist folders, run script, content is ready. Auto-creates artist profiles, converts to WebP, generates frontmatter, deletes sources.

### Dark Theme with Gold Accents
**Choice**: Custom Tailwind theme with dark background and gold highlights

**Rationale**: "The Gilded Pixel" branding. Elegant, gallery-focused aesthetic. Gold (#d4af37) provides warmth against dark backgrounds.

## Current Status (as of 2025-10-18)

### ✅ Completed
- Project scaffolding with Astro 5.14.5 + Tailwind 4.1.14
- Content Collections schema (artists + images)
- Image import automation script
- Landing page with artist grid
- Artist gallery pages with responsive grid
- Lightbox with keyboard navigation
- Dark theme with gold accents
- Responsive breakpoints (1-9 column grid)
- ~900+ images imported from 3 artists

### 🔄 In Progress
- CSS enhancements for improved visual appeal
- Additional artist imports

### 📋 Future Considerations
- Performance testing (Lighthouse CI)
- Deployment to static host
- SEO optimization (meta tags, Open Graph)
- Analytics integration (optional)

## Workflow for Adding New Artists

1. **Organize source images**: Create folder in `/SOURCE IMAGES/[Artist Name]/`
2. **Run import script**: `node scripts/import-artist-images.js`
3. **Build and preview**: `npm run dev` to view changes
4. **Deploy**: `npm run build` and push to hosting

The script automatically:
- Converts JPG/PNG to WebP
- Creates artist profile if missing
- Generates image frontmatter
- Deletes source files after conversion
- Organizes images by artist in `/src/images/`
