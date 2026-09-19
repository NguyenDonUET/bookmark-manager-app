import type { Preview } from '@storybook/react-vite';

import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'padded',
    backgrounds: { disable: true },
  },
  globalTypes: {
    theme: {
      description: 'Color theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme as string;
      const root = document.documentElement;

      root.classList.toggle('dark', theme === 'dark');
      root.style.backgroundColor = 'var(--background)';
      root.style.color = 'var(--foreground)';

      return (
        <div className="bg-background text-foreground min-h-svh p-300 font-sans">
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
