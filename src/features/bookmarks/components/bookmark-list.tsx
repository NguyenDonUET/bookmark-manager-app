import { BookmarkCard } from '@/features/bookmarks/components/bookmark-card';
import { useFilteredBookmarks } from '@/features/bookmarks/hooks/useFilteredBookmarks';
import { useBookmarksStore } from '@/features/bookmarks/store';
import { cn } from '@/lib/utils';

interface BookmarkListProps {
  onEdit: (id: string) => void;
}

/**
 * Heading, count, and filtered grid. Filters on a deferred search query
 * so urgent typing stays in the toolbar.
 */
export function BookmarkList({ onEdit }: BookmarkListProps) {
  const view = useBookmarksStore((s) => s.view);
  const { bookmarks, isStale, hasActiveSearch } = useFilteredBookmarks();
  const togglePin = useBookmarksStore((s) => s.togglePin);
  const toggleArchive = useBookmarksStore((s) => s.toggleArchive);
  const deleteBookmark = useBookmarksStore((s) => s.deleteBookmark);
  const recordVisit = useBookmarksStore((s) => s.recordVisit);

  const heading = view === 'home' ? 'All bookmarks' : 'Archived';

  return (
    <>
      <header className="gap-050 flex flex-col">
        <h1 className="text-preset-1 font-bold">{heading}</h1>
        <p className="text-muted-foreground text-preset-4">
          {bookmarks.length} bookmark{bookmarks.length === 1 ? '' : 's'}
        </p>
      </header>

      {bookmarks.length === 0 ? (
        <p className="text-muted-foreground text-preset-3">
          {hasActiveSearch ? 'No bookmarks match your search.' : 'No bookmarks in this view.'}
        </p>
      ) : (
        <ul
          className={cn(
            'grid list-none grid-cols-1 gap-200 md:grid-cols-2 xl:grid-cols-3',
            isStale && 'opacity-70 transition-opacity',
          )}
        >
          {bookmarks.map((bookmark) => (
            <li key={bookmark.id} className="min-w-0 md:h-full">
              <BookmarkCard
                bookmark={bookmark}
                onTogglePin={togglePin}
                onToggleArchive={toggleArchive}
                onDelete={deleteBookmark}
                onVisit={recordVisit}
                onEdit={onEdit}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
