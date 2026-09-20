import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * Form input chrome — aligned with Button secondary / Textarea field tokens:
 * border-neutral-400, focus-visible:shadow-focus-ring, text-preset-4, rounded-md.
 * Invalid via aria-invalid (red border + error focus ring).
 *
 * Note: prefer `p-075` / `pt-075 pb-075` over `py-075` (Tailwind emission quirk).
 */
const inputVariants = cva(
  [
    'flex w-full min-w-0',
    'rounded-md border border-neutral-400 bg-neutral-0',
    'text-preset-4 text-neutral-900',
    'placeholder:text-neutral-500',
    'transition-colors outline-none',
    'focus-visible:border-neutral-300 focus-visible:shadow-focus-ring',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-50',
    'aria-invalid:border-destructive',
    'aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:shadow-focus-ring-error',
    'file:inline-flex file:border-0 file:bg-transparent file:text-preset-4 file:font-medium file:text-neutral-900',
    'dark:border-neutral-400 dark:bg-neutral-800 dark:text-neutral-0',
    'dark:placeholder:text-neutral-100',
    'dark:focus-visible:border-neutral-500 dark:focus-visible:shadow-focus-ring-dark',
    'dark:disabled:bg-neutral-600',
    'dark:aria-invalid:border-destructive',
    'dark:aria-invalid:focus-visible:shadow-focus-ring-error',
    'dark:file:text-neutral-0',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'px-150 py-125',
        md: 'px-200 py-150',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  },
);

/** Omit native HTML `size` (number) so CVA `size` (`"sm" | "md"`) can own the prop. */
interface InputProps
  extends
    Omit<React.ComponentPropsWithoutRef<'input'>, 'size'>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', size = 'sm', ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      data-size={size ?? undefined}
      className={cn(inputVariants({ size, className }))}
      {...props}
    />
  ),
);
Input.displayName = 'Input';

export { Input, inputVariants };
export type { InputProps };
