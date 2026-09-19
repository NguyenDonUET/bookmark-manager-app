import { useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'select',
      options: [false, true, 'indeterminate'],
    },
    disabled: { control: 'boolean' },
    'aria-invalid': { control: 'boolean' },
  },
  args: {
    'aria-label': 'Checkbox',
    disabled: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Figma Default — unchecked, enabled */
export const Default: Story = {
  args: { defaultChecked: false },
};

/** Figma Checked */
export const Checked: Story = {
  args: { defaultChecked: true },
};

/** Figma Disabled (unchecked) */
export const Disabled: Story = {
  args: { disabled: true, defaultChecked: false },
};

/** Disabled + checked */
export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
};

/** Focus ring — Tab onto the control (`shadow-focus-ring` / `shadow-focus-ring-dark`) */
export const Focus: Story = {
  args: { defaultChecked: false },
};

/** Invalid / error */
export const Invalid: Story = {
  args: { defaultChecked: false, 'aria-invalid': true },
};

export const InvalidChecked: Story = {
  args: { defaultChecked: true, 'aria-invalid': true },
};

export const Indeterminate: Story = {
  args: { checked: 'indeterminate' },
};

export const Interactive: Story = {
  render: function InteractiveCheckbox() {
    const [checked, setChecked] = useState(false);

    return (
      <div className="flex flex-col gap-150">
        <p className="text-preset-4 text-neutral-600 dark:text-neutral-100">
          State: <span className="font-semibold">{checked ? 'checked' : 'unchecked'}</span>
        </p>
        <div className="flex items-center gap-100">
          <Checkbox
            id="checkbox-interactive"
            checked={checked}
            onCheckedChange={(next) => setChecked(next === true)}
          />
          <label
            htmlFor="checkbox-interactive"
            className="text-preset-4 dark:text-neutral-0 text-neutral-900"
          >
            Accept terms
          </label>
        </div>
      </div>
    );
  },
};

export const AllStates: Story = {
  globals: { theme: 'light' },
  render: () => (
    <div className="flex flex-col gap-400">
      <section className="flex flex-col gap-150" aria-label="Light">
        <h2 className="text-preset-4 font-semibold text-neutral-600">Light</h2>
        <div className="flex flex-wrap items-center gap-200">
          <Checkbox aria-label="Default" defaultChecked={false} />
          <Checkbox aria-label="Checked" defaultChecked />
          <Checkbox aria-label="Disabled" disabled defaultChecked={false} />
          <Checkbox aria-label="Disabled checked" disabled defaultChecked />
          <Checkbox aria-label="Invalid" aria-invalid defaultChecked={false} />
          <Checkbox aria-label="Invalid checked" aria-invalid defaultChecked />
          <Checkbox aria-label="Indeterminate" checked="indeterminate" />
        </div>
      </section>
      <section
        className="rounded-8 dark flex flex-col gap-150 bg-neutral-900 p-200"
        aria-label="Dark"
      >
        <h2 className="text-preset-4 font-semibold text-neutral-100">Dark</h2>
        <div className="flex flex-wrap items-center gap-200">
          <Checkbox aria-label="Default dark" defaultChecked={false} />
          <Checkbox aria-label="Checked dark" defaultChecked />
          <Checkbox aria-label="Disabled dark" disabled defaultChecked={false} />
          <Checkbox aria-label="Disabled checked dark" disabled defaultChecked />
          <Checkbox aria-label="Invalid dark" aria-invalid defaultChecked={false} />
          <Checkbox aria-label="Invalid checked dark" aria-invalid defaultChecked />
          <Checkbox aria-label="Indeterminate dark" checked="indeterminate" />
        </div>
      </section>
    </div>
  ),
};
