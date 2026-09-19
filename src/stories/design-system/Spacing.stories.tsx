import type { Meta, StoryObj } from '@storybook/react-vite';

import { cn } from '@/lib/utils';

import { spacingTokens } from './tokens';

function SpacingGallery() {
  return (
    <div className="flex flex-col gap-600">
      <header className="flex flex-col gap-100">
        <h1 className="text-preset-1 font-bold">Spacing</h1>
        <p className="text-muted-foreground text-preset-3-medium font-medium">
          Figma spacing-* scale. Prefer p-100 / gap-200 over default Tailwind p-4.
        </p>
      </header>

      <div className="text-preset-4 flex gap-200 font-semibold">
        <span className="w-[150px]">Name</span>
        <span className="w-[100px]">Pixels</span>
        <span>Preview</span>
      </div>

      <ul className="flex flex-col gap-150">
        {spacingTokens.map((token) => (
          <li key={token.name} className="border-border flex items-center gap-200 border-b pb-150">
            <div className="gap-025 flex w-[150px] flex-col">
              <span className="text-preset-4 font-semibold">{token.name}</span>
              <code className="text-muted-foreground text-preset-5 font-medium">
                {token.utility}
              </code>
            </div>
            <span className="text-preset-4 w-[100px] font-medium">{token.pixels}</span>
            <div
              className={cn('h-500 shrink-0 bg-neutral-900 dark:bg-neutral-100', token.widthClass)}
              aria-hidden
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

const meta = {
  title: 'Design System/Spacing',
  component: SpacingGallery,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SpacingGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {};
