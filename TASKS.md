# TASKS.md - The Gilded Pixel

## Project Status: ✅ Core Features Complete

The simplified gallery is **functionally complete** with landing page, artist galleries, and lightbox. Remaining work focuses on polish, performance, and deployment.

---

## ✅ Completed Features

### Foundation & Setup
- [x] Astro 5.14.5 + Tailwind 4.1.14 project scaffolding - 2025-10-17
- [x] Content Collections schema (artists + images) - 2025-10-17
- [x] Custom dark theme with gold accents - 2025-10-17
- [x] Responsive grid utilities (1-9 columns) - 2025-10-17
- [x] Image import automation script - 2025-10-17

### Content Pipeline
- [x] Artist-based image organization - 2025-10-17
- [x] JPG/PNG → WebP conversion script - 2025-10-17
- [x] Automated frontmatter generation - 2025-10-17
- [x] Image naming conventions documentation - 2025-10-17
- [x] ~900+ images imported (3 artists) - 2025-10-18

### Pages & UI
- [x] Landing page with artist grid - 2025-10-17
- [x] Artist gallery pages (`/artist/[slug]`) - 2025-10-17
- [x] Inline lightbox with keyboard navigation - 2025-10-17
- [x] Hover effects and transitions - 2025-10-17
- [x] Responsive breakpoints - 2025-10-17

---

## 🎨 Current Sprint: CSS Enhancement

### Visual Polish (In Progress)
- [ ] Enhance landing page hero/header design - Pending
- [ ] Improve artist card aesthetics - Pending
- [ ] Refine gallery grid spacing and flow - Pending
- [ ] Enhance lightbox UI (backdrop, controls) - Pending
- [ ] Add subtle animations and transitions - Pending
- [ ] Improve typography hierarchy - Pending
- [ ] Refine color palette consistency - Pending

---

## 📋 Backlog: Future Enhancements

### Performance & Optimization
- [ ] Run Lighthouse audit (target ≥90) - Not started
- [ ] Measure and optimize LCP - Not started
- [ ] Test on throttled 4G network - Not started
- [ ] Implement image preloading strategy - Not started
- [ ] Bundle size analysis - Not started

### SEO & Meta
- [ ] Add comprehensive meta tags (title, description) - Not started
- [ ] Implement Open Graph tags - Not started
- [ ] Add Twitter Card meta - Not started
- [ ] Generate sitemap.xml - Not started
- [ ] Create robots.txt - Not started

### Deployment
- [ ] Choose hosting provider (Netlify/Vercel) - Not started
- [ ] Configure build command - Not started
- [ ] Set up deployment pipeline - Not started
- [ ] Configure custom domain (optional) - Not started

### Content Expansion
- [ ] Import remaining artists from SOURCE IMAGES/ - Not started
- [ ] Verify all artist profiles have URLs - Not started
- [ ] Add artist bio content (optional) - Not started

### Optional Features
- [ ] Dark/light mode toggle - Not started
- [ ] Analytics integration (Plausible/Umami) - Not started
- [ ] RSS feed for new images - Not started
- [ ] Image download functionality - Not started
- [ ] Social sharing buttons - Not started

---

## 🗑️ Removed from Scope

These features were in original PRD but removed for simplified gallery:

- ❌ Tag system and tag pages
- ❌ Search functionality
- ❌ Client-side filtering
- ❌ Individual image detail pages
- ❌ Collections feature
- ❌ About page
- ❌ Complex metadata (prompts, models, credits)
- ❌ Separate island components

---

## 📝 Quick Reference

### Adding New Artists
```bash
# 1. Create folder in SOURCE IMAGES/
mkdir "SOURCE IMAGES/Artist Name"

# 2. Add JPG/PNG files to folder

# 3. Run import script
node scripts/import-artist-images.js

# 4. Preview changes
npm run dev
```

### Development Workflow
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Scripts
- `scripts/import-artist-images.js` - Main import automation
- `scripts/get-image-dims.js` - Manual dimension extraction
- ~~`scripts/convert-and-import.js`~~ - Obsolete (use import-artist-images.js)
- ~~`scripts/add-artist-field.js`~~ - Obsolete (one-time migration)

---

## 🎯 Next Actions

1. **CSS Enhancement Pass** (Current)
   - Improve visual aesthetics across all pages
   - Refine spacing, typography, and animations

2. **Performance Testing**
   - Run Lighthouse audit
   - Optimize images and bundle size

3. **Deploy MVP**
   - Choose hosting provider
   - Set up deployment pipeline

4. **Content Expansion**
   - Import remaining artists
   - Verify metadata completeness
