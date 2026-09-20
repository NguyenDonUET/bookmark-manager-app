import { IconArchive, IconHomeLine } from '@/components/icons';
import { Logo } from '@/components/ui/logo';
import { NavbarItem } from '@/components/ui/navbar-item';
import { useBookmarksStore } from '@/features/bookmarks/store';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const view = useBookmarksStore((s) => s.view);
  const setView = useBookmarksStore((s) => s.setView);

  return (
    <div className={cn('flex h-full flex-col gap-300 p-200', className)}>
      <div className="px-050">
        <Logo />
      </div>

      <nav className="gap-050 flex flex-col" aria-label="Primary">
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

      <div className="flex flex-1 flex-col gap-150">
        <p className="text-preset-5 text-muted-foreground px-150 font-medium tracking-wide uppercase">
          Tags
        </p>
        <p className="text-preset-4 text-muted-foreground px-150">Tag filters coming soon.</p>
      </div>
    </div>
  );
}
