# namastedev-interview-practice-solutions

A collection of small React + TypeScript UI solutions and interview-practice components built with Vite.

## Contents

- `src/` — application source and pages.
- `src/solutions/` — individual solution examples (accordion, chip-input, progress-bar, etc.).
- `scripts/new-solution.mjs` — helper script to scaffold new solution folders.

## Quick Start

Prerequisites: Node.js (24+), and a package manager (`pnpm`, `npm`, or `yarn`).

Install dependencies:

```bash
yarn install
# or
npm install
```

Run the dev server:

```bash
yarn dev
# or
npm run dev
```

Build for production:

```bash
yarn build
yarn preview
```

## Project Structure

- [src](src) — React app entry and pages.
- [src/solutions](src/solutions) — each solution in its own folder with `index.tsx`, `meta.ts`, `README.md`, and `styles.css`.
- [scripts](scripts) — development utilities (scaffolding helpers).

## Contributing

1. Add a new folder under `src/solutions/` following the existing examples.
2. Include `index.tsx`, `meta.ts`, a short `README.md`, and `styles.css` if needed.
3. Run the dev server to preview your solution.

If you'd like, use `scripts/new-solution.mjs` to scaffold a new solution folder.

## License

This repository is licensed under the terms in the `LICENSE` file.
