# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A React + TypeScript + Vite gallery of small interview-practice UI solutions (accordion, chip-input, progress-bar, etc.), corresponding to problems on namastedev.com/practice. Each solution is a self-contained folder rendered inside a shared playground shell.

## Commands

Package manager is Yarn 4 (`packageManager: yarn@4.18.0` in package.json); npm works too.

```bash
yarn dev              # start Vite dev server
yarn build             # production build (tsc -b && vite build implicitly via vite build)
yarn preview           # preview the production build
yarn test              # run vitest once (--environment jsdom)
yarn new:solution <slug>   # scaffold a new solution folder under src/solutions/<slug>
```

There is no lint script and no test files currently exist in the repo, despite vitest/testing-library being installed as devDependencies.

To run a single test file once tests exist: `yarn vitest run path/to/file.test.tsx --environment jsdom`.

Node version is pinned via `.nvmrc` to 24.

## Architecture

### Auto-discovered solution registry

The core mechanism is [src/app/registry.ts](src/app/registry.ts), which uses `import.meta.glob` to auto-discover every folder under `src/solutions/*`:

- `index.tsx` - lazy-loaded via `import.meta.glob('../solutions/*/index.tsx')` (not eager - code-split per solution).
- `meta.ts` - eagerly imported, provides `SolutionMeta` (`title`, `difficulty`, `status`, `tags`, `description`).
- `README.md` - eagerly imported as raw text (`?raw` query), rendered via `marked` in the solution's "Readme" tab.
- `styles.css` - eagerly imported as raw text, injected into a shadow DOM per solution (see below).

Adding a new solution folder with these four files is enough for it to appear in the app automatically - no manual registration. Use `yarn new:solution <slug>` to scaffold one (creates `meta.ts`, `index.tsx`, `README.md`, `styles.css` from templates in [scripts/new-solution.mjs](scripts/new-solution.mjs)).

### Routing & pages

- [src/main.tsx](src/main.tsx) - app entry, wraps everything in MUI `ThemeProvider` + `HashRouter` (hash routing because the app is deployed to GitHub Pages).
- [src/app/App.tsx](src/app/App.tsx) - top-level layout/nav, defines routes: `/` (Home), `/s/:slug` (SolutionPage), `*` (NotFound).
- [src/app/pages/Home.tsx](src/app/pages/Home.tsx) - searchable/filterable grid of all solutions (search syncs to `?q=` URL param, arrow-key navigation, clickable tag/difficulty/status chips).
- [src/app/pages/SolutionPage.tsx](src/app/pages/SolutionPage.tsx) - looks up a solution by slug via `findSolution`, lazy-renders its component with `React.lazy`/`Suspense`, and shows a "Render" / "Readme" tab view.

### Solution isolation via Shadow DOM

[src/app/shared/PlaygroundShell.tsx](src/app/shared/PlaygroundShell.tsx) renders each solution's component inside an `attachShadow` shadow root (via a React portal), injecting a base reset stylesheet plus the solution's own `styles.css`. This keeps each solution's styles scoped and prevents them from leaking into (or being affected by) the host app's MUI theme/global CSS.

[src/app/shared/ErrorBoundary.tsx](src/app/shared/ErrorBoundary.tsx) wraps each rendered solution so one broken solution doesn't crash the whole app.

### Path aliases

`tsconfig.json` declares `@app/*`, `@shared/*`, `@solutions/*` path aliases pointing into `src/`, but `vite.config.ts` does not configure matching resolver aliases. In practice, existing code (e.g. `meta.ts` files) only uses `@app/*` for `import type` statements, which are erased at compile time and don't need bundler resolution - avoid using these aliases for runtime (value) imports unless a corresponding Vite alias is added.

### Deployment

GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) builds with Yarn 4 (via Corepack) and deploys `dist/` to GitHub Pages on every push to `main`, using `BASE_PATH=/namastedev-interview-practice-solutions/` for the Vite `base` config.

## Conventions for solution folders

Each folder in `src/solutions/<slug>/` follows a fixed shape:

- `index.tsx` - default-exported React component, no required props.
- `meta.ts` - default-exported `SolutionMeta` object (see shape above), typed via `import type { SolutionMeta } from '@app/registry'`.
- `README.md` - short description of approach/trade-offs, rendered in the UI's Readme tab.
- `styles.css` - scoped styles for the component, loaded into its shadow DOM (optional).

Formatting is enforced via Prettier ([prettier.config.ts](prettier.config.ts)): semicolons, single quotes, 2-space tabs, 140 print width, trailing commas everywhere.

### Implementing a solution (when the folder is already scaffolded)

`yarn new:solution <slug>` (or a user pasting a scaffold) produces four boilerplate files with a placeholder `Hello from <slug>!` component and `status: "WIP"`. To fill one in, apply this pattern directly - no need to open other solution folders to rediscover it:

- `index.tsx`: `import { type JSX, useState } from 'react'; import './styles.css';` then `export default function ComponentName(): JSX.Element { ... }`. Type `useState` generics explicitly (e.g. `useState<boolean>(false)`). Prefer controlled inputs (`checked`/`value` + `onChange`) over uncontrolled DOM access.
- `meta.ts`: flip `status` from `"WIP"` to `"Done"` once implemented, set `tags` to something like `["react", "component", "ui"]`, and write a one-sentence `description`.
- `README.md`: replace the placeholder with `# Title`, a short `## Description`, and an `## Approach`/`## Trade-offs` section - 10-20 lines is typical, not exhaustive spec documentation.
- `styles.css`: often pre-populated by the user before asking for the component - reuse the class names it already defines rather than inventing new ones.
- Verify with `yarn build` (runs `tsc -b`, catches type errors fast). Do not install Playwright/Chromium or spin up a browser to visually check these small components unless the user explicitly asks for a screenshot/visual verification - it's a large download for low-stakes CSS/markup and the user typically checks visually themselves via `yarn dev`.
