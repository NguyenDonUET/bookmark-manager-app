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
 * Shell owns the viewport (`h-full` under locked `#root`); pages scroll inside `<main>`.
 * Sidebar width is a layout placeholder until Figma measure is tokenized.
 */
export function AppShell({ children, className }: AppShellProps) {
  return (
    <div
      className={cn('bg-background text-foreground flex h-full min-h-0 overflow-hidden', className)}
    >
      <aside
        className="border-sidebar-border bg-sidebar hidden h-full min-h-0 w-[17.5rem] shrink-0 overflow-hidden border-r lg:block"
        aria-label="Sidebar"
      >
        <Sidebar />
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <MobileHeader className="shrink-0 lg:hidden" />
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden p-200 md:p-300">
          {children}
        </main>
      </div>
    </div>
  );
}
