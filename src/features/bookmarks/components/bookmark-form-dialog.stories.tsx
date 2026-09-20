import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { BookmarkFormDialog } from '@/features/bookmarks/components/bookmark-form-dialog';

import type { Bookmark } from '@/features/bookmarks/types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const sample: Bookmark = {
  id: 'bm-005',
  title: 'Frontend Mentor',
  url: 'https://www.frontendmentor.io',
  favicon: '/assets/images/favicon-frontend-mentor.png',
  description:
    'Improve your front-end coding skills by building real projects. Solve real-world HTML, CSS and JavaScript challenges whilst working to professional designs.',
  tags: ['Practice', 'Learning', 'Community'],
  pinned: true,
  isArchived: false,
  visitCount: 47,
  createdAt: '2024-01-15T10:30:00Z',
  lastVisited: '2025-09-23T14:45:00Z',
};

const meta = {
  title: 'Features/Bookmarks/BookmarkFormDialog',
  component: BookmarkFormDialog,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    open: true,
    onOpenChange: () => undefined,
    mode: 'add',
    onSubmit: () => undefined,
  },
} satisfies Meta<typeof BookmarkFormDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Add: Story = {
  args: { mode: 'add', open: true },
  render: function AddStory(args) {
    const [open, setOpen] = useState(args.open);
    return (
      <>
        <Button type="button" onClick={() => setOpen(true)}>
          Open add dialog
        </Button>
        <BookmarkFormDialog
          {...args}
          open={open}
          onOpenChange={setOpen}
          mode="add"
          onSubmit={() => setOpen(false)}
        />
      </>
    );
  },
};

export const Edit: Story = {
  args: { mode: 'edit', open: true, bookmark: sample },
  render: function EditStory(args) {
    const [open, setOpen] = useState(args.open);
    return (
      <>
        <Button type="button" onClick={() => setOpen(true)}>
          Open edit dialog
        </Button>
        <BookmarkFormDialog
          {...args}
          open={open}
          onOpenChange={setOpen}
          mode="edit"
          bookmark={sample}
          onSubmit={() => setOpen(false)}
        />
      </>
    );
  },
};
