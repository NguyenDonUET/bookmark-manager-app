import { Textarea } from '@/components/ui/textarea';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    'aria-invalid': { control: 'boolean' },
    rows: { control: 'number' },
    defaultValue: { control: 'text' },
  },
  args: {
    placeholder: 'Add a note…',
    disabled: false,
    'aria-invalid': false,
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 'A short note about this bookmark.',
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: 'Write a description…',
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 'This field is disabled.',
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    defaultValue: 'Missing required details.',
    'aria-invalid': true,
  },
};

export const LongContent: Story = {
  args: {
    defaultValue:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    rows: 6,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-400">
      <section className="flex flex-col gap-100" aria-label="Default">
        <h2 className="text-preset-4 font-semibold text-neutral-600 dark:text-neutral-100">
          Default
        </h2>
        <Textarea defaultValue="Filled textarea" aria-label="Default textarea" />
      </section>

      <section className="flex flex-col gap-100" aria-label="Placeholder">
        <h2 className="text-preset-4 font-semibold text-neutral-600 dark:text-neutral-100">
          Placeholder
        </h2>
        <Textarea placeholder="Add a note…" aria-label="Placeholder textarea" />
      </section>

      <section className="flex flex-col gap-100" aria-label="Disabled">
        <h2 className="text-preset-4 font-semibold text-neutral-600 dark:text-neutral-100">
          Disabled
        </h2>
        <Textarea defaultValue="Disabled" disabled aria-label="Disabled textarea" />
      </section>

      <section className="flex flex-col gap-100" aria-label="Invalid">
        <h2 className="text-preset-4 font-semibold text-neutral-600 dark:text-neutral-100">
          Invalid
        </h2>
        <Textarea defaultValue="Invalid value" aria-invalid aria-label="Invalid textarea" />
      </section>
    </div>
  ),
};
