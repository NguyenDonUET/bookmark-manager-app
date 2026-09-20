import { IconPlus } from '@/components/icons';
import { UserMenu } from '@/components/shared/user-menu';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/features/bookmarks/components/search-input';
import { useBookmarksStore } from '@/features/bookmarks/store';

interface BookmarkToolbarProps {
  onAdd: () => void;
}

/**
 * Search + primary actions. Owns the searchQuery subscription so typing
 * does not re-render the bookmark grid via the page shell.
 */
export function BookmarkToolbar({ onAdd }: BookmarkToolbarProps) {
  const searchQuery = useBookmarksStore((s) => s.searchQuery);
  const setSearchQuery = useBookmarksStore((s) => s.setSearchQuery);

  return (
    <div className="flex flex-wrap items-center gap-200">
      <SearchInput value={searchQuery} onValueChange={setSearchQuery} className="min-w-0 flex-1" />
      <div className="flex shrink-0 items-center gap-200">
        <Button type="button" onClick={onAdd}>
          <IconPlus />
          Add Bookmark
        </Button>
        <UserMenu />
      </div>
    </div>
  );
}
