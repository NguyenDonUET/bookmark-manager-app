import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastStatusIcon,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps, ReactNode } from 'react';

type ToastVariant = NonNullable<ComponentProps<typeof Toast>['variant']>;

/**
 * Radix Toast must sit under Provider + Viewport. Force open for visual review.
 */
function ToastPreview({
  variant = 'default',
  title,
  description,
  children,
}: {
  variant?: ToastVariant;
  title?: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <ToastProvider swipeDirection="right" duration={Infinity}>
      <div className="relative min-h-1000 w-full max-w-[420px]">
        <Toast open variant={variant}>
          {children ?? (
            <>
              <ToastStatusIcon variant={variant} />
              <div className="gap-025 flex min-w-0 flex-1 flex-col">
                {title ? <ToastTitle>{title}</ToastTitle> : null}
                {description ? <ToastDescription>{description}</ToastDescription> : null}
              </div>
              <ToastClose />
            </>
          )}
        </Toast>
        <ToastViewport className="absolute inset-0 p-0 sm:max-w-none" />
      </div>
    </ToastProvider>
  );
}

const meta = {
  title: 'UI/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'error'],
    },
    open: { control: 'boolean' },
  },
  args: {
    variant: 'default',
    open: true,
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <ToastPreview variant={args.variant ?? 'default'} title="Notification message" />
  ),
};

export const Success: Story = {
  args: { variant: 'success' },
  render: () => <ToastPreview variant="success" title="Bookmark added successfully." />,
};

export const Error: Story = {
  args: { variant: 'error' },
  render: () => <ToastPreview variant="error" title="Something went wrong. Please try again." />,
};

export const WithDescription: Story = {
  args: { variant: 'success' },
  render: () => (
    <ToastPreview
      variant="success"
      title="Bookmark added successfully."
      description="You can find it on your home page."
    />
  ),
};

export const AllVariants: Story = {
  globals: { theme: 'light' },
  render: () => (
    <div className="flex flex-col gap-400">
      <section className="flex flex-col gap-150" aria-label="Theme=Light">
        <h2 className="text-preset-4 font-semibold text-neutral-600">Theme=Light</h2>
        <ToastPreview variant="success" title="Bookmark added successfully." />
      </section>
      <section
        className="dark rounded-8 flex flex-col gap-150 bg-neutral-900 p-200"
        aria-label="Theme=Dark"
      >
        <h2 className="text-preset-4 font-semibold text-neutral-100">Theme=Dark</h2>
        <ToastPreview variant="success" title="Bookmark added successfully." />
      </section>
    </div>
  ),
};

export const Interactive: Story = {
  render: function InteractiveToast() {
    const [open, setOpen] = useState(false);
    const [variant, setVariant] = useState<ToastVariant>('success');

    return (
      <ToastProvider swipeDirection="right" duration={4000}>
        <div className="flex flex-wrap gap-150">
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={() => {
              setVariant('success');
              setOpen(false);
              requestAnimationFrame(() => setOpen(true));
            }}
          >
            Show success
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => {
              setVariant('error');
              setOpen(false);
              requestAnimationFrame(() => setOpen(true));
            }}
          >
            Show error
          </Button>
        </div>
        <Toast open={open} onOpenChange={setOpen} variant={variant}>
          <ToastStatusIcon variant={variant} />
          <div className="gap-025 flex min-w-0 flex-1 flex-col">
            <ToastTitle>
              {variant === 'error'
                ? 'Something went wrong. Please try again.'
                : 'Bookmark added successfully.'}
            </ToastTitle>
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
  },
};
