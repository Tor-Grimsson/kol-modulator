# Agent Context

## Current State

### Active Work
- Frequency Modulator apparatus wired up and rendering
- Typography system v1.1 (stable)
- Modulator loads as default view

### Recent Changes
- Wired Frequency Modulator into `src/components/modulator/`
- Added GSAP dependency for wave animation
- Adapted typography classes from mono-all → active mono variant
- Created .gitignore, connected favicon

## Project Overview

**Kolkrabbi Design System** - Typography-focused design system using JetBrains Mono

### Key Files
- `design-system/typography/mono/kol-typography-mono.css` - Main typography CSS
- `design-system/typography/mono/kol-typography-mono.md` - Typography documentation
- `design-system/components/components.css` - Component styles (btn-control, slider-black, control-slider-minimal)
- `design-system/theme.css` - Imports color + typography, defines spacing/radius/shadow tokens
- `src/components/modulator/` - Frequency Modulator apparatus (4 files)
- `src/components/styleguide/Typography.jsx` - Interactive styleguide
- `src/App.jsx` - Entry point, view-based routing (modulator default)

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

### Typography Mapping (mono-all → mono)
- `kol-mono-xs` → `kol-helper-xs` (12px, weight 500)
- `kol-mono-text` → `kol-text-sm` (12-16px, weight 400)

### Naming
- Use consistent size scales: xl, lg, md, sm, xs, xxs, xxxs
- Avoid creating duplicate classes - use Tailwind utilities for variants

### Code Style
- Prefer editing existing files over creating new ones
- Remove unused code completely (no backwards-compatibility hacks)
- Use clamp() for responsive typography
- Document weight hierarchy in header comments
- Package manager: **Yarn** (not npm)
