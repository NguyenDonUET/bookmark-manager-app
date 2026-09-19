import type { Meta, StoryObj } from '@storybook/react-vite';

import { typographyTokens } from './tokens';

function TypographyGallery() {
  return (
    <div className="flex flex-col gap-600">
      <header className="flex flex-col gap-100">
        <h1 className="text-preset-1 font-bold">Typography</h1>
        <p className="text-muted-foreground text-preset-3-medium font-medium">
          Manrope presets from Figma. Pair size utilities with font-medium / font-semibold /
          font-bold.
        </p>
      </header>

      <ul className="flex flex-col gap-400">
        {typographyTokens.map((token) => (
          <li key={token.name} className="border-border flex flex-col gap-150 border-b pb-300">
            <div className="text-muted-foreground text-preset-5 flex flex-wrap gap-100 font-medium">
              <span className="text-foreground text-preset-4 font-semibold">{token.name}</span>
              <span aria-hidden>·</span>
              <code>{token.className}</code>
            </div>
            <p className={token.className}>The quick brown fox jumps over the lazy dog.</p>
            <div className="flex flex-wrap gap-100">
              <span className="border-border text-preset-5 rounded-8 py-050 border px-150 font-medium">
                Size: {token.size}
              </span>
              <span className="border-border text-preset-5 rounded-8 py-050 border px-150 font-medium">
                Line height: {token.lineHeight}
              </span>
              <span className="border-border text-preset-5 rounded-8 py-050 border px-150 font-medium">
                Weight: {token.weight}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const meta = {
  title: 'Design System/Typography',
  component: TypographyGallery,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TypographyGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Presets: Story = {};
