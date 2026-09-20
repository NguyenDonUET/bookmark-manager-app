import { useDeferredValue, useMemo } from 'react';

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

interface FilteredBookmarksResult {
  bookmarks: Bookmark[];
  /** True while the urgent searchQuery is ahead of the deferred filter input. */
  isStale: boolean;
  /** Based on the deferred query — matches what the list is showing. */
  hasActiveSearch: boolean;
}

/**
 * Derives the visible list from raw bookmarks + filter inputs.
 * Search filtering uses a deferred query so the input can stay urgent.
 */
export function useFilteredBookmarks(): FilteredBookmarksResult {
  const bookmarks = useBookmarksStore((s) => s.bookmarks);
  const view = useBookmarksStore((s) => s.view);
  const searchQuery = useBookmarksStore((s) => s.searchQuery);
  const selectedTags = useBookmarksStore((s) => s.selectedTags);
  const sortBy = useBookmarksStore((s) => s.sortBy);

  const deferredQuery = useDeferredValue(searchQuery);
  const query = deferredQuery.trim().toLowerCase();
  const isStale = searchQuery.trim() !== deferredQuery.trim();
  const hasActiveSearch = deferredQuery.trim().length > 0;

  const filtered = useMemo(() => {
    const next = bookmarks.filter((bookmark) => {
      if (view === 'home' && bookmark.isArchived) return false;
      if (view === 'archived' && !bookmark.isArchived) return false;

      if (query && !bookmark.title.toLowerCase().includes(query)) return false;

      if (selectedTags.length > 0) {
        const hasAllSelected = selectedTags.every((tag) => bookmark.tags.includes(tag));
        if (!hasAllSelected) return false;
      }

      return true;
    });

    return next.sort((a, b) => {
      if (view === 'home' && a.pinned !== b.pinned) {
        return a.pinned ? -1 : 1;
      }
      return compareBySort(a, b, sortBy);
    });
  }, [bookmarks, view, query, selectedTags, sortBy]);

  return { bookmarks: filtered, isStale, hasActiveSearch };
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
