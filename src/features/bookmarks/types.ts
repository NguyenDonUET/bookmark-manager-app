export interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon: string;
  description: string;
  tags: string[];
  pinned: boolean;
  isArchived: boolean;
  visitCount: number;
  createdAt: string;
  /** ISO timestamp, or null when never visited. */
  lastVisited: string | null;
}

export type BookmarksView = 'home' | 'archived';

export type SortOption = 'recently-added' | 'recently-visited' | 'most-visited';

export type BookmarkDraft = Omit<
  Bookmark,
  'id' | 'visitCount' | 'createdAt' | 'lastVisited' | 'pinned' | 'isArchived'
> & {
  pinned?: boolean;
  isArchived?: boolean;
};
