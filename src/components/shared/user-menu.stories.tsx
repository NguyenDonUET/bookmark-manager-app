import { UserMenu } from '@/components/shared/user-menu';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Shared/UserMenu',
  component: UserMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: { control: 'text' },
    email: { control: 'text' },
    avatarSrc: { control: 'text' },
    onLogout: { action: 'logout' },
  },
  args: {
    name: 'Emily Carter',
    email: 'emily101@email.com',
  },
} satisfies Meta<typeof UserMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Click the avatar in the canvas to review the open menu. */
export const InHeaderCorner: Story = {
  render: (args) => (
    <div className="flex w-[320px] justify-end p-200">
      <UserMenu {...args} />
    </div>
  ),
};
