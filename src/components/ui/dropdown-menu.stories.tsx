import { IconCheck, IconCopy01, IconLinkExternal01 } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';

/**
 * Radix Menu.Item must sit under Menu.Root. Force the menu open so item
 * variants can be reviewed without clicking a trigger.
 */
function MenuItemPreview({ children }: { children: ReactNode }) {
  return (
    <DropdownMenu open modal={false}>
      <DropdownMenuTrigger className="sr-only">Menu preview</DropdownMenuTrigger>
      <DropdownMenuContent forceMount className="w-[200px]">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const meta = {
  title: 'UI/DropdownMenu',
  component: DropdownMenuItem,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
    },
    disabled: { control: 'boolean' },
    inset: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    children: 'Copy URL',
    variant: 'default',
    disabled: false,
  },
} satisfies Meta<typeof DropdownMenuItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <MenuItemPreview>
      <DropdownMenuItem
        {...args}
        leftIcon={<IconLinkExternal01 size={16} />}
        rightIcon={<IconCheck size={16} />}
      />
    </MenuItemPreview>
  ),
};

export const Hover: Story = {
  render: (args) => (
    <MenuItemPreview>
      <DropdownMenuItem
        {...args}
        data-highlighted
        leftIcon={<IconLinkExternal01 size={16} />}
        rightIcon={<IconCheck size={16} />}
      />
    </MenuItemPreview>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <MenuItemPreview>
      <DropdownMenuItem
        {...args}
        leftIcon={<IconLinkExternal01 size={16} />}
        rightIcon={<IconCheck size={16} />}
      />
    </MenuItemPreview>
  ),
};

export const WithoutIcons: Story = {
  render: (args) => (
    <MenuItemPreview>
      <DropdownMenuItem {...args} />
    </MenuItemPreview>
  ),
};

export const Destructive: Story = {
  args: { children: 'Delete', variant: 'destructive' },
  render: (args) => (
    <MenuItemPreview>
      <DropdownMenuItem {...args} leftIcon={<IconCopy01 size={16} />} />
    </MenuItemPreview>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-150">
      <h2 className="text-preset-4 font-semibold text-neutral-600 dark:text-neutral-100">
        Menu item (Figma Status)
      </h2>
      <MenuItemPreview>
        <DropdownMenuItem
          leftIcon={<IconLinkExternal01 size={16} />}
          rightIcon={<IconCheck size={16} />}
        >
          Copy URL
        </DropdownMenuItem>
        <DropdownMenuItem
          data-highlighted
          leftIcon={<IconLinkExternal01 size={16} />}
          rightIcon={<IconCheck size={16} />}
        >
          Copy URL
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled
          leftIcon={<IconLinkExternal01 size={16} />}
          rightIcon={<IconCheck size={16} />}
        >
          Copy URL
        </DropdownMenuItem>
      </MenuItemPreview>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="secondary" size="sm">
          Open menu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuItem
          leftIcon={<IconLinkExternal01 size={16} />}
          rightIcon={<IconCheck size={16} />}
        >
          Copy URL
        </DropdownMenuItem>
        <DropdownMenuItem leftIcon={<IconCopy01 size={16} />}>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" leftIcon={<IconCopy01 size={16} />}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
