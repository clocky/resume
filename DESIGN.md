# DESIGN.md — mark.mclaughlin.me.uk

Terminal-coded résumé. Monospace system fonts, coral accent, electric-blue links that invert on hover, global `lowercase` body text. Flat, minimal, content-first.

## Colors

| Token | Value | Role |
|---|---|---|
| `--color-primary` | `#ff5249` | Headings, icons, borders, cursor |
| `--color-link` | `#0040ff` | Links; hover/focus background |
| `--color-background` | `#f8f9fa` | Page background |
| `--opacity-muted` | `0.6` | Dates and secondary text |
| `--border-radius` | `2px` | All rounded corners |

Wide-gamut displays get Display P3 values via `@supports`; the hex values above are the sRGB fallbacks.

## Typography

System monospace stack (`ui-monospace, Menlo, Monaco, …`). No web fonts.

- Body: `0.85rem` / `1rem` on mobile, `line-height: 1.333rem`, `text-transform: lowercase`
- `h1`: `1.5rem`, weight 500, `uppercase`, `--color-primary`
- `dt`: weight 600, `uppercase`
- `h2`: icon-only (32 px pixel SVG); label is `.sr-only`

## Interactions

Links have no underline. On hover/focus: white text on `--color-link` background, `padding: 0.125rem 0.33rem`, negative margin to compensate, `border-radius: 2px`, `box-decoration-break: clone`.

## Layout

Single centered column. Max-width scales with viewport: `44vw` on desktop, `60vw` tablet, `80vw` small tablet, `100vw` mobile. Sections spaced `4rem` apart. No shadows or elevation — hierarchy through type weight, case, and whitespace.

## Rules

- No web fonts, no shadows, no cards
- `border-radius` is always `2px`
- New `<dl>` sections must prefix `<dt>` ids: `{section}--{slug}`
- External links: `rel="external noopener noreferrer" target="_blank"`
- New section headings use `pixel:` icons from the declared subset in `astro.config.mjs`
