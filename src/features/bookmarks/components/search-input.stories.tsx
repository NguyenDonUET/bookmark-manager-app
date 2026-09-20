import { useState } from 'react';

import { SearchInput } from '@/features/bookmarks/components/search-input';

import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Features/Bookmarks/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    onValueChange: { action: 'valueChange' },
  },
  args: {
    size: 'sm',
    disabled: false,
    placeholder: 'Search by title...',
    value: '',
  },
} satisfies Meta<typeof SearchInput>;

export default meta;

type Story = StoryObj<typeof meta>;

function ControlledSearchInput(props: ComponentProps<typeof SearchInput>) {
  const [value, setValue] = useState(props.value);
  return (
    <SearchInput
      {...props}
      value={value}
      onValueChange={(next) => {
        setValue(next);
        props.onValueChange(next);
      }}
      className="w-[320px]"
    />
  );
}

export const Default: Story = {
  render: (args) => <ControlledSearchInput {...args} />,
};

export const WithValue: Story = {
  args: {
    value: 'Frontend Mentor',
  },
  render: (args) => <ControlledSearchInput {...args} />,
};

export const Disabled: Story = {
  args: {
    value: 'Cannot edit',
    disabled: true,
  },
  render: (args) => <ControlledSearchInput {...args} />,
};
