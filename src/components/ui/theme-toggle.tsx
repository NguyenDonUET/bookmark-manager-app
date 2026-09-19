import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';

import { IconMoon02, IconSun } from '@/components/icons';
import { cn } from '@/lib/utils';

type ThemeValue = 'light' | 'dark';

const themeToggleVariants = cva(
  // Theme-aware track: light mint (neutral-300) → dark teal (#00706e) under .dark
  'inline-flex items-center justify-center overflow-hidden rounded-4 bg-neutral-300 p-025',
);

const themeToggleItemVariants = cva(
  [
    // Figma segment: 30×26 (icon 14 + px 8 + py 6). py-075 is not emitted — use p-075 + px-100.
    'inline-flex shrink-0 items-center justify-center rounded-4 leading-none',
    'p-075 px-100',
    'text-neutral-900 outline-none transition-colors select-none',
    'dark:text-neutral-0',
    'focus-visible:shadow-focus-ring dark:focus-visible:shadow-focus-ring-dark',
    'disabled:pointer-events-none disabled:opacity-50',
  ].join(' '),
);

/** Active pill — token remaps under .dark (white → neutral-500 inset). */
const themeToggleItemActiveClassName = 'bg-theme-toggle-active';

interface ThemeToggleProps
  extends
    Omit<
      React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>,
      'type' | 'value' | 'defaultValue' | 'onValueChange'
    >,
    VariantProps<typeof themeToggleVariants> {
  value?: ThemeValue;
  defaultValue?: ThemeValue;
  onValueChange?: (value: ThemeValue) => void;
}

const ThemeToggle = React.forwardRef<
  React.ComponentRef<typeof ToggleGroupPrimitive.Root>,
  ThemeToggleProps
>(({ className, value, defaultValue = 'light', onValueChange, disabled, ...props }, ref) => {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState<ThemeValue>(defaultValue);
  const currentValue = isControlled ? value : uncontrolledValue;

  const handleValueChange = (next: string) => {
    // type="single" can emit "" when re-clicking the active item — keep a selection.
    if (next !== 'light' && next !== 'dark') return;
    if (!isControlled) setUncontrolledValue(next);
    onValueChange?.(next);
  };

  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      type="single"
      data-slot="theme-toggle"
      value={currentValue}
      onValueChange={handleValueChange}
      disabled={disabled}
      aria-label="Color theme"
      className={cn(themeToggleVariants(), className)}
      {...props}
    >
      <ToggleGroupPrimitive.Item
        value="light"
        data-slot="theme-toggle-item"
        aria-label="Light theme"
        className={cn(
          themeToggleItemVariants(),
          currentValue === 'light' && themeToggleItemActiveClassName,
        )}
      >
        <IconSun size={14} />
      </ToggleGroupPrimitive.Item>
      <ToggleGroupPrimitive.Item
        value="dark"
        data-slot="theme-toggle-item"
        aria-label="Dark theme"
        className={cn(
          themeToggleItemVariants(),
          currentValue === 'dark' && themeToggleItemActiveClassName,
        )}
      >
        <IconMoon02 size={14} />
      </ToggleGroupPrimitive.Item>
    </ToggleGroupPrimitive.Root>
  );
});
ThemeToggle.displayName = 'ThemeToggle';

export {
  ThemeToggle,
  themeToggleVariants,
  themeToggleItemVariants,
  themeToggleItemActiveClassName,
};
export type { ThemeToggleProps, ThemeValue };
