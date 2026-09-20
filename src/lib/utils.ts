import { createCn } from 'cn/config';

/**
 * `text-preset-*` tokens look like Tailwind `text-*` color utilities to `cn`.
 * Register them as font-size so they don't get stripped by `text-neutral-*`.
 */
export const cn = createCn({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'preset-1',
            'preset-2',
            'preset-3',
            'preset-3-medium',
            'preset-4',
            'preset-4-medium',
            'preset-5',
          ],
        },
      ],
    },
  },
});
