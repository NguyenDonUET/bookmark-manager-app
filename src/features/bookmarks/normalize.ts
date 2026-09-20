import type { Bookmark } from './types';

/** Seed paths use `./assets/...`; Vite serves them from `/assets/...`. */
export function normalizeFaviconPath(favicon: string): string {
  if (favicon.startsWith('./')) return favicon.slice(1);
  if (favicon.startsWith('assets/')) return `/${favicon}`;
  return favicon;
}

export function normalizeBookmark(bookmark: Bookmark): Bookmark {
  return {
    ...bookmark,
    favicon: normalizeFaviconPath(bookmark.favicon),
  };
}
