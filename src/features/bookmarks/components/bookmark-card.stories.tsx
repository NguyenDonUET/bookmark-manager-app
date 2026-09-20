import { BookmarkCard } from '@/features/bookmarks/components/bookmark-card';

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
  title: 'Features/Bookmarks/BookmarkCard',
  component: BookmarkCard,
  tags: ['autodocs'],
  args: {
    bookmark: sample,
    onTogglePin: () => undefined,
    onToggleArchive: () => undefined,
    onDelete: () => undefined,
    onVisit: () => undefined,
    onCopyUrl: () => undefined,
    onEdit: () => undefined,
  },
  argTypes: {
    bookmark: { control: false },
    onTogglePin: { table: { disable: true } },
    onToggleArchive: { table: { disable: true } },
    onDelete: { table: { disable: true } },
    onVisit: { table: { disable: true } },
    onCopyUrl: { table: { disable: true } },
    onEdit: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div className="max-w-bookmark-card p-200">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BookmarkCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Unpinned: Story = {
  args: {
    bookmark: { ...sample, pinned: false, visitCount: 12 },
  },
};

export const LightAndDark: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [
    () => (
      <div className="grid gap-300 p-300 md:grid-cols-2">
        <div className="bg-background p-200">
          <BookmarkCard bookmark={sample} />
        </div>
        <div className="dark bg-background p-200">
          <BookmarkCard bookmark={sample} />
        </div>
      </div>
    ),
  ],
};

export const NeverVisited: Story = {
  args: {
    bookmark: {
      ...sample,
      title: 'React Docs',
      url: 'https://react.dev',
      favicon: '/assets/images/favicon-react-docs.png',
      pinned: false,
      visitCount: 0,
      lastVisited: null,
      tags: ['JavaScript', 'Framework', 'Reference'],
    },
  },
};

export const Archived: Story = {
  args: {
    bookmark: { ...sample, isArchived: true, pinned: false },
  },
};

export const ManyTags: Story = {
  args: {
    bookmark: {
      ...sample,
      tags: ['Tools', 'Community', 'Git', 'Reference', 'Tutorial', 'Tips'],
    },
  },
};
