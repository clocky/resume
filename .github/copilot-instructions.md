# Copilot Instructions

## Project Overview

A single-page static resume site for Mark McLaughlin, built with [Astro](https://astro.build) and sourced from a [JSON Resume](https://jsonresume.org) v1.0.0 schema document. Deployed to Netlify as a pure static build.

## Key Files

| File / Path | Purpose |
|---|---|
| `src/_data/resume.json` | **The only content file.** All resume data lives here. Edit this to update the site. |
| `src/pages/index.astro` | Single page template; renders all resume sections via `.map()`. |
| `src/layouts/Layout.astro` | Wraps the page; renders `<head>`, `<header>`, `<footer>`, analytics. |
| `src/lib/helpers.ts` | `formatDate`, `slug`, `groupBy`, `sortNatural` utility functions. |
| `src/styles/style.scss` | All styles; compiled by Vite/Sass. Noto Emoji import is at the top. |
| `astro.config.mjs` | Minimal Astro config; static output, `astro-icon` integration only. |
| `netlify.toml` | Netlify build config (`pnpm run build`, Node 20, pnpm 8.15.4). |
| `public/_headers` | Netlify cache headers: long-cache for assets, short-cache for HTML. |

## Commands

Package manager is **pnpm** (v8, pinned). Node version is **20**.

```sh
pnpm install      # install dependencies
pnpm dev          # dev server with HMR (alias: pnpm start)
pnpm build        # production build → dist/
pnpm preview      # serve dist/ locally
pnpm check        # astro check — type errors in .astro files
```

There is **no test suite and no lint script**. CI only runs `pnpm install && pnpm build`. Always run `pnpm build` (and optionally `pnpm check`) to validate changes.

## Making Content Changes

Edit **only** `src/_data/resume.json`. The JSON conforms to the JSON Resume v1.0.0 schema plus a custom `meta` block (`canonical`, `version`, `lastModified`). There is no runtime schema validation.

Sections rendered: `work`, `awards`, `volunteer`, `certificates`, `publications`, `patents`, `projects`. The `references` section is commented out in `index.astro`.

## ID / Slug Conventions

IDs on `<dt>`, `<dd>`, `<li>` elements are built from `slug()` in `src/lib/helpers.ts`. The `slug()` function uses `slugify` with Eleventy-compatible options (`lower: true`, `strict: false`, `remove: /[&,+()$~%.'":*?<>{}]/g`) to keep ids byte-identical to the previous Eleventy build — **do not change these options**.

| Element | ID pattern |
|---|---|
| Work `<dt>` | `work--{slug(name)}` |
| Work `<dd>` | `{slug(name)}--{slug(position)}-{slug(description)}` |
| Project `<dt>` | `projects--{slug(entity)}` |
| Project `<dd>` | `projects--{slug(entity)}--{slug(name)}` |
| Volunteer `<li>` | `{slug(organization)}--{slug(position)}` |
| Awards / Certs | `{slug(title)}-{slug(awarder)}-{year}` |
| Patents | `{slug(number)}` |

**Rule:** Any new `<dl>` section whose group key could overlap with another section's group key **must** use a unique prefix on `<dt>` ids.

## Styling Rules

- All body text is `text-transform: lowercase` in CSS — write content in natural case in `resume.json`.
- Section headings are emoji rendered in the "Noto Emoji" web font, loaded with a `text=` subset at the top of `style.scss`. **When adding a new emoji heading, add that emoji to the `text=` parameter in the `@import url(...)` line.**
- Colors use P3 wide-gamut with sRGB fallback via `@supports`.

## Link Conventions

- External links: `rel="external noopener noreferrer" target="_blank"`.
- Footer social profile links: `rel="me"`.

## Environment / Analytics

- `import.meta.env.PROD` is `true` only during `astro build`. Plausible analytics and the Google site-verification `<meta>` are injected **only in production**.
- Plausible and the Cloudflare beacon scripts use `is:inline` so Astro emits them verbatim without Vite processing.
- `pnpm webhint` runs webhint against the **live deployed URL** (`http://mark.mclaughlin.me.uk`), not a local build.

## Icons

Footer profile icons use `astro-icon` with the `@iconify-json/pixel` icon set. The icon name is looked up in `networkIcons` in `Layout.astro`; unknown networks fall back to `pixel:{network.toLowerCase()}`.

## Architecture Constraints

- No Astro integrations beyond `astro-icon`. Keep `astro.config.mjs` minimal.
- No content collections, no schema validation layer — `resume.json` is imported directly.
- No test framework. Validate changes with `pnpm build` and `pnpm check`.
- Do not add or upgrade dependencies unless strictly necessary.
