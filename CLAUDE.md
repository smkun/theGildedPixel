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

## Session Summary - 2025-10-16

**Tasks Completed:**
- [x] Design PRD.md structure and content (Planning)
- [x] Design PLANNING.md with architecture and decisions (Planning)
- [x] Design TASKS.md with realistic milestones (Planning)
- [x] Design CLAUDE.md with project behavioral rules (Planning)

**Tasks In Progress:**
- [ ] Initialize Astro project with TypeScript template (M1.1)

**Decisions Made:**
- Use Astro 4.x with built-in astro:assets for image optimization
- Content Collections with Markdown frontmatter for content management
- Pure CSS masonry layout (no JS library)
- Island-based architecture for interactive components (<90KB total JS)

**Blockers/Issues:**
- None - planning phase complete

**Next Session Priorities:**
1. Initialize Astro project (`npm create astro@latest`)
2. Configure astro.config.mjs and tailwind.config.js
3. Set up Content Collections schema
4. Create directory structure per PLANNING.md
5. Add sample images for testing
