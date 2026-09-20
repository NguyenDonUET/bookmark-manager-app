import { useState } from 'react';

import { IconPlus } from '@/components/icons';
import { UserMenu } from '@/components/shared/user-menu';
import { Button } from '@/components/ui/button';
import { BookmarkCard } from '@/features/bookmarks/components/bookmark-card';
import { BookmarkFormDialog } from '@/features/bookmarks/components/bookmark-form-dialog';
import { useFilteredBookmarks } from '@/features/bookmarks/hooks/useFilteredBookmarks';
import { faviconFromUrl } from '@/features/bookmarks/lib/bookmark-form';
import { useBookmarksStore } from '@/features/bookmarks/store';

import type { BookmarkFormValues } from '@/features/bookmarks/lib/bookmark-form';

type DialogState = { mode: 'add' } | { mode: 'edit'; bookmarkId: string } | null;

export function HomePage() {
  const view = useBookmarksStore((s) => s.view);
  const bookmarks = useFilteredBookmarks();
  const togglePin = useBookmarksStore((s) => s.togglePin);
  const toggleArchive = useBookmarksStore((s) => s.toggleArchive);
  const deleteBookmark = useBookmarksStore((s) => s.deleteBookmark);
  const recordVisit = useBookmarksStore((s) => s.recordVisit);
  const addBookmark = useBookmarksStore((s) => s.addBookmark);
  const updateBookmark = useBookmarksStore((s) => s.updateBookmark);

  const [dialog, setDialog] = useState<DialogState>(null);

  // Subscribe only when editing — derive bookmark during render
  const editingBookmark = useBookmarksStore((s) => {
    if (dialog?.mode !== 'edit') return undefined;
    return s.bookmarks.find((item) => item.id === dialog.bookmarkId);
  });

  const heading = view === 'home' ? 'All bookmarks' : 'Archived';
  const isDialogOpen = dialog !== null;
  const dialogMode = dialog?.mode ?? 'add';

  const handleSubmit = (values: BookmarkFormValues) => {
    if (dialog?.mode === 'edit') {
      updateBookmark(dialog.bookmarkId, {
        title: values.title,
        description: values.description,
        url: values.url,
        tags: values.tags,
        favicon: faviconFromUrl(values.url),
      });
      return;
    }

    addBookmark({
      title: values.title,
      description: values.description,
      url: values.url,
      tags: values.tags,
      favicon: faviconFromUrl(values.url),
    });
  };

  return (
    <div className="flex flex-col gap-300">
      <header className="flex flex-wrap items-start justify-between gap-200">
        <div className="gap-050 flex flex-col">
          <h1 className="text-preset-1 font-bold">{heading}</h1>
          <p className="text-muted-foreground text-preset-4">
            {bookmarks.length} bookmark{bookmarks.length === 1 ? '' : 's'}
          </p>
        </div>
        <div className="flex items-center gap-200">
          <Button type="button" onClick={() => setDialog({ mode: 'add' })}>
            <IconPlus />
            Add Bookmark
          </Button>
          <UserMenu />
        </div>
      </header>

      {bookmarks.length === 0 ? (
        <p className="text-muted-foreground text-preset-3">No bookmarks in this view.</p>
      ) : (
        <ul className="grid list-none grid-cols-1 gap-200 md:grid-cols-2 xl:grid-cols-3">
          {bookmarks.map((bookmark) => (
            <li key={bookmark.id} className="min-w-0 md:h-full">
              <BookmarkCard
                bookmark={bookmark}
                onTogglePin={togglePin}
                onToggleArchive={toggleArchive}
                onDelete={deleteBookmark}
                onVisit={recordVisit}
                onEdit={(id) => setDialog({ mode: 'edit', bookmarkId: id })}
              />
            </li>
          ))}
        </ul>
      )}

      <BookmarkFormDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) setDialog(null);
        }}
        mode={dialogMode}
        bookmark={dialogMode === 'edit' ? (editingBookmark ?? null) : null}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
