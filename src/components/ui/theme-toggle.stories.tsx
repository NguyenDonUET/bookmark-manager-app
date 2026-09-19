import { useState } from 'react';

import { ThemeToggle } from '@/components/ui/theme-toggle';

import type { ThemeValue } from '@/components/ui/theme-toggle';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'select',
      options: ['light', 'dark'],
    },
    defaultValue: {
      control: 'select',
      options: ['light', 'dark'],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    defaultValue: 'light',
    disabled: false,
  },
} satisfies Meta<typeof ThemeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Figma Theme=Light — mint track, white active pill, dark icons */
export const LightSelected: Story = {
  args: { defaultValue: 'light' },
  globals: { theme: 'light' },
};

/** Figma Theme=Dark — deep teal track, darker active pill, white icons */
export const DarkSelected: Story = {
  args: { defaultValue: 'dark' },
  globals: { theme: 'dark' },
};

export const Disabled: Story = {
  args: { defaultValue: 'light', disabled: true },
  globals: { theme: 'light' },
};

export const Interactive: Story = {
  render: function InteractiveThemeToggle() {
    const [theme, setTheme] = useState<ThemeValue>('light');

    return (
      <div className="flex flex-col gap-150">
        <p className="text-preset-4 text-neutral-600 dark:text-neutral-100">
          Selected: <span className="font-semibold">{theme}</span>
        </p>
        <ThemeToggle
          value={theme}
          onValueChange={(next) => {
            setTheme(next);
            document.documentElement.classList.toggle('dark', next === 'dark');
          }}
        />
      </div>
    );
  },
};

export const AllStates: Story = {
  globals: { theme: 'light' },
  render: () => (
    <div className="flex flex-wrap items-start gap-400">
      <section className="flex flex-col gap-150" aria-label="Theme=Light">
        <h2 className="text-preset-4 font-semibold text-neutral-600">Theme=Light (sun on)</h2>
        <ThemeToggle defaultValue="light" />
      </section>
      <section
        className="dark rounded-8 flex flex-col gap-150 bg-neutral-900 p-200"
        aria-label="Theme=Dark"
      >
        <h2 className="text-preset-4 font-semibold text-neutral-100">Theme=Dark (moon on)</h2>
        <ThemeToggle defaultValue="dark" />
      </section>
    </div>
  ),
};
