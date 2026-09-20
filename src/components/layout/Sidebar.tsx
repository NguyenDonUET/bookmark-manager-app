import { IconArchive, IconHomeLine } from '@/components/icons';
import { Logo } from '@/components/ui/logo';
import { NavbarItem } from '@/components/ui/navbar-item';
import { TagFilterList } from '@/features/bookmarks/components/tag-filter-list';
import { useBookmarksStore } from '@/features/bookmarks/store';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const view = useBookmarksStore((s) => s.view);
  const setView = useBookmarksStore((s) => s.setView);

  return (
    <div className={cn('flex h-full min-h-0 flex-col gap-300 p-200', className)}>
      <div className="px-050 shrink-0">
        <Logo />
      </div>

      <nav className="gap-050 flex shrink-0 flex-col" aria-label="Primary">
        <NavbarItem
          type="button"
          variant={view === 'home' ? 'active' : 'default'}
          aria-current={view === 'home' ? 'true' : undefined}
          onClick={() => setView('home')}
        >
          <IconHomeLine />
          Home
        </NavbarItem>
        <NavbarItem
          type="button"
          variant={view === 'archived' ? 'active' : 'default'}
          aria-current={view === 'archived' ? 'true' : undefined}
          onClick={() => setView('archived')}
        >
          <IconArchive />
          Archived
        </NavbarItem>
      </nav>

      <TagFilterList className="min-h-0 flex-1" />
    </div>
  );
}
