import type { ReactNode } from 'react';

import { MobileHeader } from '@/components/layout/MobileHeader';
import { Sidebar } from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: ReactNode;
  className?: string;
}

/**
 * Responsive app chrome: persistent sidebar from `lg`, mobile header stub below.
 * Sidebar width is a layout placeholder until Figma measure is tokenized.
 */
export function AppShell({ children, className }: AppShellProps) {
  return (
    <div className={cn('bg-background text-foreground flex min-h-svh', className)}>
      <aside
        className="border-sidebar-border bg-sidebar hidden w-[17.5rem] shrink-0 border-r lg:block"
        aria-label="Sidebar"
      >
        <Sidebar />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <MobileHeader className="lg:hidden" />
        <main className="flex-1 p-200 md:p-300">{children}</main>
      </div>
    </div>
  );
}
