# DESIGN.md — mark.mclaughlin.me.uk

A single-page static résumé site. The aesthetic is deliberately terminal-coded: monospace system fonts, a coral accent that reads like a prompt, electric-blue links that invert on hover, and a global `lowercase` transform that makes even proper nouns feel like shell output. Minimalist and content-first, with no decorative chrome beyond a subtle dot-grid background.

---

## 1. Visual Theme & Atmosphere

**Mood:** Technical, calm, high-contrast. Feels like a well-configured terminal or a code editor with a light theme. Every typographic choice reinforces the developer/designer persona without being gimmicky.

**Key signals:**
- Monospace everywhere — font choice is the single loudest design statement.
- Global `text-transform: lowercase` on the body; headings and structural labels (`dt`, footer) are `uppercase`. The contrast between the two creates visual rhythm without extra weight.
- Pixel-art icons for section headings (32 × 32 px, `@iconify-json/pixel`) — lo-fi and charming, never distracting.
- Blinking block cursor after the summary paragraph, 1.333 s animation — the one piece of motion on the page.
- Flat. No shadows, no cards, no gradients beyond the background texture.

---

## 2. Color Palette & Roles

All colors are declared as CSS custom properties with a Display P3 wide-gamut primary and sRGB fallback.

| Token | Display P3 | sRGB Fallback | Role |
|---|---|---|---|
| `--color-primary` | `color(display-p3 1 0.32 0.285)` | `#ff5249` | Headings, section icons, borders, blinking cursor, link hover backgrounds |
| `--color-link` | `color(display-p3 0 0.25 1 / 1)` | `#0040ff` | Body links (resting), link hover/focus backgrounds |
| `--color-background` | `color(display-p3 0.98 0.98 0.98)` | `#f8f9fa` | Page background |
| `--opacity-muted` | — | `0.6` | Dates and separator glyphs (applied via `opacity`) |
| `--border-radius` | — | `2px` | All rounded corners |

**White** (`#ffffff`) appears only as the foreground color on hover/focus interactive states — it is not a named token but is hardcoded in those rules.

Body text is unset (inherits browser default near-black on the near-white background). There are no explicit neutral tokens because the monochrome body text is intentional.

---

## 3. Typography Rules

**Font family (single stack, applied to `body`):**
```
ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono",
"Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro",
"Fira Mono", "Droid Sans Mono", "Courier New", monospace
```

No web fonts are loaded. The stack resolves to the best available system monospace font.

| Element | Size | Weight | Transform | Color | Notes |
|---|---|---|---|---|---|
| `h1` | `1.5rem` | 500 | `uppercase` | `--color-primary` | Name / page title |
| `h2` | inherits | — | — | `--color-primary` | Replaced visually by a 32 px pixel-art icon; text is `.sr-only` |
| `h3` | `0.85rem` | 500 | `lowercase` (inherits) | inherits | Role/position labels |
| `dt` | inherits | 600 | `uppercase` | inherits | Company / entity group headings |
| Body (≥768 px) | `0.85rem` | 400 | `lowercase` | inherits | — |
| Body (<768 px) | `1rem` | 400 | `lowercase` | inherits | Larger tap-friendly size |
| `footer` | inherits | 400 | `uppercase` | inherits | Copyright and social links |
| `figcaption` | inherits | 600 | `uppercase` | inherits | Quote attribution |

**Line height:** `1.333rem` (applied to `body`; used as the animation timing unit too).

**Anti-aliasing:** `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale`

---

## 4. Component Stylings

### Links
- **Resting:** `color: --color-link`, `text-decoration: none`
- **Hover:** background `--color-link`, text `#fff`, padding `0.125rem 0.33rem`, margin `-0.125rem -0.33rem` (optical compensation), `border-radius: 2px`, `box-decoration-break: clone` (for multi-line wraps)
- **Focus-visible:** same as hover plus `outline: 2px solid --color-link; outline-offset: 2px`

### Section headings (`h2`)
Icon-only: a 32 × 32 px pixel SVG from the `pixel:` Iconify set. Text content is present in the DOM as `.sr-only` for accessibility. Color inherits `currentColor` from `--color-primary`.

Available section icons: `pixel:briefcase` (work), `pixel:trophy` (awards), `pixel:heart` (volunteer), `pixel:badge-check` (certificates), `pixel:book` (publications), `pixel:lightbulb` (patents), `pixel:folder` (projects).

### Definition lists (`<dl>`, `<dt>`, `<dd>`)
- `dt`: `text-transform: uppercase; font-weight: 600; margin-top: 1.5rem`
- `dd`: `display: flex; flex-direction: row; gap: 1rem; margin: 0`
- Work section `dt` is additionally indented by `3.1rem` to align with the year column in `dd`.
- At ≥768 px, the Projects `dl` switches to a 2-column grid (`grid-template-columns: 1fr 1fr; column-gap: 2rem`) with `dt` spanning both columns.

### Lists (`<ul>`, `<li>`)
- `list-style-type: none; padding-left: 0; margin-left: 0`
- `li`: `display: flex; flex-direction: row; gap: 1rem`

### Sections
- `margin-top: 4rem` for vertical rhythm between every section.

### Date / muted text
- `opacity: 0.6` via `.muted` class or `time` element selector inside `section`.

### Figure / blockquote
- `margin: 2rem 0`
- `blockquote`: `border-left: 1px solid --color-primary; margin-left: 0.25rem; padding-left: 0.75rem`
- `figcaption`: `font-weight: 600; text-transform: uppercase`

