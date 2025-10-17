# Image Naming Conventions

## Image Gallery Philosophy

**Simple visual gallery - no labels, tags, or text needed.**

Just display the images in a responsive grid. The content collection only tracks:
- Image path (WebP format)
- Width and height (for aspect ratio)

## Source Image Files

### Source Format
- **Source Directory**: `/SOURCE IMAGES/` (root level, excluded from git)
- **Source Format**: JPG files from AI generation
- **Total Available**: 440 images

### Converted Format
- **Destination**: `src/images/originals/`
- **Format**: WebP (converted from JPG during import)
- **Quality**: 85 (balance between size and quality)
- **Filename**: `{kebab-case-slug}.webp`

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
SOURCE: Aerith Gainsborough.jpg
  → WEBP: aerith-gainsborough.webp
  → CONTENT: aerith-gainsborough.md

SOURCE: Ais Wallenstein.jpg
  → WEBP: ais-wallenstein.webp
  → CONTENT: ais-wallenstein.md
```

## Metadata Requirements

### Minimal Schema (3 fields only)
```yaml
src: "/src/images/originals/{slug}.webp"
width: 1158 | 1229  # Exact pixel width from original
height: 2048         # Exact pixel height from original
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
├── SOURCE IMAGES/              # 440 original JPG images (gitignored)
│   ├── Adorna.jpg
│   ├── Aelin.jpg
│   └── ...
├── src/
│   ├── content/
│   │   └── images/            # Minimal metadata files (3 fields)
│   │       ├── adorna.md
│   │       ├── aelin.md
│   │       └── ...
│   └── images/
│       └── originals/         # Converted WebP images (committed)
│           ├── adorna.webp
│           ├── aelin.webp
│           └── ...
└── scripts/
    └── convert-and-import.js  # JPG→WebP conversion + metadata generation
```

## Content Entry Template

```markdown
---
src: "/src/images/originals/{slug}.webp"
width: 1158
height: 2048
---
```

**That's the entire file!** No body content, no descriptions, no metadata.

## Workflow

### Adding New Images

**One command does it all:**

```bash
# Convert and import 10 images
node scripts/convert-and-import.js 10

# Convert and import 50 images
node scripts/convert-and-import.js 50

# Convert and import all 440 images
node scripts/convert-and-import.js 440
```

**What the script does:**
1. Reads JPG files from `SOURCE IMAGES/`
2. Extracts dimensions from JPG headers
3. Converts JPG → WebP (quality 85, ~50% size reduction)
4. Saves WebP to `src/images/originals/{slug}.webp`
5. Creates minimal `.md` file with path and dimensions
6. Uses FFmpeg (or fallback to cwebp if available)

**Validation:**
```bash
npm run build
```

Schema validation ensures:
- Valid image paths
- Positive integer dimensions
- Required fields present

## Examples

### Actual Content File (adorna.md)
```markdown
---
src: "/src/images/originals/adorna.webp"
width: 1158
height: 2048
---
```

### Actual Content File (aelin.md)
```markdown
---
src: "/src/images/originals/aelin.webp"
width: 1229
height: 2048
---
```

Simple, clean, minimal. Just what's needed for a responsive image gallery.

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
