import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import type { Meta, StoryObj } from '@storybook/react-vite';

const AVATAR_SRC = '/assets/images/image-avatar.webp';

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    ringed: { control: 'boolean' },
  },
  args: {
    size: 'md',
    ringed: false,
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src={AVATAR_SRC} alt="Emily Carter" />
      <AvatarFallback>EC</AvatarFallback>
    </Avatar>
  ),
};

export const Ringed: Story = {
  args: { size: 'lg', ringed: true },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src={AVATAR_SRC} alt="Emily Carter" />
      <AvatarFallback>EC</AvatarFallback>
    </Avatar>
  ),
};

export const Fallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="/assets/images/missing-avatar.webp" alt="" />
      <AvatarFallback>EC</AvatarFallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-200">
      <Avatar size="sm">
        <AvatarImage src={AVATAR_SRC} alt="" />
        <AvatarFallback>EC</AvatarFallback>
      </Avatar>
      <Avatar size="md">
        <AvatarImage src={AVATAR_SRC} alt="" />
        <AvatarFallback>EC</AvatarFallback>
      </Avatar>
      <Avatar size="lg" ringed>
        <AvatarImage src={AVATAR_SRC} alt="" />
        <AvatarFallback>EC</AvatarFallback>
      </Avatar>
    </div>
  ),
};
