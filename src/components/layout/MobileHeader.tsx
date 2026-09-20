import { IconMenu01 } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { cn } from '@/lib/utils';

interface MobileHeaderProps {
  className?: string;
}

/**
 * Mobile top bar. Menu opens a sheet later — button is intentionally inert for now.
 */
export function MobileHeader({ className }: MobileHeaderProps) {
  return (
    <header
      className={cn(
        'border-border flex items-center justify-between gap-200 border-b px-200 py-150',
        className,
      )}
    >
      <Logo />
      <Button
        type="button"
        variant="secondary"
        size="icon"
        aria-label="Open navigation menu"
        aria-haspopup="dialog"
        aria-expanded={false}
        disabled
        title="Navigation menu coming soon"
      >
        <IconMenu01 />
      </Button>
    </header>
  );
}
