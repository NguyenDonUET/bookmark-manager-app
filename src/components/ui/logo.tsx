import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const LOGO_LIGHT = '/assets/images/logo-light-theme.svg';
const LOGO_DARK = '/assets/images/logo-dark-theme.svg';

const logoVariants = cva('inline-flex shrink-0', {
  variants: {
    size: {
      /** Figma / starter export: 214×32 */
      md: 'h-400',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

interface LogoProps
  extends React.ComponentPropsWithoutRef<'span'>, VariantProps<typeof logoVariants> {
  /**
   * Which asset to render.
   * - `auto` — swaps via `.dark` (Storybook theme toolbar / app dark class)
   * - `light` | `dark` — force a single asset
   */
  theme?: 'auto' | 'light' | 'dark';
  /** Accessible name for the brand mark. */
  alt?: string;
}

const Logo = React.forwardRef<HTMLSpanElement, LogoProps>(
  ({ className, size = 'md', theme = 'auto', alt = 'Bookmark Manager', ...props }, ref) => {
    const showLight = theme === 'auto' || theme === 'light';
    const showDark = theme === 'auto' || theme === 'dark';

    return (
      <span
        ref={ref}
        data-slot="logo"
        data-theme={theme}
        role="img"
        aria-label={alt}
        className={cn(logoVariants({ size }), className)}
        {...props}
      >
        {showLight ? (
          <img
            src={LOGO_LIGHT}
            alt=""
            width={214}
            height={32}
            decoding="async"
            className={cn('h-full w-auto', theme === 'auto' && 'dark:hidden')}
          />
        ) : null}
        {showDark ? (
          <img
            src={LOGO_DARK}
            alt=""
            width={214}
            height={32}
            decoding="async"
            className={cn('h-full w-auto', theme === 'auto' ? 'hidden dark:block' : undefined)}
          />
        ) : null}
      </span>
    );
  },
);
Logo.displayName = 'Logo';

export { Logo, logoVariants, LOGO_LIGHT, LOGO_DARK };
export type { LogoProps };
