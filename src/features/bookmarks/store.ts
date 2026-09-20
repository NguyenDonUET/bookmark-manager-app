import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import seed from './seed.json';
import { normalizeBookmark, normalizeFaviconPath } from './normalize';

import type { Bookmark, BookmarkDraft, BookmarksView, SortOption } from './types';

interface BookmarksState {
  bookmarks: Bookmark[];
  view: BookmarksView;
  searchQuery: string;
  selectedTags: string[];
  sortBy: SortOption;

  addBookmark: (input: BookmarkDraft) => void;
  updateBookmark: (id: string, patch: Partial<Bookmark>) => void;
  deleteBookmark: (id: string) => void;
  togglePin: (id: string) => void;
  toggleArchive: (id: string) => void;
  recordVisit: (id: string) => void;

  setView: (view: BookmarksView) => void;
  setSearchQuery: (query: string) => void;
  toggleTag: (tag: string) => void;
  clearTags: () => void;
  setSortBy: (sort: SortOption) => void;
}

const initialBookmarks: Bookmark[] = seed.bookmarks.map((bookmark) =>
  normalizeBookmark(bookmark as Bookmark),
);

function createId(): string {
  return `bm-${crypto.randomUUID()}`;
}

export const useBookmarksStore = create<BookmarksState>()(
  persist(
    immer((set) => ({
      bookmarks: initialBookmarks,
      view: 'home',
      searchQuery: '',
      selectedTags: [],
      sortBy: 'recently-added',

      addBookmark: (input) =>
        set((state) => {
          const now = new Date().toISOString();
          state.bookmarks.unshift({
            id: createId(),
            title: input.title,
            url: input.url,
            favicon: normalizeFaviconPath(input.favicon),
            description: input.description,
            tags: input.tags,
            pinned: input.pinned ?? false,
            isArchived: input.isArchived ?? false,
            visitCount: 0,
            createdAt: now,
            lastVisited: null,
          });
        }),

      updateBookmark: (id, patch) =>
        set((state) => {
          const bookmark = state.bookmarks.find((item) => item.id === id);
          if (!bookmark) return;
          Object.assign(bookmark, patch);
          if (patch.favicon !== undefined) {
            bookmark.favicon = normalizeFaviconPath(patch.favicon);
          }
        }),

      deleteBookmark: (id) =>
        set((state) => {
          state.bookmarks = state.bookmarks.filter((item) => item.id !== id);
        }),

      togglePin: (id) =>
        set((state) => {
          const bookmark = state.bookmarks.find((item) => item.id === id);
          if (bookmark) bookmark.pinned = !bookmark.pinned;
        }),

      toggleArchive: (id) =>
        set((state) => {
          const bookmark = state.bookmarks.find((item) => item.id === id);
          if (bookmark) bookmark.isArchived = !bookmark.isArchived;
        }),

      recordVisit: (id) =>
        set((state) => {
          const bookmark = state.bookmarks.find((item) => item.id === id);
          if (!bookmark) return;
          bookmark.visitCount += 1;
          bookmark.lastVisited = new Date().toISOString();
        }),

      setView: (view) =>
        set((state) => {
          state.view = view;
        }),

      setSearchQuery: (query) =>
        set((state) => {
          state.searchQuery = query;
        }),

      toggleTag: (tag) =>
        set((state) => {
          const index = state.selectedTags.indexOf(tag);
          if (index === -1) state.selectedTags.push(tag);
          else state.selectedTags.splice(index, 1);
        }),

      clearTags: () =>
        set((state) => {
          state.selectedTags = [];
        }),

      setSortBy: (sort) =>
        set((state) => {
          state.sortBy = sort;
        }),
    })),
    {
      name: 'bookmarks-store',
      partialize: (state) => ({
        bookmarks: state.bookmarks,
        view: state.view,
        sortBy: state.sortBy,
        selectedTags: state.selectedTags,
        // searchQuery intentionally omitted — transient typing state
      }),
    },
  ),
);
