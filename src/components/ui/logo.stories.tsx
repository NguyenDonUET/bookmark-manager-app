import { Logo } from '@/components/ui/logo';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['auto', 'light', 'dark'],
    },
    size: {
      control: 'select',
      options: ['md'],
    },
    alt: { control: 'text' },
  },
  args: {
    theme: 'auto',
    size: 'md',
    alt: 'Bookmark Manager',
  },
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Auto: Story = {
  args: { theme: 'auto' },
};

export const Light: Story = {
  args: { theme: 'light' },
};

export const Dark: Story = {
  args: { theme: 'dark' },
  decorators: [
    (Story) => (
      <div className="rounded-8 bg-neutral-900 p-200">
        <Story />
      </div>
    ),
  ],
};

export const AllThemes: Story = {
  render: () => (
    <div className="flex flex-col gap-400">
      <section className="flex flex-col gap-150" aria-label="Light theme asset">
        <h2 className="text-preset-4 font-semibold text-neutral-600 dark:text-neutral-100">
          Theme=Light
        </h2>
        <Logo theme="light" />
      </section>
      <section
        className="rounded-8 flex flex-col gap-150 bg-neutral-900 p-200"
        aria-label="Dark theme asset"
      >
        <h2 className="text-preset-4 font-semibold text-neutral-100">Theme=Dark</h2>
        <Logo theme="dark" />
      </section>
      <section className="flex flex-col gap-150" aria-label="Auto (follows .dark)">
        <h2 className="text-preset-4 font-semibold text-neutral-600 dark:text-neutral-100">
          Theme=Auto (toolbar)
        </h2>
        <Logo theme="auto" />
      </section>
    </div>
  ),
};
