# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A single-page static resume site for Mark McLaughlin, built with [Astro](https://astro.build) and sourced from a [JSON Resume](https://jsonresume.org) schema document. Deployed to Netlify.

## Commands

Package manager is **pnpm** (v8, pinned via `packageManager`). Node version is **22** (`.node-version`); Astro 6 requires `>=22.12.0`.

- `pnpm dev` (alias `pnpm start`) — run the Astro dev server with HMR.
- `pnpm build` — production build; outputs to `dist/`.
- `pnpm preview` — serve the built `dist/` locally for a final smoke test.
- `pnpm check` — run `astro check` for type errors in `.astro` files.
- `pnpm webhint` — run webhint accessibility/best-practices check against the deployed site (`http://mark.mclaughlin.me.uk`), not the local build.

There is no test suite and no lint script. CI (`.github/workflows/node.js.yml`) only runs `pnpm install && pnpm build`.

## Architecture

Content, templates, and styles are separated so that resume updates never require touching templates:

- **Content** lives entirely in `src/_data/resume.json`, conforming to the JSON Resume v1.0.0 schema. It is imported directly by `src/pages/index.astro` and `src/layouts/Layout.astro`. Edit this file to update resume content. There is no content collection or schema validation — it's a plain JSON import.
- **Templates** are `.astro` files. `src/pages/index.astro` is the single page; it wraps its sections in `src/layouts/Layout.astro`. Each section iterates `resume.work`, `resume.awards`, `resume.volunteer`, `resume.certificates`, `resume.projects` using `.map()` and the helpers in `src/lib/helpers.ts`.
- **Helpers** (`src/lib/helpers.ts`): `formatDate` (dayjs), `slug` (uses the `slugify` package with Eleventy-compatible options for id parity), `groupBy` (order-preserving), `sortNatural` (Intl.Collator with `sensitivity: "base"`, `numeric: true`).
- **Styles**: `src/styles/style.scss` is compiled by Vite/Sass and injected as a hashed `<link>` by Astro.
- **Astro config** (`astro.config.mjs`): minimal; static output with the `astro-icon` integration enabled.
- **Environment switching**: `import.meta.env.PROD` is true during `astro build`, false during `astro dev`. `Layout.astro` only injects Plausible and the Google site-verification meta when `PROD` is true.
- **Third-party scripts**: Plausible and the Cloudflare beacon use `is:inline` so Astro emits them verbatim instead of trying to bundle them through Vite.

## Conventions

- `<dt>`, `<dd>`, and `<li>` ids are built from `slug()` in `src/lib/helpers.ts`. Because work `name` and project `entity` values overlap heavily (e.g. `Google`, `Microsoft`), the `<dl>`-based sections namespace their `<dt>` ids with a section prefix: `work--{slug(name)}`, `projects--{slug(entity)}`. Preserve this pattern — any new `<dl>` section that could share group-name values with another should prefix its `<dt>` ids.
- Work `<dd>` ids use a single hyphen between position and description, double hyphen between company and position: `{slug(name)}--{slug(position)}-{slug(description)}`.
- External links use `rel="external noopener noreferrer" target="_blank"`. Footer profile links use `rel="me"`.
- Section headings render an `astro-icon` `<Icon name="pixel:..." />` from `@iconify-json/pixel`. The `h2 svg` rule in `src/styles/style.scss` sizes them (32px); color inherits from `--color-primary` via `currentColor`. When adding a new section, pick an existing icon name from the `pixel` set — no font subset to update.
- `public/_headers` (Netlify) sets long-cache immutable headers on all assets and short cache on HTML. Astro copies everything under `public/` verbatim into `dist/`.
- The whole body uses `text-transform: lowercase` — content in `resume.json` can be written in natural case.
- `slug()` is configured to match Eleventy's default slug options (`lower: true`, `strict: false`, `remove: /[&,+()$~%.'":*?<>{}]/g`) so id attributes stay byte-identical to the previous Eleventy build. If you need to tune it, bear that parity goal in mind.

## Deployment

- **Netlify** builds from `netlify.toml` (`pnpm run build`, `NODE_VERSION = "20"`, `PNPM_VERSION = "8.15.4"` to match `packageManager` in `package.json`), publishing `dist/`. No adapter; this is a pure static build.
- GitHub Actions only verifies the build passes on push/PR; it does not deploy.
