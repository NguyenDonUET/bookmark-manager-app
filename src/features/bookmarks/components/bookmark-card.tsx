import * as React from 'react';

import {
  IconArchive,
  IconCalendar,
  IconClock,
  IconCopy01,
  IconDotsVertical,
  IconEdit05,
  IconEye,
  IconLinkExternal01,
  IconPin01,
  IconTrash03,
} from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatBookmarkDate, getBookmarkHostname } from '@/features/bookmarks/lib/format';
import { cn } from '@/lib/utils';

import type { Bookmark } from '@/features/bookmarks/types';

interface BookmarkCardProps extends React.ComponentPropsWithoutRef<'article'> {
  bookmark: Bookmark;
  onTogglePin?: (id: string) => void;
  onToggleArchive?: (id: string) => void;
  onDelete?: (id: string) => void;
  onVisit?: (id: string) => void;
  onCopyUrl?: (id: string) => void;
  onEdit?: (id: string) => void;
}

const BookmarkCard = React.forwardRef<HTMLElement, BookmarkCardProps>(
  (
    {
      bookmark,
      className,
      onTogglePin,
      onToggleArchive,
      onDelete,
      onVisit,
      onCopyUrl,
      onEdit,
      ...props
    },
    ref,
  ) => {
    const hostname = getBookmarkHostname(bookmark.url);
    const createdLabel = formatBookmarkDate(bookmark.createdAt);
    const visitedLabel = formatBookmarkDate(bookmark.lastVisited);

    const handleCopy = async () => {
      if (onCopyUrl) {
        onCopyUrl(bookmark.id);
        return;
      }
      try {
        await navigator.clipboard.writeText(bookmark.url);
      } catch {
        // Clipboard may be unavailable (permissions / non-secure context).
      }
    };

    const handleVisit = () => {
      onVisit?.(bookmark.id);
      window.open(bookmark.url, '_blank', 'noopener,noreferrer');
    };

    return (
      <article
        ref={ref}
        data-slot="bookmark-card"
        className={cn(
          'border-border bg-card text-card-foreground rounded-12 flex h-full w-full min-w-0 flex-col border',
          className,
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center gap-150 p-250">
          <span
            className={cn(
              'border-border rounded-8 flex size-500 shrink-0 items-center justify-center overflow-hidden border',
              // Favicon well stays light in both themes (matches Figma)
              'bg-neutral-0',
            )}
          >
            <img
              src={bookmark.favicon}
              alt=""
              width={32}
              height={32}
              decoding="async"
              className="size-400 object-contain"
            />
          </span>

          <div className="min-w-0 flex-1">
            <h2 className="text-preset-3 dark:text-neutral-0 truncate font-semibold text-neutral-900">
              {bookmark.title}
            </h2>
            <p className="text-preset-5 truncate text-neutral-500 dark:text-neutral-100">
              {hostname}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="size-400 shrink-0"
                aria-label={`Actions for ${bookmark.title}`}
              >
                <IconDotsVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem leftIcon={<IconLinkExternal01 size={16} />} onSelect={handleVisit}>
                Open
              </DropdownMenuItem>
              <DropdownMenuItem
                leftIcon={<IconCopy01 size={16} />}
                onSelect={() => void handleCopy()}
              >
                Copy URL
              </DropdownMenuItem>
              <DropdownMenuItem
                leftIcon={<IconEdit05 size={16} />}
                onSelect={() => onEdit?.(bookmark.id)}
                disabled={!onEdit}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                leftIcon={<IconPin01 size={16} />}
                onSelect={() => onTogglePin?.(bookmark.id)}
              >
                {bookmark.pinned ? 'Unpin' : 'Pin'}
              </DropdownMenuItem>
              <DropdownMenuItem
                leftIcon={<IconArchive size={16} />}
                onSelect={() => onToggleArchive?.(bookmark.id)}
              >
                {bookmark.isArchived ? 'Unarchive' : 'Archive'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                leftIcon={<IconTrash03 size={16} />}
                onSelect={() => onDelete?.(bookmark.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Body — flex-1 so cards in a grid row share height regardless of content */}
        <div className="border-border flex flex-1 flex-col gap-200 border-t px-250 py-200">
          <p className="text-preset-4-medium line-clamp-3 font-medium text-neutral-800 dark:text-neutral-100">
            {bookmark.description}
          </p>

          {bookmark.tags.length > 0 ? (
            <ul className="flex flex-wrap gap-100" aria-label="Tags">
              {bookmark.tags.map((tag) => (
                <li
                  key={tag}
                  className={cn(
                    'rounded-8 py-050 px-150',
                    'text-preset-5 bg-neutral-100 font-medium text-neutral-600',
                    'dark:bg-neutral-600 dark:text-neutral-100',
                  )}
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Footer — eye / last visited / date added (Figma order) */}
        <div className="border-border mt-auto flex flex-wrap items-center gap-x-200 gap-y-100 border-t px-250 py-200">
          <span className="text-preset-5 gap-050 inline-flex items-center text-neutral-500 dark:text-neutral-100">
            <IconEye size={16} />
            <span className="sr-only">Views: </span>
            {bookmark.visitCount}
          </span>
          <span className="text-preset-5 gap-050 inline-flex items-center text-neutral-500 dark:text-neutral-100">
            <IconClock size={16} />
            <span className="sr-only">Last visited: </span>
            {visitedLabel}
          </span>
          <span className="text-preset-5 gap-050 inline-flex items-center text-neutral-500 dark:text-neutral-100">
            <IconCalendar size={16} />
            <span className="sr-only">Added: </span>
            {createdLabel}
          </span>
        </div>
      </article>
    );
  },
);
BookmarkCard.displayName = 'BookmarkCard';

export { BookmarkCard };
export type { BookmarkCardProps };
