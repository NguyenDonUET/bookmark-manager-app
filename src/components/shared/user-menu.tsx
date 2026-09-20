import { IconLogOut01, IconPalette } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/stores/theme';

const DEFAULT_AVATAR_SRC = '/assets/images/image-avatar.webp';

interface UserMenuProps {
  name?: string;
  email?: string;
  avatarSrc?: string;
  className?: string;
  onLogout?: () => void;
}

/**
 * Account menu — avatar trigger opens profile, theme toggle, and logout.
 * Theme row keeps the menu open (`onSelect` prevented) so the toggle stays usable.
 */
export function UserMenu({
  name = 'Emily Carter',
  email = 'emily101@email.com',
  avatarSrc = DEFAULT_AVATAR_SRC,
  className,
  onLogout,
}: UserMenuProps) {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            'rounded-full outline-none',
            'focus-visible:shadow-focus-ring dark:focus-visible:shadow-focus-ring-dark',
            className,
          )}
          aria-label="Open account menu"
        >
          <Avatar size="lg" ringed>
            <AvatarImage src={avatarSrc} alt="" />
            <AvatarFallback>{initials || '?'}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="w-[240px] p-100">
        <div className="flex items-center gap-150 p-100">
          <Avatar size="md">
            <AvatarImage src={avatarSrc} alt="" />
            <AvatarFallback>{initials || '?'}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-preset-4 dark:text-neutral-0 truncate font-semibold text-neutral-900">
              {name}
            </p>
            <p className="text-preset-5 truncate text-neutral-500 dark:text-neutral-100">{email}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          leftIcon={<IconPalette size={16} />}
          rightIcon={
            <ThemeToggle
              value={theme}
              onValueChange={setTheme}
              onClick={(event) => event.stopPropagation()}
            />
          }
          onSelect={(event) => event.preventDefault()}
          className="font-medium text-neutral-600 dark:text-neutral-100"
        >
          Theme
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          leftIcon={<IconLogOut01 size={16} />}
          onSelect={() => onLogout?.()}
          className="font-medium text-neutral-600 dark:text-neutral-100"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export type { UserMenuProps };
