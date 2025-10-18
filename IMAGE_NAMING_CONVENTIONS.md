# Image Naming Conventions

## Image Gallery Philosophy

**Simple visual gallery - no labels, tags, or text needed.**

Just display the images in a responsive grid. The content collection only tracks:
- Image path (WebP format)
- Width and height (for aspect ratio)

## Source Image Files

### Source Format
- **Source Directory**: `/SOURCE IMAGES/<artist-name>/` (subfolders by artist, excluded from git)
- **Source Format**: JPG files from AI generation
- **Total Available**: 440 images (Nice and Satisfying)
- **Organization**: One subfolder per artist

### Converted Format
- **Destination**: `src/images/<artist-slug>/`
- **Format**: WebP (converted from JPG during import)
- **Quality**: 85 (balance between size and quality)
- **Filename**: `{kebab-case-slug}.webp`
- **Organization**: One subfolder per artist

### Conversion Benefits
- **50% smaller file size**: ~300KB WebP vs ~600KB JPG average
- **Better compression**: WebP optimized for web delivery
- **Single conversion**: JPG → WebP during import (no double storage)

## Content Collection Files

### File Format
- **Location**: `src/content/images/`
- **Format**: `{kebab-case-slug}.md`
- **Slug Generation**: Auto-converted from filename during import

### Slug Rules
1. **Kebab Case**: Lowercase with hyphens
2. **No Spaces**: Spaces → hyphens
3. **No Special Characters**: Removed automatically
4. **Unique**: Each slug must be unique

### Examples
```
SOURCE: SOURCE IMAGES/Nice and Satisfying/Aerith Gainsborough.jpg
  → WEBP: src/images/nice-and-satisfying/aerith-gainsborough.webp
  → CONTENT: src/content/images/aerith-gainsborough.md
  → ARTIST: src/content/artists/nice-and-satisfying.md

SOURCE: SOURCE IMAGES/Another Artist/Character Name.jpg
  → WEBP: src/images/another-artist/character-name.webp
  → CONTENT: src/content/images/character-name.md
  → ARTIST: src/content/artists/another-artist.md (created automatically)
```

## Metadata Requirements

### Image Schema (4 fields only)
```yaml
artist: "nice-and-satisfying"  # Artist slug
src: "/src/images/{artist-slug}/{slug}.webp"
width: 1158 | 1229  # Exact pixel width from original
height: 2048         # Exact pixel height from original
```

### Artist Schema
```yaml
name: "Nice and Satisfying"  # Display name
slug: "nice-and-satisfying"  # URL-safe slug
profileUrl: "https://..."    # Optional social media link
```

**That's it!** No titles, alt text, tags, descriptions, or dates needed.

## Dimension Standards

Based on current image set:

### Portrait Orientation (Standard)
- **Width**: 1158px or 1229px
- **Height**: 2048px
- **Aspect Ratio**: ~9:16 (portrait)
- **Format**: All AI-generated character art

### Dimension Extraction
Dimensions are read automatically during conversion:
```bash
node scripts/convert-and-import.js 10
```

## File Organization

```
MikeW/
├── SOURCE IMAGES/                    # Original JPG images (gitignored)
│   ├── Nice and Satisfying/         # Artist subfolder
│   │   ├── (empty after import)     # Ready for new images
│   │   └── ...
│   └── Another Artist/              # Another artist subfolder
│       └── ...
├── src/
│   ├── content/
│   │   ├── artists/                 # Artist profiles
│   │   │   ├── nice-and-satisfying.md
│   │   │   └── another-artist.md
│   │   └── images/                  # Image metadata files (4 fields)
│   │       ├── adorna.md
│   │       ├── aelin.md
│   │       └── ...
│   └── images/                      # Converted WebP images (committed)
│       ├── nice-and-satisfying/     # Artist-specific folder
│       │   ├── adorna.webp
│       │   ├── aelin.webp
│       │   └── ...
│       └── another-artist/
│           └── ...
└── scripts/
    ├── convert-and-import.js        # Legacy: single artist import
    └── import-artist-images.js      # NEW: multi-artist subfolder import
```

## Content Entry Templates

### Image Entry
```markdown
---
artist: "nice-and-satisfying"
src: "/src/images/nice-and-satisfying/{slug}.webp"
width: 1158
height: 2048
---
```

### Artist Entry
```markdown
---
name: "Nice and Satisfying"
slug: "nice-and-satisfying"
profileUrl: "https://www.facebook.com/profile.php?id=61561764052793"
---

AI character art created by Nice and Satisfying.
```

**That's it!** No body content needed for images, minimal bio for artists.

## Workflow

### Adding New Images (NEW WORKFLOW)

**Step 1: Add images to artist subfolders**
```bash
SOURCE IMAGES/
├── Nice and Satisfying/
│   ├── new-image-1.jpg
│   ├── new-image-2.jpg
│   └── ...
└── Another Artist/
    ├── artwork-1.jpg
    └── ...
```

**Step 2: Run automated import**
```bash
# Process all artist subfolders
node scripts/import-artist-images.js
```

**What the script does:**
1. Scans `SOURCE IMAGES/` for artist subfolders
2. Detects artist names from folder names (converts to slug)
3. Creates artist profile if doesn't exist
4. Reads JPG files from each artist's subfolder
5. Extracts dimensions from JPG headers
6. Converts JPG → WebP (quality 85, ~50% size reduction)
7. Saves WebP to `src/images/{artist-slug}/{image-slug}.webp`
8. Creates minimal `.md` file with artist reference and dimensions
9. **Deletes source JPG files** (keeps subfolder for next batch)
10. Uses FFmpeg (or fallback to cwebp if available)

### Legacy Workflow (Single Artist)

**For manual control or single artist imports:**
```bash
# Convert and import 10 images for specific artist
node scripts/convert-and-import.js 10 nice-and-satisfying
```

**Differences:**
- Requires existing artist profile
- All images go to same artist
- Does NOT delete source files
- Uses flat `SOURCE IMAGES/` directory (not subfolders)

**Validation:**
```bash
npm run build
```

Schema validation ensures:
- Valid image paths
- Positive integer dimensions
- Required fields present

## Examples

### Actual Image File (adorna.md)
```markdown
---
artist: "nice-and-satisfying"
src: "/src/images/nice-and-satisfying/adorna.webp"
width: 1158
height: 2048
---
```

### Actual Image File (aelin.md)
```markdown
---
artist: "nice-and-satisfying"
src: "/src/images/nice-and-satisfying/aelin.webp"
width: 1229
height: 2048
---
```

### Actual Artist File (nice-and-satisfying.md)
```markdown
---
name: "Nice and Satisfying"
slug: "nice-and-satisfying"
profileUrl: "https://www.facebook.com/profile.php?id=61561764052793"
---

AI character art created by Nice and Satisfying.
```

Simple, clean, minimal. Just what's needed for a multi-artist responsive image gallery.

## Migration Status

- **Total Available**: 440 JPG images in `/SOURCE IMAGES/`
- **Converted**: 10 WebP images (2.3%)
- **Size Reduction**: ~50% (6.2MB → 3.1MB for 10 images)
- **Format**: WebP quality 85
- **Dimensions**: Auto-extracted during conversion
- **Build Validation**: ✅ All entries pass

## Performance Benefits

**WebP Advantages:**
- 50% smaller than JPG at equivalent quality
- Better compression for web delivery
- Native browser support (all modern browsers)
- Faster page loads and lower bandwidth

**Projected Full Gallery:**
- 440 images × 300KB average = ~130MB total
- vs. 440 images × 600KB JPG = ~260MB
- **Savings: 130MB (50% reduction)**
