import { Input } from '@/components/ui/input';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'url', 'password', 'search', 'file'],
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    'aria-invalid': { control: 'boolean' },
    defaultValue: { control: 'text' },
  },
  args: {
    size: 'sm',
    type: 'text',
    placeholder: 'Enter a value…',
    disabled: false,
    'aria-invalid': false,
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 'https://example.com',
    'aria-label': 'Default input',
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: 'Paste a bookmark URL…',
    'aria-label': 'Placeholder input',
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 'This field is disabled.',
    disabled: true,
    'aria-label': 'Disabled input',
  },
};

export const Invalid: Story = {
  args: {
    defaultValue: 'not-a-valid-url',
    'aria-invalid': true,
    'aria-label': 'Invalid input',
  },
};

export const SizeMd: Story = {
  args: {
    size: 'md',
    defaultValue: 'Medium size',
    'aria-label': 'Medium input',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-400">
      <section className="flex flex-col gap-100" aria-label="Default">
        <h2 className="text-preset-4 font-semibold text-neutral-600 dark:text-neutral-100">
          Default
        </h2>
        <Input defaultValue="Filled input" aria-label="Default input" />
      </section>

      <section className="flex flex-col gap-100" aria-label="Placeholder">
        <h2 className="text-preset-4 font-semibold text-neutral-600 dark:text-neutral-100">
          Placeholder
        </h2>
        <Input placeholder="Paste a bookmark URL…" aria-label="Placeholder input" />
      </section>

      <section className="flex flex-col gap-100" aria-label="Disabled">
        <h2 className="text-preset-4 font-semibold text-neutral-600 dark:text-neutral-100">
          Disabled
        </h2>
        <Input defaultValue="Disabled" disabled aria-label="Disabled input" />
      </section>

      <section className="flex flex-col gap-100" aria-label="Invalid">
        <h2 className="text-preset-4 font-semibold text-neutral-600 dark:text-neutral-100">
          Invalid
        </h2>
        <Input defaultValue="Invalid value" aria-invalid aria-label="Invalid input" />
      </section>

      <section className="flex flex-col gap-100" aria-label="Sizes">
        <h2 className="text-preset-4 font-semibold text-neutral-600 dark:text-neutral-100">
          Sizes
        </h2>
        <div className="flex flex-col gap-150">
          <Input size="sm" defaultValue="size=sm" aria-label="Small input" />
          <Input size="md" defaultValue="size=md" aria-label="Medium input" />
        </div>
      </section>
    </div>
  ),
};
