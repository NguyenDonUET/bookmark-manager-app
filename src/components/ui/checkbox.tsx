import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';

import { IconCheck } from '@/components/icons';
import { cn } from '@/lib/utils';

const checkboxVariants = cva(
  [
    'peer relative flex shrink-0 items-center justify-center',
    'size-200 rounded-4',
    'border border-neutral-400 bg-neutral-0',
    'text-primary-foreground',
    'transition-colors outline-none select-none',
    'hover:border-neutral-500',
    'focus-visible:border-teal-700 focus-visible:shadow-focus-ring',
    'dark:border-neutral-400 dark:bg-neutral-800',
    'dark:hover:border-neutral-300',
    'dark:focus-visible:border-neutral-300 dark:focus-visible:shadow-focus-ring-dark',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    'data-checked:border-teal-700 data-checked:bg-teal-700',
    'data-checked:hover:border-teal-700 data-checked:hover:bg-teal-800',
    'dark:data-checked:border-teal-700 dark:data-checked:bg-teal-700',
    'dark:data-checked:hover:bg-teal-800',
    'aria-invalid:border-destructive',
    'aria-invalid:focus-visible:shadow-focus-ring-error',
    'aria-invalid:data-checked:border-destructive aria-invalid:data-checked:bg-destructive',
  ].join(' '),
);

/** Indeterminate fill — no `data-indeterminate` token variant in shadcn/tailwind.css */
const checkboxIndeterminateClassName =
  'border-teal-700 bg-teal-700 hover:border-teal-700 hover:bg-teal-800';

interface CheckboxProps
  extends
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

const Checkbox = React.forwardRef<React.ComponentRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, checked, ...props }, ref) => {
    const isIndeterminate = checked === 'indeterminate';

    return (
      <CheckboxPrimitive.Root
        ref={ref}
        data-slot="checkbox"
        checked={checked}
        className={cn(
          checkboxVariants(),
          isIndeterminate && checkboxIndeterminateClassName,
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="grid place-content-center text-current"
        >
          {isIndeterminate ? (
            <span
              aria-hidden
              className="h-025 block w-125 rounded-full bg-current"
              data-slot="checkbox-indeterminate-mark"
            />
          ) : (
            <IconCheck size={12} />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  },
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox, checkboxVariants };
export type { CheckboxProps };
