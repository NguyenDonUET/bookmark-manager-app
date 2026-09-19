import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex shrink-0 items-center justify-center gap-050',
    'rounded-md',
    'text-preset-3 font-semibold whitespace-nowrap',
    'transition-colors outline-none select-none',
    'disabled:pointer-events-none disabled:opacity-50',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-250",
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'border-2 border-neutral-0/12 bg-primary text-primary-foreground shadow-button-xs',
          'hover:bg-teal-800',
          'focus-visible:shadow-focus-ring',
        ].join(' '),
        destructive: [
          'border-2 border-neutral-0/12 bg-destructive text-primary-foreground shadow-button-xs',
          'hover:bg-destructive',
          'focus-visible:shadow-focus-ring-error',
        ].join(' '),
        secondary: [
          'border border-neutral-400 bg-neutral-0 text-neutral-900',
          'hover:border-neutral-400 hover:bg-neutral-100',
          'active:border-teal-700 active:text-teal-700',
          'aria-pressed:border-teal-700 aria-pressed:text-teal-700',
          'focus-visible:border-neutral-300 focus-visible:shadow-focus-ring',
          'dark:border-neutral-400 dark:bg-neutral-800 dark:text-neutral-0',
          'dark:hover:border-neutral-500 dark:hover:bg-neutral-600',
          'dark:active:border-neutral-0 dark:active:text-neutral-0',
          'dark:aria-pressed:border-neutral-0 dark:aria-pressed:text-neutral-0',
          'dark:focus-visible:border-neutral-500 dark:focus-visible:shadow-focus-ring-dark',
        ].join(' '),
      },
      size: {
        sm: 'px-150 py-125',
        md: 'px-200 py-150',
        icon: 'size-400 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  },
);

interface ButtonProps
  extends React.ComponentPropsWithoutRef<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'sm', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'button';

    return (
      <Comp
        ref={ref}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
export type { ButtonProps };
