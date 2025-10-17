# Image Naming Conventions

## Source Image Files

### Filename Format
- **Location**: `src/images/originals/`
- **Format**: `{Name}.jpg` or `{Character Name}.jpg`
- **Examples**:
  - `Adorna.jpg`
  - `Aerith Gainsborough.jpg`
  - `Alice Zuberg.jpg`

### Rules
1. **Character Names**: Use proper capitalization for character names
2. **Spaces Allowed**: Multi-word names use spaces (not hyphens or underscores)
3. **Format**: Currently JPG only (440 images available)
4. **Source Directory**: `/SOURCE IMAGES/` (root level, excluded from git)
5. **Destination**: `/src/images/originals/` (included in repo)

## Content Collection Slugs

### Slug Format
- **Location**: `src/content/images/`
- **Format**: `{kebab-case-name}.md`
- **Auto-generation**: Astro 5.x generates slugs from filenames

### Examples
```
Aerith Gainsborough.jpg → aerith-gainsborough.md
Alice Zuberg.jpg → alice-zuberg.md
Ellen Joe.jpg → ellen-joe.md
```

### Rules
1. **Kebab Case**: Use lowercase with hyphens
2. **No Spaces**: Replace spaces with hyphens
3. **No Special Characters**: Remove apostrophes, periods, etc.
4. **Descriptive**: Match character name or theme
5. **Unique**: Each slug must be unique across collection

## Metadata Requirements

### Required Fields
```yaml
title: "Character/Theme Name"
alt: "Descriptive alt text (10-200 chars)"
src: "/src/images/originals/{filename}.jpg"
width: 1158 | 1229  # Exact pixel width
height: 2048         # Exact pixel height
tags: ["tag1", "tag2", "tag3"]  # 1-10 tags
createdAt: 2024-12-15T10:30:00Z  # ISO 8601 format
```

### Optional Fields
```yaml
prompt: "AI generation prompt (max 500 chars)"
model: "AI model name (max 100 chars)"
credit: "Attribution or credit (max 200 chars)"
```

## Dimension Standards

Based on current image set (10 sample images):

### Portrait Orientation (Standard)
- **Width**: 1158px or 1229px
- **Height**: 2048px
- **Aspect Ratio**: ~9:16 (portrait)
- **Usage**: 9/10 images use this format

### Variations Observed
- **1158x2048**: Most common (7/10 images)
- **1229x2048**: Wider variant (3/10 images)

### Getting Dimensions
Use the dimension extraction script:
```bash
node scripts/get-image-dims.js
```

## Tag Conventions

### Tag Categories
- **Genre**: fantasy, modern, cyber, sci-fi
- **Role**: warrior, knight, mage, sorceress
- **Style**: tactical, elegant, stylish, ornate
- **Color**: golden, red, blue, white, black
- **Theme**: armor, magic, ice, wind, fire

### Tag Rules
1. **Lowercase**: All tags should be lowercase
2. **Hyphenated**: Multi-word tags use hyphens (e.g., "character-art")
3. **Consistent**: Use existing tags when applicable
4. **Limit**: 1-10 tags per image (enforced by schema)
5. **Relevant**: Tags should describe visual or thematic elements

## File Organization

```
MikeW/
├── SOURCE IMAGES/           # 440 original images (gitignored)
│   ├── Adorna.jpg
│   ├── Aelin.jpg
│   └── ...
├── src/
│   ├── content/
│   │   └── images/         # Markdown metadata files
│   │       ├── adorna.md
│   │       ├── aelin.md
│   │       └── ...
│   └── images/
│       └── originals/      # Source images (committed)
│           ├── Adorna.jpg
│           ├── Aelin.jpg
│           └── ...
└── scripts/
    └── get-image-dims.js   # Dimension extraction utility
```

## Content Entry Template

```markdown
---
title: "Character Name - Descriptive Title"
alt: "Detailed accessibility description with visual elements, colors, and character pose"
src: "/src/images/originals/{filename}.jpg"
width: 1158
height: 2048
tags: ["tag1", "tag2", "tag3", "tag4", "tag5"]
createdAt: YYYY-MM-DDTHH:MM:SSZ
prompt: "Optional: AI generation prompt describing the image creation parameters"
model: "Optional: AI model used to generate the image"
credit: "Optional: AI Generated Character Art or specific attribution"
---

A detailed description paragraph providing context about the character, design elements,
color scheme, thematic elements, and artistic style.

Optional second paragraph explaining the aesthetic approach, genre conventions, or
intended use cases for the artwork.
```

## Workflow

### Adding New Images

1. **Copy Source Image**
   ```bash
   cp "SOURCE IMAGES/{Name}.jpg" src/images/originals/
   ```

2. **Get Dimensions**
   ```bash
   node scripts/get-image-dims.js
   ```

3. **Create Metadata File**
   - Create `src/content/images/{kebab-case-name}.md`
   - Use template above
   - Fill in all required fields
   - Add 3-5 relevant tags

4. **Validate**
   ```bash
   npm run build
   ```

   Schema validation will catch:
   - Missing required fields
   - Invalid data types
   - Out-of-range values
   - Invalid dates

## Examples

### Simple Entry
```markdown
---
title: "Aelin - Ice Warrior"
alt: "Fantasy character in white and blue robes with ice magic effects"
src: "/src/images/originals/Aelin.jpg"
width: 1229
height: 2048
tags: ["fantasy", "ice", "magic", "warrior"]
createdAt: 2024-12-18T14:20:00Z
---

An ice warrior combining martial prowess with elemental magic.
```

### Full Entry with Optional Fields
```markdown
---
title: "Adorna - Fantasy Warrior"
alt: "Fantasy warrior character Adorna in ornate golden armor with flowing red accents and intricate details"
src: "/src/images/originals/Adorna.jpg"
width: 1158
height: 2048
tags: ["fantasy", "warrior", "armor", "golden", "character-art"]
createdAt: 2024-12-15T10:30:00Z
prompt: "Fantasy warrior woman in ornate golden armor with red fabric accents, detailed medieval armor design, dramatic lighting"
model: "AI Image Generator"
credit: "AI Generated Character Art"
---

A stunning fantasy character portrait featuring Adorna, a warrior clad in intricate
golden armor. The detailed armor design features ornate metalwork with warm gold and
amber tones, complemented by flowing red fabric accents.

This AI-generated character art exemplifies the blend of traditional fantasy aesthetics
with modern digital art techniques, perfect for character design inspiration or fantasy
world-building projects.
```

## Migration Status

- **Total Available**: 440 images in `/SOURCE IMAGES/`
- **Migrated**: 10 images (2.3%)
- **Dimensions Verified**: Yes (via get-image-dims.js script)
- **Schema Validated**: Yes (all entries pass build validation)

## Next Steps

1. Bulk migration of additional images from SOURCE IMAGES
2. Create bulk import script for faster content entry creation
3. Develop tag taxonomy document for consistency
4. Consider automated alt text generation guidelines
