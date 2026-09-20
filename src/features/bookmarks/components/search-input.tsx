import * as React from 'react';

import { IconSearchMd } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import type { InputProps } from '@/components/ui/input';

interface SearchInputProps extends Omit<
  React.ComponentPropsWithoutRef<'input'>,
  'type' | 'size' | 'value' | 'onChange'
> {
  value: string;
  onValueChange: (value: string) => void;
  size?: InputProps['size'];
  className?: string;
}

/**
 * Title search field — Input + leading search icon.
 * Controlled; store wiring stays in the consumer.
 */
const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      onValueChange,
      size = 'sm',
      className,
      placeholder = 'Search by title...',
      disabled,
      id,
      'aria-label': ariaLabel = 'Search by title',
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn('relative min-w-0', className)}>
        <IconSearchMd
          size={20}
          className={cn(
            'pointer-events-none absolute top-1/2 left-150 -translate-y-1/2',
            'text-neutral-500 dark:text-neutral-100',
            disabled && 'opacity-50',
          )}
          aria-hidden
        />
        <Input
          ref={ref}
          id={id}
          type="search"
          size={size}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          aria-label={ariaLabel}
          className={cn(
            // icon (20) + left-150 inset + gap-100 ≈ spacing-500
            'pl-500',
            // hide native WebKit search cancel so chrome stays consistent
            '[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden',
          )}
          onChange={(event) => onValueChange(event.target.value)}
          {...props}
        />
      </div>
    );
  },
);
SearchInput.displayName = 'SearchInput';

export { SearchInput };
export type { SearchInputProps };
