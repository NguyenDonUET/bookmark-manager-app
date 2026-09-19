import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

/**
 * Sidebar nav leaf (Figma Navbar item — node 268:6674).
 * Default / hover / active use palette tokens; sidebar chrome is expected as the parent.
 * Figma MCP was rate-limited — visual values inferred from preview + sidebar token roles.
 */
const navbarItemVariants = cva(
  [
    'inline-flex w-full items-center gap-150 rounded-8 px-150 py-125',
    'text-preset-4 font-medium whitespace-nowrap',
    'transition-colors outline-none select-none',
    'focus-visible:shadow-focus-ring dark:focus-visible:shadow-focus-ring-dark',
    'disabled:pointer-events-none disabled:opacity-50',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-250",
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'bg-transparent text-neutral-600',
          'hover:bg-neutral-300 hover:text-neutral-900',
          'data-highlighted:bg-neutral-300 data-highlighted:text-neutral-900',
          'dark:text-neutral-100',
          'dark:hover:bg-neutral-600 dark:hover:text-neutral-0',
          'dark:data-highlighted:bg-neutral-600 dark:data-highlighted:text-neutral-0',
        ].join(' '),
        active: [
          'bg-neutral-300 font-semibold text-neutral-900',
          'dark:bg-neutral-600 dark:text-neutral-0',
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface NavbarItemProps
  extends React.ComponentPropsWithoutRef<'button'>, VariantProps<typeof navbarItemVariants> {
  asChild?: boolean;
}

const NavbarItem = React.forwardRef<HTMLButtonElement, NavbarItemProps>(
  ({ className, variant = 'default', asChild = false, type, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'button';
    const isActive = variant === 'active';

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : (type ?? 'button')}
        data-slot="navbar-item"
        data-variant={variant}
        aria-current={isActive ? 'page' : undefined}
        className={cn(navbarItemVariants({ variant, className }))}
        {...props}
      />
    );
  },
);
NavbarItem.displayName = 'NavbarItem';

export { NavbarItem, navbarItemVariants };
export type { NavbarItemProps };
