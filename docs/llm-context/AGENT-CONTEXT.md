# Agent Context

## Current State

### Active Work
- Typography system cleanup completed (v1.1)
- Mono typography using JetBrains Mono
- Weight hierarchy: SemiBold (600) for display, Medium (500) for headings/helpers, Regular (400) for text

### Recent Changes
- Removed unused font-face declarations (Bold 700, Light 300, Italic 400)
- Removed duplicate/legacy classes (kol-display-section-sm, kol-text-md-rg, kol-text)
- Updated documentation to match streamlined CSS

## Project Overview

**Kolkrabbi Design System** - Typography-focused design system using JetBrains Mono

### Key Files
- `design-system/typography/mono/kol-typography-mono.css` - Main typography CSS
- `design-system/typography/mono/kol-typography-mono.md` - Typography documentation
- `src/components/styleguide/Typography.jsx` - Interactive styleguide

### Font Files
Located in `/fonts/jetbrains-mono/`:
- JetBrainsMono-Regular.woff2 (400)
- JetBrainsMono-Medium.woff2 (500)
- JetBrainsMono-MediumItalic.woff2 (500 italic)
- JetBrainsMono-SemiBold.woff2 (600)

## Conventions

### Typography Classes
- **Display** (`.kol-display-*`) - Hero/section headings, weight 600
- **Heading** (`.kol-heading-*`) - Content headings, weight 500
- **Text** (`.kol-text-*`) - Body copy, weight 400
- **Helper** (`.kol-helper-*`) - Labels/metadata, weight 500

### Naming
- Use consistent size scales: xl, lg, md, sm, xs, xxs, xxxs
- Avoid creating duplicate classes - use Tailwind utilities for variants
- Keep legacy names only when necessary for backwards compatibility

### Code Style
- Prefer editing existing files over creating new ones
- Remove unused code completely (no backwards-compatibility hacks)
- Use clamp() for responsive typography
- Document weight hierarchy in header comments
