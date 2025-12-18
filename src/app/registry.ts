import type { ComponentType, LazyExoticComponent } from 'react';
import React from 'react';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Status = 'Done' | 'WIP';

export interface SolutionMeta {
  title: string;
  tags?: string[];
  status?: Status;
  description?: string;
  difficulty?: Difficulty;
}

export interface SolutionEntry {
  slug: string;
  css?: string;
  title: string;
  readme?: string;
  meta?: SolutionMeta;
  Component?: LazyExoticComponent<ComponentType<any>>;
  import: () => Promise<{ default: ComponentType<any> }>;
}

const componentGlobs = import.meta.glob('../solutions/*/index.tsx');

const metaGlobs = import.meta.glob('../solutions/*/meta.ts', { eager: true }) as Record<string, { default?: SolutionMeta }>;

const readmeGlobs = import.meta.glob('../solutions/*/README.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const cssGlobs = import.meta.glob('../solutions/*/styles.css', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function pathToSlug(path: string) {
  const parts = path.split('/');
  const i = parts.indexOf('solutions');
  return parts[i + 1];
}

const registry: SolutionEntry[] = Object.entries(componentGlobs).map(([path, importer]) => {
  const slug = pathToSlug(path);
  const metaKey = `../solutions/${slug}/meta.ts`;
  const readmeKey = `../solutions/${slug}/README.md`;
  const cssKey = `../solutions/${slug}/styles.css`;

  const meta = metaGlobs[metaKey]?.default;
  const readme = readmeGlobs[readmeKey];
  const css = cssGlobs[cssKey];

  return {
    slug,
    title: meta?.title ?? slug,
    import: importer as SolutionEntry['import'],
    meta,
    readme,
    css,
  };
});

registry.sort((a, b) => a.title.localeCompare(b.title));

export function getAllSolutions() {
  return registry;
}

export function findSolution(slug: string) {
  return registry.find((s) => s.slug === slug);
}

export function getLazyComponent(entry: SolutionEntry) {
  if (!entry.Component) entry.Component = React.lazy(entry.import);
  return entry.Component;
}