### Footer
- `border-top: 1px solid --color-primary; padding-top: 1rem; text-transform: uppercase`
- Social icon links are 20 × 20 px inline SVGs, vertically middle-aligned.
- Footer `a` hover/focus: `height: 24px; padding: 4px; margin: -4px; border-radius: 2px`

### Blinking cursor (summary paragraph)
- `p#summary::after`: inline 0.5em × 1em block, `background-color: --color-primary`, `animation: cursor-blink 1.333s steps(2) infinite`

---

## 5. Layout Principles

**Column model:** The page is a single centred column. Max-width narrows progressively as the viewport widens, keeping line lengths comfortable.

| Breakpoint | Max-width | Padding |
|---|---|---|
| ≥ 992 px | `44vw` | `2rem 3rem` |
| 768–991 px | `60vw` | `2rem 2rem` |
| 576–767 px | `80vw` | `2rem 1rem` |
| < 576 px | `100vw` | `2rem 1rem` |

**Spacing scale (used in context, not a separate token system):**

| Usage | Value |
|---|---|
| Section gap | `4rem` |
| `dt` top margin | `1.5rem` |
| `h3` top margin | `0.5rem` |
| Figure margin | `2rem 0` |
| Gap inside `li` / `dd` | `1rem` |
| Footer top padding | `1rem` |
| Inline social icon gap | `0.5rem` |
| Link hover padding | `0.125rem 0.33rem` |

**Background texture:** `radial-gradient(circle, color-mix(in srgb, currentColor 12%, transparent) 1px, transparent 1px)` tiled at `16px 16px`. Creates an unobtrusive dot grid that reinforces the grid/terminal aesthetic.

---

## 6. Depth & Elevation

There are **no shadows**. The design is entirely flat. Surface hierarchy is established exclusively through:
- Typography weight and case (`uppercase` labels vs `lowercase` body)
- Opacity (muted dates at 0.6)
- Color (primary accent for headings and structural borders)
- Whitespace (4 rem section gaps)

Do not add `box-shadow` or `drop-shadow` to any element.

---

## 7. Do's and Don'ts

### Do
- Use the monospace system font stack for all text, including any new components.
- Apply `text-transform: lowercase` to all new body-level content; `uppercase` only for structural labels (`dt`, `footer`, headings).
- Keep interactive highlight states consistent: white text on `--color-link` background with `border-radius: 2px` and `box-decoration-break: clone`.
- Add `rel="external noopener noreferrer" target="_blank"` to all outbound links except footer profile links (which use `rel="me"`).
- Prefix `<dt>` ids in new `<dl>` sections to avoid clashes: e.g. `work--{slug}`, `projects--{slug}`.
- Use `opacity: 0.6` (`.muted`) for secondary information like dates and separators rather than a separate grey colour.
- Use `pixel:` icons exclusively for section headings; pick from the declared subset in `astro.config.mjs`.

### Don't
- Don't load web fonts. The entire typographic system runs on system monospace.
- Don't use border-radius values other than `2px` (`--border-radius`).
- Don't add shadows, cards, or elevated surfaces.
- Don't use `text-transform: capitalize` on visible text (it's reserved for `.sr-only` to fix screen-reader pronunciation).
- Don't introduce new accent colours. The palette is intentionally minimal: one warm accent, one cool link colour, one near-white background.
- Don't add `text-decoration: underline` to links; hover highlight is the only affordance.
- Don't inject analytics scripts or third-party resources outside the `isProd` guard in `Layout.astro`.

---

## 8. Responsive Behavior

**Breakpoints:**

| Name | Range | Notes |
|---|---|---|
| Mobile | < 576 px | Full width, 1rem font, `dd > span` forced block |
| Tablet-sm | 576–767 px | 80vw, footer switches to `flex-direction: row` |
| Tablet-lg | 768–991 px | 60vw, projects grid activates |
| Desktop | ≥ 992 px | 44vw, smallest font size (0.85rem) |

**Projects grid:** At ≥ 768 px the projects `<dl>` renders as `grid-template-columns: 1fr 1fr` with `<dt>` spanning both columns (`grid-column: 1 / -1`).

**Footer:** Single column (stacked) on mobile; `display: flex; justify-content: space-between` at ≥ 575 px.

**Work `dt` indent:** `calc(3.1rem - 2px)` at ≥ 768 px; `calc(3.5rem - 2px)` on mobile to maintain year-column alignment.

**Touch targets:** Social icon links in the footer expand to `24 × 24 px` on hover/focus via negative margin compensation. Minimum 44 px touch targets should be maintained for any new interactive elements added on mobile.

---

## 9. Agent Prompt Guide

**Colour references (use these names in prompts):**
- `primary` = coral/red accent `#ff5249`
- `link` = electric blue `#0040ff`
- `background` = off-white `#f8f9fa`

**Quick prompts:**

> "Add a new résumé section matching the existing work section style: `<dl>` with `uppercase dt` headings prefixed `{section}--{slug}`, and `flex-row dd` items with a muted date column on the left."

> "Add a new icon-only `h2` using a `pixel:` icon. Include `.sr-only` text for the label. Colour inherits `--color-primary` via `currentColor`."

> "Style a new link consistent with the site: no underline at rest; on hover, white text on `--color-link` background with `padding: 0.125rem 0.33rem`, `margin: -0.125rem -0.33rem`, `border-radius: 2px`, and `box-decoration-break: clone`."

> "Adjust this component for the mobile breakpoint (<576 px): increase font to 1rem, set `line-height: 1.6rem` on list items."
