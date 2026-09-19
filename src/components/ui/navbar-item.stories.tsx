import { IconArchive, IconHomeLine } from '@/components/icons';
import { NavbarItem } from '@/components/ui/navbar-item';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/NavbarItem',
  component: NavbarItem,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'active'],
    },
    disabled: { control: 'boolean' },
    asChild: { table: { disable: true } },
    children: { control: 'text' },
  },
  args: {
    children: 'Home',
    variant: 'default',
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div className="rounded-10 bg-sidebar w-[240px] p-100">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NavbarItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <NavbarItem {...args}>
      <IconHomeLine />
      {args.children}
    </NavbarItem>
  ),
};

export const Active: Story = {
  args: { variant: 'active' },
  render: (args) => (
    <NavbarItem {...args}>
      <IconHomeLine />
      {args.children}
    </NavbarItem>
  ),
};

/** Forced hover via `data-highlighted` (same pattern as DropdownMenuItem). */
export const Hover: Story = {
  render: (args) => (
    <NavbarItem {...args} data-highlighted>
      <IconHomeLine />
      {args.children}
    </NavbarItem>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <NavbarItem {...args}>
      <IconHomeLine />
      {args.children}
    </NavbarItem>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="gap-050 flex flex-col">
      <NavbarItem type="button" variant="active">
        <IconHomeLine />
        Home
      </NavbarItem>
      <NavbarItem type="button" variant="default">
        <IconArchive />
        Archived
      </NavbarItem>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-150">
      <h2 className="text-preset-4 font-semibold text-neutral-600 dark:text-neutral-100">
        Navbar item (inferred from preview)
      </h2>
      <div className="gap-050 flex flex-col">
        <NavbarItem type="button" variant="default">
          <IconHomeLine />
          Default
        </NavbarItem>
        <NavbarItem type="button" variant="default" data-highlighted>
          <IconHomeLine />
          Hover
        </NavbarItem>
        <NavbarItem type="button" variant="active">
          <IconHomeLine />
          Active
        </NavbarItem>
        <NavbarItem type="button" variant="default" disabled>
          <IconHomeLine />
          Disabled
        </NavbarItem>
      </div>
    </div>
  ),
};
