import type { Meta, StoryObj } from '@storybook/react-vite';

import { cn } from '@/lib/utils';

import { paletteTokens, semanticTokens } from './tokens';

import type { ColorToken } from './tokens';

function ColorSwatch({ token }: { token: ColorToken }) {
  return (
    <article className="flex flex-col gap-100">
      <div
        className={cn('border-border rounded-10 h-600 w-full border', token.utility)}
        aria-hidden
      />
      <div className="gap-050 flex flex-col">
        <h3 className="text-preset-4 font-semibold">{token.name}</h3>
        <p className="text-muted-foreground text-preset-5 font-medium">{token.utility}</p>
        <p className="text-muted-foreground text-preset-5 font-medium">{token.cssVar}</p>
        <p className="text-preset-5 font-medium">
          Light: {token.lightHex}
          {token.darkHex ? ` · Dark: ${token.darkHex}` : null}
        </p>
      </div>
    </article>
  );
}

interface ColorSectionProps {
  title: string;
  tokens: ColorToken[];
}

function ColorSection({ title, tokens }: ColorSectionProps) {
  return (
    <section className="flex flex-col gap-200">
      <h2 className="text-preset-2 border-border border-b pb-100 font-bold">{title}</h2>
      <div className="grid grid-cols-2 gap-200 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {tokens.map((token) => (
          <ColorSwatch key={token.name} token={token} />
        ))}
      </div>
    </section>
  );
}

function ColorsGallery() {
  return (
    <div className="flex flex-col gap-600">
      <header className="flex flex-col gap-100">
        <h1 className="text-preset-1 font-bold">Colors</h1>
        <p className="text-muted-foreground text-preset-3-medium font-medium">
          Figma palette + shadcn semantic roles. Toggle Theme in the toolbar to compare light/dark
          neutrals.
        </p>
      </header>
      <ColorSection title="Palette" tokens={paletteTokens} />
      <ColorSection title="Semantic roles" tokens={semanticTokens} />
    </div>
  );
}

const meta = {
  title: 'Design System/Colors',
  component: ColorsGallery,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ColorsGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {};
