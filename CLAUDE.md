# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A single-page static resume site for Mark McLaughlin, built with [Eleventy](https://11ty.dev) and sourced from a [JSON Resume](https://jsonresume.org) schema document. Deployed to Netlify.

## Commands

Package manager is **pnpm** (v8, pinned via `packageManager`). Node version is **20** (`.node-version`).

- `pnpm start` — build SASS once, then run SASS watcher and Eleventy dev server in parallel (`ELEVENTY_ENV=development`).
- `pnpm build` — production build: compiles SASS → `dist/css`, runs Eleventy (`ELEVENTY_ENV=prod`), then minifies CSS via `lightningcss` (`postbuild` hook, enabled by `enable-pre-post-scripts=true` in `.npmrc`).
- `pnpm run build:eleventy` / `pnpm run build:sass` — run each step individually.
- `pnpm run webhint` — run webhint accessibility/best-practices check against the deployed site (`http://mark.mclaughlin.me.uk`), not the local build.

There is no test suite and no lint script. CI (`.github/workflows/node.js.yml`) only runs `pnpm install && pnpm build`.

## Architecture

Content, templates, and styles are separated so that resume updates never require touching templates:

- **Content** lives entirely in `src/_data/resume.json`, conforming to the JSON Resume v1.0.0 schema. Eleventy exposes it as the global `resume` variable in templates. Edit this file to update resume content.
- **Templates** use the **Liquid** engine. `src/index.liquid` is the single page; it extends `src/_includes/base.liquid` via front-matter `layout:`. Templates iterate `resume.work`, `resume.awards`, `resume.volunteer`, `resume.certificates`, `resume.projects` and use Liquid filters (`group_by`, `sort`, `sort_natural`, `reverse`, `slug`, `escape`) plus the custom `formatDate` filter.
- **Styles**: `src/sass/style.scss` compiled by `sass` CLI directly to `dist/css/style.css`, then minified in-place by `lightningcss` during `postbuild`. SASS is not processed through Eleventy.
- **Eleventy config** (`eleventy.config.mjs`):
  - `input: src`, `output: dist`.
  - Passthrough copies: `_headers`, `src/*.png`, `favicon.ico`, `site.webmanifest`.
  - Watch targets: `src/sass/` and `src/_data/` (so data/style edits trigger rebuilds in dev).
  - Custom filter `formatDate` uses `dayjs`.
  - A `prettier` transform formats every emitted `.html` file.
- **Environment switching**: `src/_data/env.js` exposes `process.env.ELEVENTY_ENV` as `env.environment`. `base.liquid` only injects Plausible analytics and the Google site-verification meta when `env.environment == "prod"`. The `start` script sets `development`; `build` sets `prod`.

## Conventions

- `<dd>` elements (in `#work`) and `<li>` elements (in `#awards`, `#volunteer`, `#certificates`) are given stable `id` attributes built from `slug`-filtered fields (e.g. `{{ group.name | slug }}--{{ r.position | slug }}-...`) to enable deep links. `<dt>` elements and the `#projects` `<dd>`s currently don't have ids — preserve and expand this pattern when adding sections.
- Emoji section headings use the "Noto Emoji" web font loaded with a `text=` subset in `style.scss`. When adding a new emoji heading, add that emoji to the `text=` list in the `@import url(...)` at the top of `src/sass/style.scss`, or it won't render in the intended font.
- `_headers` (Netlify) sets long-cache immutable headers on all assets and short cache on HTML; it is copied into `dist/` as a passthrough.
- The whole body uses `text-transform: lowercase` — content in `resume.json` can be written in natural case.

## Deployment

- **Netlify** builds from `netlify.toml` (`pnpm run build`, `PNPM_VERSION = "8"`), serving `dist/`.
- GitHub Actions only verifies the build passes on push/PR; it does not deploy.
