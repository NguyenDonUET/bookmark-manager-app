import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * Form textarea chrome — aligned with Button secondary / Input field tokens:
 * border-neutral-400, focus-visible:shadow-focus-ring, text-preset-4, rounded-md.
 * Invalid via aria-invalid (red border + error focus ring).
 */
const textareaVariants = cva(
  [
    'flex w-full field-sizing-content min-h-800 resize-y',
    'rounded-md border border-neutral-400 bg-neutral-0',
    'px-150 py-125',
    'text-preset-4 text-neutral-900',
    'placeholder:text-neutral-500',
    'transition-colors outline-none',
    'focus-visible:border-neutral-300 focus-visible:shadow-focus-ring',
    'disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-50',
    'aria-invalid:border-destructive',
    'aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:shadow-focus-ring-error',
    'dark:border-neutral-400 dark:bg-neutral-800 dark:text-neutral-0',
    'dark:placeholder:text-neutral-100',
    'dark:focus-visible:border-neutral-500 dark:focus-visible:shadow-focus-ring-dark',
    'dark:disabled:bg-neutral-600',
    'dark:aria-invalid:border-destructive',
    'dark:aria-invalid:focus-visible:shadow-focus-ring-error',
  ].join(' '),
);

interface TextareaProps
  extends React.ComponentPropsWithoutRef<'textarea'>, VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn(textareaVariants({ className }))}
      {...props}
    />
  ),
);
Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };
export type { TextareaProps };
