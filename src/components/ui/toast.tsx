import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Toast as ToastPrimitive } from 'radix-ui';

import { IconCheck, IconXClose } from '@/components/icons';
import { cn } from '@/lib/utils';

const ToastProvider = ({
  ...props
}: React.ComponentPropsWithoutRef<typeof ToastPrimitive.Provider>) => (
  <ToastPrimitive.Provider data-slot="toast-provider" {...props} />
);

const ToastViewport = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    data-slot="toast-viewport"
    className={cn(
      [
        'fixed inset-x-0 bottom-0 z-50 flex max-h-screen w-full flex-col gap-100 p-200',
        'outline-none',
        'sm:inset-x-auto sm:right-0 sm:bottom-0 sm:max-w-[420px]',
      ].join(' '),
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

/**
 * Toast chrome — Figma node 457:27970.
 * Success: white + teal check (light) / teal surface + white check (dark). Bare icons, no badge.
 */
const toastVariants = cva(
  [
    'group pointer-events-auto relative flex w-full items-center gap-150',
    'overflow-hidden rounded-8 border p-150',
    'text-preset-4 font-medium text-neutral-900',
    'shadow-md',
    'transition-all outline-none',
    'data-[swipe=cancel]:translate-x-0',
    'data-[swipe=end]:translate-x-(--radix-toast-swipe-end-x)',
    'data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x)',
    'data-[swipe=move]:transition-none',
    'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-full',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full',
    'data-[swipe=end]:animate-out',
    'dark:text-neutral-0',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'border-neutral-400 bg-neutral-0 dark:border-neutral-400 dark:bg-neutral-800',
        success: [
          'border-toast-success-border bg-toast-success',
          '[&_[data-slot=toast-close]]:text-neutral-500',
          'dark:[&_[data-slot=toast-close]]:text-neutral-100',
          'dark:[&_[data-slot=toast-close]]:hover:bg-teal-800',
          'dark:[&_[data-slot=toast-close]]:hover:text-neutral-0',
        ].join(' '),
        error: [
          'border-toast-error-border bg-toast-error',
          '[&_[data-slot=toast-close]]:text-neutral-500',
          'dark:[&_[data-slot=toast-close]]:text-neutral-0/80',
          'dark:[&_[data-slot=toast-close]]:hover:bg-red-800',
          'dark:[&_[data-slot=toast-close]]:hover:text-neutral-0',
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface ToastProps
  extends
    React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastVariants> {}

const Toast = React.forwardRef<React.ComponentRef<typeof ToastPrimitive.Root>, ToastProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <ToastPrimitive.Root
      ref={ref}
      data-slot="toast"
      data-variant={variant}
      className={cn(toastVariants({ variant, className }))}
      {...props}
    />
  ),
);
Toast.displayName = ToastPrimitive.Root.displayName;

interface ToastStatusIconProps extends React.ComponentPropsWithoutRef<'span'> {
  variant?: NonNullable<VariantProps<typeof toastVariants>['variant']>;
}

/**
 * Leading status glyph — bare stroke icon (Figma: no circular badge).
 * Colors via --toast-*-icon tokens (teal / white, destructive / white).
 */
const ToastStatusIcon = ({ variant = 'default', className, ...props }: ToastStatusIconProps) => {
  if (variant === 'default') {
    return null;
  }

  const isSuccess = variant === 'success';

  return (
    <span
      data-slot="toast-status-icon"
      data-variant={variant}
      aria-hidden
      className={cn(
        'inline-flex size-250 shrink-0 items-center justify-center',
        isSuccess ? 'text-toast-success-icon' : 'text-toast-error-icon',
        className,
      )}
      {...props}
    >
      {isSuccess ? <IconCheck size={20} /> : <IconXClose size={20} />}
    </span>
  );
};
ToastStatusIcon.displayName = 'ToastStatusIcon';

const ToastTitle = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    data-slot="toast-title"
    className={cn('text-preset-4 dark:text-neutral-0 font-semibold text-neutral-900', className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitive.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    data-slot="toast-description"
    className={cn('text-preset-4 text-neutral-600 dark:text-neutral-100', className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitive.Description.displayName;

const ToastAction = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    data-slot="toast-action"
    className={cn(
      [
        'inline-flex h-400 shrink-0 items-center justify-center rounded-md',
        'border border-neutral-400 bg-transparent px-150',
        'text-preset-4 font-semibold text-neutral-900',
        'transition-colors outline-none',
        'hover:bg-neutral-100',
        'focus-visible:shadow-focus-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        'dark:text-neutral-0 dark:border-neutral-400 dark:hover:bg-neutral-600',
        'dark:focus-visible:shadow-focus-ring-dark',
      ].join(' '),
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitive.Action.displayName;

const ToastClose = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    type="button"
    data-slot="toast-close"
    aria-label="Dismiss notification"
    className={cn(
      [
        'rounded-6 ml-auto inline-flex size-250 shrink-0 items-center justify-center',
        'text-neutral-500 transition-colors outline-none',
        'hover:bg-neutral-100 hover:text-neutral-900',
        'focus-visible:shadow-focus-ring',
        'dark:hover:text-neutral-0 dark:text-neutral-100 dark:hover:bg-neutral-600',
        'dark:focus-visible:shadow-focus-ring-dark',
      ].join(' '),
      className,
    )}
    toast-close=""
    {...props}
  >
    <IconXClose size={20} />
  </ToastPrimitive.Close>
));
ToastClose.displayName = ToastPrimitive.Close.displayName;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  ToastStatusIcon,
  toastVariants,
};
export type { ToastProps, ToastActionElement, ToastStatusIconProps };
