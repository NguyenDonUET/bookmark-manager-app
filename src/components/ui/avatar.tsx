import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Avatar as AvatarPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

/**
 * Circular avatar — sizes map to spacing tokens (sm 24 / md 32 / lg 40).
 * `ringed` matches the Figma header trigger (teal outer + background offset).
 */
const avatarVariants = cva(
  [
    'group/avatar relative flex shrink-0 overflow-hidden rounded-full select-none',
    'after:absolute after:inset-0 after:rounded-full after:border after:border-border',
    'dark:after:mix-blend-lighten after:mix-blend-darken',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'size-300',
        md: 'size-400',
        lg: 'size-500',
      },
      ringed: {
        true: 'ring-2 ring-primary ring-offset-2 ring-offset-background',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      ringed: false,
    },
  },
);

interface AvatarProps
  extends
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<React.ComponentRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ className, size = 'md', ringed = false, ...props }, ref) => (
    <AvatarPrimitive.Root
      ref={ref}
      data-slot="avatar"
      data-size={size}
      data-ringed={ringed ? '' : undefined}
      className={cn(avatarVariants({ size, ringed, className }))}
      {...props}
    />
  ),
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    data-slot="avatar-image"
    className={cn('aspect-square size-full rounded-full object-cover', className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    data-slot="avatar-fallback"
    className={cn(
      [
        'flex size-full items-center justify-center rounded-full',
        'bg-muted text-preset-5 text-muted-foreground font-semibold',
        'group-data-[size=lg]/avatar:text-preset-4',
      ].join(' '),
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback, avatarVariants };
export type { AvatarProps };
