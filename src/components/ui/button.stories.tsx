import { IconPlus } from '@/components/icons';
import { Button } from '@/components/ui/button';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'icon'],
    },
    disabled: { control: 'boolean' },
    asChild: { table: { disable: true } },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-400">
      <section className="flex flex-col gap-150" aria-label="Primary">
        <h2 className="text-preset-4 font-semibold text-neutral-600 dark:text-neutral-100">
          Primary
        </h2>
        <div className="flex flex-wrap items-center gap-150">
          <Button type="button" variant="default" size="sm">
            <IconPlus />
            Button CTA
            <IconPlus />
          </Button>
          <Button type="button" variant="default" size="md">
            <IconPlus />
            Button CTA
            <IconPlus />
          </Button>
          <Button type="button" variant="destructive" size="md">
            <IconPlus />
            Button CTA
            <IconPlus />
          </Button>
          <Button type="button" variant="default" size="md" disabled>
            <IconPlus />
            Disabled
            <IconPlus />
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-150" aria-label="Secondary">
        <h2 className="text-preset-4 font-semibold text-neutral-600 dark:text-neutral-100">
          Secondary
        </h2>
        <div className="flex flex-wrap items-center gap-150">
          <Button type="button" variant="secondary" size="sm">
            <IconPlus />
            Button CTA
            <IconPlus />
          </Button>
          <Button type="button" variant="secondary" size="md">
            <IconPlus />
            Button CTA
            <IconPlus />
          </Button>
          <Button type="button" variant="secondary" size="sm" aria-pressed>
            <IconPlus />
            Active
            <IconPlus />
          </Button>
          <Button type="button" variant="secondary" size="icon" aria-label="Add">
            <IconPlus />
          </Button>
          <Button type="button" variant="secondary" size="sm" disabled>
            <IconPlus />
            Disabled
            <IconPlus />
          </Button>
        </div>
      </section>
    </div>
  ),
};
