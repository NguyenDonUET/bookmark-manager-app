import { useId } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { useTagInventory } from '@/features/bookmarks/hooks/useFilteredBookmarks';
import { useBookmarksStore } from '@/features/bookmarks/store';
import { cn } from '@/lib/utils';

interface TagFilterListProps {
  className?: string;
}

/**
 * Sidebar tag multi-select. AND-filters via `selectedTags` / `toggleTag`.
 * Count badges are static totals across the whole collection.
 */
export function TagFilterList({ className }: TagFilterListProps) {
  const idPrefix = useId();
  const tags = useTagInventory();
  const selectedTags = useBookmarksStore((s) => s.selectedTags);
  const toggleTag = useBookmarksStore((s) => s.toggleTag);

  if (tags.length === 0) {
    return (
      <p className={cn('text-preset-4 text-muted-foreground px-150', className)}>No tags yet.</p>
    );
  }

  return (
    <div
      role="group"
      aria-labelledby={`${idPrefix}-heading`}
      className={cn('flex min-h-0 flex-1 flex-col gap-150', className)}
    >
      <p
        id={`${idPrefix}-heading`}
        className="text-preset-5 text-muted-foreground shrink-0 px-150 font-medium tracking-wide uppercase"
      >
        Tags
      </p>

      <ul className="scrollbar-thin gap-050 flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
        {tags.map(({ name, count }) => {
          const inputId = `${idPrefix}-${name}`;
          const checked = selectedTags.includes(name);

          return (
            <li key={name}>
              <div className="rounded-8 flex items-center gap-100 px-150 py-125">
                <Checkbox id={inputId} checked={checked} onCheckedChange={() => toggleTag(name)} />
                <label
                  htmlFor={inputId}
                  className="flex min-w-0 flex-1 cursor-pointer items-center gap-150"
                >
                  <span className="text-preset-3 dark:text-neutral-0 min-w-0 flex-1 truncate font-medium text-neutral-800">
                    {name}
                  </span>
                  <span
                    className={cn(
                      'inline-flex size-250 shrink-0 items-center justify-center rounded-full',
                      'text-preset-5 bg-neutral-300 font-medium text-neutral-600',
                      'dark:bg-neutral-600 dark:text-neutral-100',
                    )}
                    aria-label={`${count} bookmark${count === 1 ? '' : 's'}`}
                  >
                    {count}
                  </span>
                </label>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
