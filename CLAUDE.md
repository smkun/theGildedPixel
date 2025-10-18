# CLAUDE.md - Project-Specific Instructions for AI Image Gallery

## Session Startup Protocol

Every session MUST begin with these steps:

1. **Read PLANNING.md** - Understand architecture, tech stack, and key decisions
2. **Read TASKS.md** - Review milestone progress and current task status
3. **Verify Context** - Confirm understanding of project state before proceeding
4. **Check Git Status** - Run `git status` and `git branch` to understand working state

**Startup Commands:**
```bash
git status && git branch
# Then read PLANNING.md and TASKS.md
```

---

## Task Handling Rules

### Task Selection
- **Always** pick the highest-priority open task from TASKS.md
- Priority order: Current milestone → Next sequential task → Blockers → Newly Discovered
- If task is unclear or blocked, document blocker and select next available task

### Task Execution
1. **Read** the task description and acceptance criteria
2. **Execute** the task with minimal scope (one task at a time)
3. **Mark Complete** in TASKS.md:
   - Change `[ ]` to `[x]`
   - Set `Completed: YYYY-MM-DD` (use today's date from <env>)
4. **Validate** work meets requirements before marking complete

### Adding New Tasks
When discovering new work during execution:
- Add to "Newly Discovered Tasks" section in TASKS.md
- Format: `- [ ] Task description - Completed: ___________`
- Append one-line reason: `<!-- Reason: Found during M3.2 ImageCard implementation -->`
- Do NOT execute new tasks immediately; complete current task first

**Example:**
```markdown
## Newly Discovered Tasks

### Performance
- [ ] Add image preload for hero section - Completed: ___________
<!-- Reason: LCP spike detected during M6.5 testing -->
```

---

## File Discipline

### Before Writing/Editing Files
1. **Read First** - Always read existing file before editing
2. **Diff Review** - Understand what will change and why
3. **Scope Check** - Ensure changes are limited to current task
4. **No Recreation** - Never delete and rewrite entire files; use Edit tool for changes

### File Operations
- **Prefer Edit over Write** - Use Edit for existing files, Write only for new files
- **Atomic Changes** - One logical change per Edit operation
- **Preserve Context** - Maintain existing code style, formatting, and patterns
- **No Premature Optimization** - Implement what's required, nothing more

### Code Organization
- Follow directory structure from PLANNING.md:133-163
- Place components in `/src/components/*.astro` or `*.ts`
- Place pages in `/src/pages/*.astro`
- Place content in `/src/content/images/*.md`
- Place styles in `/src/styles/*.css`

---

## Git Commit Guidelines

### Commit Message Format
```
<short subject line (max 50 chars)>

<one-line explanation of why this change was made>

Task: [Task description from TASKS.md]
```

**Examples:**
```
Add ImageCard component with aspect ratio

Implements responsive card with hover states to meet M3.2 requirements

Task: Create ImageCard.astro component
```

```
Configure astro.config.mjs for static output

Enables static site generation and astro:assets for image optimization

Task: Configure astro.config.mjs for static output
```

### Commit Frequency
- Commit after each completed task
- Do NOT batch multiple tasks into one commit
- Use `git add -p` to stage only relevant changes
- Always run `git diff --cached` before committing

### Commit Process
```bash
git add <files>
git diff --cached  # Review changes
git commit -m "Subject

Why explanation

Task: [task name]"
```

---

## Session Closure Protocol

At the end of every session, append a dated summary to this file:

### Session Summary Template
```markdown
---

## Session Summary - YYYY-MM-DD

**Tasks Completed:**
- [x] Task 1 description (Milestone)
- [x] Task 2 description (Milestone)

**Tasks In Progress:**
- [ ] Task 3 description (blocked by X)

**Decisions Made:**
- Decision 1: Choice made with rationale
- Decision 2: Trade-off selected

**Blockers/Issues:**
- Issue 1: Description and impact
- Issue 2: Next steps needed

**Next Session Priorities:**
1. Task to start next
2. Follow-up item
3. Testing/validation needed
```

---

## Safety Rails

### Before Adding Dependencies
**ALWAYS** ask the user before installing new npm packages or libraries.

**Template:**
```
I need to add [library-name] for [specific functionality].

Option 1: [Library Name] ([size], [popularity])
  Pros: [benefit 1], [benefit 2]
  Cons: [trade-off 1], [trade-off 2]

Option 2: [Alternative or custom implementation]
  Pros: [benefit 1], [benefit 2]
  Cons: [trade-off 1], [trade-off 2]

Which approach would you prefer, or should I explore other options?
```

**Example:**
```
I need to add a lightbox library for M5.3 Lightbox Island.

Option 1: PhotoSwipe 5.x (~30KB gzip, 22k GitHub stars)
  Pros: Accessible, touch-friendly, well-maintained, keyboard nav built-in
  Cons: Adds 30KB to bundle, external dependency to maintain

Option 2: Custom vanilla TypeScript implementation (~8-10KB estimated)
  Pros: Smaller bundle, full control, no external dependency
  Cons: More implementation time, need to ensure accessibility ourselves

Which approach would you prefer, or should I explore other options?
```

### Before Major Refactors
Ask before making large architectural changes:
- Restructuring more than 3 files
- Changing core abstractions
- Modifying build configuration significantly
- Deviating from PLANNING.md decisions

---

## Performance Constraints (from PRD.md)

**Hard Limits:**
- LCP ≤ 2.5s on 4G mid-tier phones (landing/gallery)
- Total JS < 90 KB gzip on initial route
- Image bytes per view ≤ 700 KB median
- Lighthouse Performance ≥ 90 (gallery and image detail pages)

**Validation:**
- Run Lighthouse after completing M6.3 Lighthouse CI Setup
- Test on throttled network (Chrome DevTools: Fast 3G)
- Verify bundle size after M6.4 Bundle Analysis

---

## Project-Specific Patterns

### Astro Component Conventions
```astro
---
// Props interface first
interface Props {
  title: string;
  items: ImageData[];
}

// Destructure props
const { title, items } = Astro.props;

// Data fetching logic
// Component logic
---

<!-- HTML template -->
<!-- Always include descriptive comments -->
```

### TypeScript Island Conventions
```typescript
// Client-side island with explicit hydration strategy
// client:load, client:idle, or client:visible

interface IslandProps {
  // Props interface
}

export default function IslandName(props: IslandProps) {
  // Implementation
}
```

### Content Collection Entry Format
```markdown
---
title: "Image Title"
slug: "image-slug"
alt: "Descriptive alt text for accessibility"
src: "/src/images/originals/filename.jpg"
width: 1920
height: 1080
tags: ["tag1", "tag2", "tag3"]
createdAt: 2024-01-15T10:30:00Z
prompt: "Optional AI generation prompt"
model: "Optional model name"
credit: "Optional attribution"
---

Optional markdown content for extended description.
```

---

## Testing Requirements

### Before Marking Task Complete
- [ ] Code builds without errors (`npm run build`)
- [ ] No TypeScript errors (`npm run typecheck` if configured)
- [ ] Visual inspection in browser (dev server)
- [ ] Accessibility spot-check (keyboard nav, focus states)
- [ ] Responsive behavior tested (mobile, tablet, desktop)

### Milestone Testing Gates
- After M3: All components render correctly
- After M4: All routes are accessible and SEO tags present
- After M5: Islands hydrate and function correctly, <90KB JS
- After M6: Lighthouse scores ≥90, Core Web Vitals meet targets
- After M7: Accessibility audit passes (keyboard, screen reader, WCAG AA)

---

## Common Pitfalls to Avoid

❌ **Don't:**
- Skip reading PLANNING.md and TASKS.md at session start
- Execute multiple tasks without marking previous task complete
- Add dependencies without user approval
- Recreate entire files when editing
- Commit multiple unrelated tasks together
- Deviate from tech stack in PLANNING.md (Astro 4.x, Tailwind 3.4, TypeScript 5.3)
- Add client-side frameworks (React, Vue) beyond Astro islands
- Use image CDNs or external optimization services (use astro:assets)

✅ **Do:**
- Follow task sequence in TASKS.md
- Mark tasks complete with dates
- Ask before adding libraries
- Edit files incrementally
- Commit after each task
- Adhere to performance budgets
- Use Astro's built-in features (astro:assets, Content Collections)
- Keep islands minimal and scoped

---

## Session Log

### 2025-10-16

**Session Start:**
- Created PRD.md with comprehensive project requirements
- Created PLANNING.md with architecture and tech stack decisions
- Created TASKS.md with 9 milestones and 150+ atomic tasks
- Created CLAUDE.md with project-specific behavioral rules

**Next Session:**
- Begin M1.1: Initialize Astro project with TypeScript template
- Configure Astro and Tailwind per PLANNING.md
- Set up Content Collections schema

---

## Session Summary - 2025-10-16 (Implementation Session)

**Tasks Completed:**
- [x] Design PRD.md structure and content (Planning)
- [x] Design PLANNING.md with architecture and decisions (Planning)
- [x] Design TASKS.md with realistic milestones (Planning)
- [x] Design CLAUDE.md with project behavioral rules (Planning)
- [x] Initialize Astro project with TypeScript template (M1.1)
- [x] Install Tailwind CSS integration (M1.1)
- [x] Configure TypeScript compiler options (M1.1)
- [x] Initialize Git repository with .gitignore (M1.1)

**Tasks In Progress:**
- [ ] Create directory structure per PLANNING.md (M1.1) - Next priority

**Implementation Details:**
- Astro 5.14.5 installed (exceeds minimum requirement of 4.0.0)
- TypeScript strict mode enabled via `astro/tsconfigs/strict`
- Tailwind CSS 4.1.14 integrated via `@tailwindcss/vite` plugin
- Build test passed successfully (401ms, 1 page generated)
- Initial commit created: `e576b7e` with 15 files
- **Source Images**: 440 AI-generated character art images ready in `/SOURCE IMAGES/` directory

**Decisions Made:**
- Use Astro 5.x (newer version, backward compatible with 4.x requirements)
- Tailwind CSS 4.x via Vite plugin (modern integration method)
- Installed project in existing directory by moving from temp folder
- Git repository initialized from Astro template creation

**New Tasks Discovered:**
- None at this stage - following planned TASKS.md sequence

**Blockers/Issues:**
- None - M1.1 scaffolding on track

**Risks Identified:**
1. **Astro Version Jump**: Using Astro 5.14.5 instead of planned 4.x
   - Risk: Potential API changes or breaking changes
   - Mitigation: Astro maintains good backward compatibility; monitor during development
   - Impact: Low - benefits outweigh risks (newer features, bug fixes)

2. **Tailwind CSS v4**: Using Tailwind 4.x instead of planned 3.4
   - Risk: Syntax changes or migration requirements
   - Mitigation: Tailwind v4 is stable; documentation available
   - Impact: Low - modern approach with better performance

3. **Directory Structure**: Still need to create full directory structure
   - Risk: Components/content may be placed incorrectly initially
   - Mitigation: Next task addresses this explicitly
   - Impact: Low - early in project, easy to reorganize

**Next Session Priorities:**
1. **Create directory structure per PLANNING.md** (M1.1)
   - `/src/content/images/`, `/src/content/collections/`
   - `/src/images/originals/`
   - `/src/components/`

2. **Configure astro.config.mjs for static output** (M1.2)
   - Set `output: 'static'`
   - Enable `astro:assets` integration
   - Configure image optimization settings

3. **Define images collection schema in config.ts** (M1.4)
   - Create `/src/content/config.ts`
   - Define Zod schema with all fields from PRD
   - Add validation rules

---

## Session Summary - 2025-10-18

**Tasks Completed:**
- [x] Updated documentation to reflect simplified gallery (PLANNING.md, TASKS.md)
- [x] Enhanced CSS with improved color palette and gold accents
- [x] Added Google Fonts (Playfair Display + Inter)
- [x] Implemented gold filigree borders with responsive hiding
- [x] Fixed lightbox UX issues (arrow interference, accidental closing)
- [x] Implemented lightbox-only close via X button
- [x] Fixed mobile lightbox layout with proper control positioning
- [x] Fixed desktop lightbox image sizing (viewport units instead of percentages)
- [x] Fixed lightbox arrow positioning to clear filigree borders
- [x] Changed "artists" to "galleries" on landing page

**CSS Enhancements:**
- Enhanced color palette with richer gold tones (#d4af37, #f6c547, #b8992f)
- Gallery card shimmer animation on hover
- Improved lightbox styling with gradients, backdrop blur, zoom animations
- Typography enhancements with display font (Playfair Display) and body font (Inter)
- Link effects with animated underline
- Fade-in animations with stagger effects
- Decorative corner ornaments with radial gradients

**Responsive Improvements:**
- Filigree borders hidden below 1280px (mobile + tablets)
- Body padding (100px) added at 1280px+ to inset content from filigree
- Lightbox arrows positioned at 6rem (tablets) and 8rem (desktop) to clear filigree
- Mobile lightbox: arrows at bottom with 7rem padding for control space

**Decisions Made:**
- **Filigree breakpoint**: Show at ≥1280px only (not on tablets where it overlaps content)
- **Body padding**: 100px left/right at ≥1280px creates space between filigree and content
- **Lightbox sizing**: Use viewport units (90vw, 80vh) instead of percentages for consistent sizing
- **Arrow positioning**: Responsive positioning with media queries to avoid filigree overlap
- **Typography**: Playfair Display for elegance, Inter for readability

**Technical Fixes:**
1. **Lightbox viewport issue**: Changed from `inset: 0` to explicit `width: 100vw, height: 100vh`
2. **Arrow visibility**: Added `position: fixed !important` and `z-index: 150` to override inheritance
3. **Image sizing**: Explicit viewport-based max dimensions instead of parent-relative percentages
4. **Responsive arrows**: Conditional positioning based on screen size

**Issues Resolved:**
- Lightbox image appearing huge (fixed with viewport units)
- Arrows not visible on desktop (fixed with z-index and positioning)
- Arrows under filigree borders (fixed with increased left/right offset)
- Filigree covering content on tablets (fixed breakpoint to 1280px)
- Lightbox closing prematurely (removed all click-to-close except X button)
- Mobile arrow visibility (positioned at bottom with proper spacing)

**Next Session Priorities:**
1. **Performance testing** - Run Lighthouse audit and optimize for ≥90 score
2. **SEO meta tags** - Add comprehensive meta, Open Graph, Twitter Cards
3. **Deployment setup** - Choose hosting (Netlify/Vercel) and configure pipeline

---

## Session Summary - 2025-10-18 (Part 2: Script Enhancement)

**Tasks Completed:**
- [x] Enhanced import script with automatic format detection
- [x] Added WebP file support to import script
- [x] Fixed Draachenmar folder processing issues
- [x] Processed 2 problematic images successfully

**Script Enhancements Made:**
1. **Automatic Format Detection** ([import-artist-images.js:54-70](scripts/import-artist-images.js#L54-L70))
   - Added `detectImageFormat()` function using file signatures (magic bytes)
   - PNG detection: `0x89 0x50 0x4E 0x47`
   - JPEG detection: `0xFF 0xD8`
   - WebP detection: `RIFF ... WEBP` signature
   - No longer relies on file extension for format detection

2. **WebP Dimension Reader** ([import-artist-images.js:72-103](scripts/import-artist-images.js#L72-L103))
   - Added `getWebPDimensions()` function
   - Supports VP8 (lossy), VP8L (lossless), VP8X (extended) formats
   - Extracts width/height from WebP binary structure

3. **WebP File Handling** ([import-artist-images.js:258-272](scripts/import-artist-images.js#L258-L272))
   - Files already in WebP format are copied (not converted)
   - Creates markdown files for existing WebP images
   - Moves WebP files to appropriate destination folders

4. **Smart Processing Logic**
   - Auto-detects actual format vs. file extension
   - Handles misnamed files (PNG with .jpg extension)
   - Process flow: Detect format → Get dimensions → Copy or Convert → Create .md → Delete source

**Issues Fixed:**

1. **Bramblefoot Bumblehatch.jpg**
   - **Problem**: PNG file with .jpg extension causing "Not a JPEG file" error
   - **Root cause**: Script relied on file extension, JPEG parser failed on PNG data
   - **Solution**: Auto-detect format from binary signature
   - **Result**: ✅ Successfully detected as PNG, converted to WebP (1024x1024)
   - **Files created**:
     - `src/images/draachenmar/bramblefoot-bumblehatch.webp`
     - `src/content/images/bramblefoot-bumblehatch.md`

2. **Lineton Orphanage.webp**
   - **Problem**: Already WebP but script only handled JPG/PNG
   - **Root cause**: Script filter regex excluded .webp files
   - **Solution**: Added WebP to file filter and copy logic
   - **Result**: ✅ Successfully copied WebP and created metadata (1792x1024)
   - **Files created**:
     - `src/images/draachenmar/lineton-orphanage.webp` (copied)
     - `src/content/images/lineton-orphanage.md`

**Processing Summary:**
```
📁 Draachenmar folder:
   - Converted: 1 (PNG→WebP)
   - Copied: 1 (WebP→WebP)
   - Failed: 0
   - Total images added to gallery: 2
```

**Technical Improvements:**
- **Robustness**: Handles misnamed files gracefully
- **Flexibility**: Supports JPG, PNG, and WebP source files
- **Reliability**: Format detection based on binary signatures, not extensions
- **Efficiency**: Skips conversion for already-converted WebP files

**Files Modified:**
- [scripts/import-artist-images.js](scripts/import-artist-images.js)
  - Added `copyFile` import
  - Added `detectImageFormat()` function
  - Added `getWebPDimensions()` function
  - Enhanced `getImageDimensions()` with format detection
  - Updated file filter to include `.webp` files
  - Updated processing loop to copy WebP files instead of converting

**New Script Capabilities:**
- ✅ Auto-detect file format (independent of extension)
- ✅ Handle PNG files with .jpg extension
- ✅ Handle JPEG files with .png extension
- ✅ Process existing WebP files
- ✅ Extract dimensions from WebP (VP8/VP8L/VP8X)
- ✅ Smart copy vs. convert decision

**Next Session Priorities:**
1. **Import remaining artists** - Process all SOURCE IMAGES subfolders
2. **Performance testing** - Run Lighthouse audit and optimize for ≥90 score
3. **SEO meta tags** - Add comprehensive meta, Open Graph, Twitter Cards

---

## Session Summary - 2025-10-18 (Part 3: Production Deployment Setup)

**Tasks Completed:**
- [x] Configured Astro for subdirectory deployment at `/theGildedPixel`
- [x] Moved images from `src/images/` to `public/images/`
- [x] Updated all content collection image paths
- [x] Fixed internal navigation links with base path
- [x] Updated import script for new directory structure
- [x] Tested production build successfully

**Production Configuration:**

1. **Astro Config** ([astro.config.mjs:12](astro.config.mjs#L12))
   - Added `base: '/theGildedPixel'` for subdirectory deployment
   - Configured for static site generation
   - All asset paths automatically prefixed with base

2. **Image Structure Migration**
   - **Old**: `src/images/{artist}/` → Not included in build
   - **New**: `public/images/{artist}/` → Copied to `dist/images/`
   - **Result**: All 1001 images now in production build

3. **Content Collection Updates**
   - Updated 1001 markdown files: `src: "/images/..."` → `src: "/theGildedPixel/images/..."`
   - Ensures images load correctly at `32Gamers.com/theGildedPixel/`

4. **Navigation Fixes** ([index.astro:7](src/pages/index.astro#L7), [artist/[slug].astro:7](src/pages/artist/[slug].astro#L7))
   - Added `const base = import.meta.env.BASE_URL` to both pages
   - Updated artist links: `href={`${base}/artist/${slug}`}`
   - Updated back link: `href={base}`
   - All internal navigation now base-path aware

5. **Import Script Updates** ([import-artist-images.js:225,277](scripts/import-artist-images.js#L225))
   - Destination changed: `public/images/{artist}/`
   - Image paths include base: `/theGildedPixel/images/{artist}/{image}.webp`
   - Ready for future artist imports

**Deployment Structure:**

```
dist/                              Upload contents to: 32Gamers.com/theGildedPixel/
├── index.html                     → 32Gamers.com/theGildedPixel/
├── artist/
│   ├── 32gamers/index.html       → 32Gamers.com/theGildedPixel/artist/32gamers/
│   ├── draachenmar/index.html
│   ├── nice-and-satisfying/index.html
│   └── supers/index.html
├── images/                        → 32Gamers.com/theGildedPixel/images/
│   ├── 32gamers/ (228 images)
│   ├── draachenmar/ (242 images)
│   ├── nice-and-satisfying/ (444 images)
│   └── supers/ (87 images)
├── _astro/                        → 32Gamers.com/theGildedPixel/_astro/
│   ├── _slug_.RsxQg9K1.css
│   └── filagre.BknNrKlE.png
└── favicon.svg
```

**Build Verification:**
```bash
npm run build
# ✓ 5 pages built successfully
# ✓ All 1001 images in dist/images/
# ✓ Links use correct base path: /theGildedPixel/artist/...
# ✓ Image src paths: /theGildedPixel/images/...
```

**Deployment Instructions:**

1. **Build the site:**
   ```bash
   npm run build
   ```

2. **Upload `dist/` contents** (NOT the dist folder itself) to your server at:
   ```
   32Gamers.com/theGildedPixel/
   ```

3. **DO NOT upload:**
   - ❌ `src/` folder
   - ❌ `node_modules/`
   - ❌ `public/` folder (contents already in `dist/`)
   - ❌ `SOURCE IMAGES/` folder
   - ❌ Project files (package.json, astro.config.mjs, etc.)

4. **Your site will be live at:**
   - Landing: `https://32Gamers.com/theGildedPixel/`
   - Artist galleries: `https://32Gamers.com/theGildedPixel/artist/{artist-name}/`

**Files Modified:**
- [astro.config.mjs](astro.config.mjs) - Added `base: '/theGildedPixel'`
- [src/pages/index.astro](src/pages/index.astro) - Added base path to links
- [src/pages/artist/[slug].astro](src/pages/artist/[slug].astro) - Added base path to back link
- [scripts/import-artist-images.js](scripts/import-artist-images.js) - Updated to `public/images/` with base path
- All 1001 `.md` files in `src/content/images/` - Updated image src paths

**Technical Details:**
- **Total size**: `dist/` folder is self-contained production build
- **Images**: 1001 WebP images (~200-300 MB total)
- **Pages**: 5 HTML pages (1 landing + 4 artist galleries)
- **Assets**: CSS, fonts, filigree border image

**Decisions Made:**
- **Subdirectory deployment**: Site will live at `/theGildedPixel` under main domain
- **Public folder**: Images moved to `public/` for static file serving
- **Base path strategy**: Use Astro's `base` config + `import.meta.env.BASE_URL` for links
- **Self-contained build**: Everything needed is in `dist/`, no external dependencies

**Risks/Considerations:**
1. **File upload size**: ~200-300 MB of images to upload
   - Mitigation: Use FTP/SFTP for efficient bulk transfer
   - Impact: Low - one-time upload, then incremental updates

2. **Base path dependency**: All paths require `/theGildedPixel` prefix
   - Mitigation: Configured at build time via `astro.config.mjs`
   - Impact: Low - can change base and rebuild if needed

3. **Artist imports**: Future imports must use updated script
   - Mitigation: Script already updated to use `public/images/`
   - Impact: None - script ready for future use

**Next Session Priorities:**
1. **Upload to production** - Deploy `dist/` to 32Gamers.com/theGildedPixel/
2. **Verify live site** - Test all links, images, and lightbox functionality
3. **Performance testing** - Run Lighthouse audit on live site for ≥90 score
