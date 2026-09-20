import { useBookmarksStore } from '../store';

import type { Bookmark, SortOption } from '../types';

function compareBySort(a: Bookmark, b: Bookmark, sortBy: SortOption): number {
  switch (sortBy) {
    case 'recently-visited': {
      const aTime = a.lastVisited ? Date.parse(a.lastVisited) : 0;
      const bTime = b.lastVisited ? Date.parse(b.lastVisited) : 0;
      return bTime - aTime;
    }
    case 'most-visited':
      return b.visitCount - a.visitCount;
    case 'recently-added':
    default:
      return Date.parse(b.createdAt) - Date.parse(a.createdAt);
  }
}

/**
 * Derives the visible list from raw bookmarks + filter inputs.
 * Keeps computed view out of store state.
 */
export function useFilteredBookmarks(): Bookmark[] {
  const bookmarks = useBookmarksStore((s) => s.bookmarks);
  const view = useBookmarksStore((s) => s.view);
  const searchQuery = useBookmarksStore((s) => s.searchQuery);
  const selectedTags = useBookmarksStore((s) => s.selectedTags);
  const sortBy = useBookmarksStore((s) => s.sortBy);

  const query = searchQuery.trim().toLowerCase();

  const filtered = bookmarks.filter((bookmark) => {
    if (view === 'home' && bookmark.isArchived) return false;
    if (view === 'archived' && !bookmark.isArchived) return false;

    if (query && !bookmark.title.toLowerCase().includes(query)) return false;

    if (selectedTags.length > 0) {
      const hasAllSelected = selectedTags.every((tag) => bookmark.tags.includes(tag));
      if (!hasAllSelected) return false;
    }

    return true;
  });

  return [...filtered].sort((a, b) => {
    // Pinned first on home view only
    if (view === 'home' && a.pinned !== b.pinned) {
      return a.pinned ? -1 : 1;
    }
    return compareBySort(a, b, sortBy);
  });
}

/** Unique tags across all bookmarks (including archived). */
export function useAllTags(): string[] {
  const bookmarks = useBookmarksStore((s) => s.bookmarks);
  const tags = new Set<string>();
  for (const bookmark of bookmarks) {
    for (const tag of bookmark.tags) tags.add(tag);
  }
  return [...tags].sort((a, b) => a.localeCompare(b));
}
