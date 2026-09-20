import { useState } from 'react';

import { BookmarkFormDialog } from '@/features/bookmarks/components/bookmark-form-dialog';
import { BookmarkList } from '@/features/bookmarks/components/bookmark-list';
import { BookmarkToolbar } from '@/features/bookmarks/components/bookmark-toolbar';
import { faviconFromUrl } from '@/features/bookmarks/lib/bookmark-form';
import { useBookmarksStore } from '@/features/bookmarks/store';

import type { BookmarkFormValues } from '@/features/bookmarks/lib/bookmark-form';

type DialogState = { mode: 'add' } | { mode: 'edit'; bookmarkId: string } | null;

export function HomePage() {
  const addBookmark = useBookmarksStore((s) => s.addBookmark);
  const updateBookmark = useBookmarksStore((s) => s.updateBookmark);

  const [dialog, setDialog] = useState<DialogState>(null);

  // Subscribe only when editing — derive bookmark during render
  const editingBookmark = useBookmarksStore((s) => {
    if (dialog?.mode !== 'edit') return undefined;
    return s.bookmarks.find((item) => item.id === dialog.bookmarkId);
  });

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
      <BookmarkToolbar onAdd={() => setDialog({ mode: 'add' })} />
      <BookmarkList onEdit={(id) => setDialog({ mode: 'edit', bookmarkId: id })} />
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
