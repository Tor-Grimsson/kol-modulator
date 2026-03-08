# Design System Extraction

This directory contains extracted design system assets from the kolkrabbi monorepo. The extraction process documents existing patterns before packaging for reuse in future projects.

## Purpose

Before packaging the design system for reuse, we need to understand:
- What actually exists in the current system
- What's being actively used vs. what's defined but unused
- What patterns have emerged through organic growth

## Directory Structure

```
design-system-extraction/
├── README.md                       # This file - extraction methodology
├── colors/                         # Phase 1: Color system ✓
│   ├── kol-color.md               # Human-readable color documentation
│   ├── kol-color.css              # Standalone CSS color tokens
│   ├── full/                      # Complete color tokens
│   └── usage-audit.md             # Usage analysis report
├── typography/                     # Phase 2: Typography ✓
│   ├── kol-typography-full.css    # Typography CSS
│   └── (font documentation)
├── components/                     # Phase 3: Components ✓
│   ├── 1-actions/                # Buttons, toggles, switches (4)
│   ├── 2-labels/                 # Pills, tags, badges (4)
│   ├── 3-selection/              # Dropdowns, selectors (4)
│   ├── 4-input/                  # Inputs, sliders (4)
│   ├── 5-navigation/             # Nav buttons, toggles (2)
│   ├── 6-overlays/               # (empty - future)
│   ├── 7-icons/                  # 221 SVG icons
│   └── components.css             # All component styles
└── 00-dont-touch/                # Original source files (read-only)
```

## Extraction Phases

### Phase 1: Colors ✓
- Extract color token definitions from `packages/ui/theme.css`
- Document all 97 tokens with light/dark mode pairs
- Create standalone CSS file with zero dependencies
- Audit actual usage across the codebase

### Phase 2: Typography ✓
- Extract typography tokens and utility classes
- Document font families, sizes, weights
- Audit typography usage patterns

### Phase 3: Components ✓
- Extract reusable component patterns (18 components)
- Document component structure and variants
- Organize by category (1-7)

### Phase 4: Packaging Decision (Next)
Based on audit insights:
- Decide what to package (only used tokens)
- Choose distribution format (NPM, Git, local)
- Create minimal viable package

## Source Files

**Primary sources (read-only):**
- `/packages/ui/theme.css` - Color token definitions
- `/packages/ui/css/components.css` - Component styles
- `/packages/ui/src/atoms/` - Component JSX (18 extracted)
- `/packages/ui/src/molecules/` - Molecule components
- `/packages/ui/src/icons/` - SVG icon assets

**Output:**
- `/design-system-extraction/colors/` - Color tokens
- `/design-system-extraction/typography/` - Typography CSS
- `/design-system-extraction/components/` - 18 extracted components + CSS

## Methodology

1. **Extract**: Parse source files to extract all token definitions
2. **Document**: Create human-readable markdown documentation
3. **Isolate**: Create standalone CSS with no dependencies
4. **Audit**: Search codebase for actual token usage
5. **Analyze**: Compare defined vs. used to identify gaps

## Key Findings

### Colors
- **Total tokens defined**: 97
- **Architecture**: Material Design 3-inspired
- **Features**: Light/dark mode pairs, context-aware remapping, WCAG compliant
- **Version**: 3.5 (2025-12-03)

### Components
- **Total extracted**: 18 components across 5 categories
- **Categories**: 1-actions (4), 2-labels (4), 3-selection (4), 4-input (4), 5-navigation (2)
- **CSS**: Unified `components.css` with category sections + dual prefixing (kol-* reference + plain for JSX)
- **Known issues**: 1-actions has CSS class prefix mismatches (JSX uses `btn-primary`, CSS defines `kol-btn-primary`)

See individual category READMEs for details.

## Test Import

To verify the standalone CSS works:

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Load in order -->
  <link rel="stylesheet" href="./design-system-extraction/colors/full/kol-color.css">
  <link rel="stylesheet" href="./design-system-extraction/typography/full/kol-typography-full.css">
  <link rel="stylesheet" href="./design-system-extraction/components/components.css">
  <style>
    body {
      background: var(--kol-surface-primary);
      color: var(--kol-surface-on-primary);
    }
  </style>
</head>
<body>
  <button class="btn-primary">Button</button>
  <span class="pill-outline">Pill</span>
  <input class="input-outline input-md" placeholder="Input">
  <button onclick="document.documentElement.setAttribute('data-theme', 'dark')">Dark Mode</button>
  <button onclick="document.documentElement.setAttribute('data-theme', 'light')">Light Mode</button>
</body>
</html>
```

## Version

Extracted: 2026-02-14
Source version: 3.5
# kol-modulator
