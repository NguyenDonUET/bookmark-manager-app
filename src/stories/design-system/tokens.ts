export interface ColorToken {
  name: string;
  cssVar: string;
  utility: string;
  lightHex: string;
  darkHex?: string;
}

export interface TypographyToken {
  name: string;
  className: string;
  size: string;
  lineHeight: string;
  weight: string;
}

export interface SpacingToken {
  name: string;
  utility: string;
  pixels: string;
  widthClass: string;
}

export interface RadiusToken {
  name: string;
  utility: string;
  pixels: string;
  radiusClass: string;
}

export const paletteTokens: ColorToken[] = [
  {
    name: 'Neutral 0',
    cssVar: '--neutral-0',
    utility: 'bg-neutral-0',
    lightHex: '#FFFFFF',
    darkHex: '#FFFFFF',
  },
  {
    name: 'Neutral 100',
    cssVar: '--neutral-100',
    utility: 'bg-neutral-100',
    lightHex: '#E8F0EF',
    darkHex: '#B1B9B9',
  },
  {
    name: 'Neutral 300',
    cssVar: '--neutral-300',
    utility: 'bg-neutral-300',
    lightHex: '#DDE9E7',
    darkHex: '#00706E',
  },
  {
    name: 'Neutral 400',
    cssVar: '--neutral-400',
    utility: 'bg-neutral-400',
    lightHex: '#C0CFCC',
    darkHex: '#004746',
  },
  {
    name: 'Neutral 500',
    cssVar: '--neutral-500',
    utility: 'bg-neutral-500',
    lightHex: '#899492',
    darkHex: '#004241',
  },
  {
    name: 'Neutral 600',
    cssVar: '--neutral-600',
    utility: 'bg-neutral-600',
    lightHex: '#4C5C59',
    darkHex: '#002E2D',
  },
  {
    name: 'Neutral 800',
    cssVar: '--neutral-800',
    utility: 'bg-neutral-800',
    lightHex: '#4C5C59',
    darkHex: '#001F1F',
  },
  {
    name: 'Neutral 900',
    cssVar: '--neutral-900',
    utility: 'bg-neutral-900',
    lightHex: '#051513',
    darkHex: '#001414',
  },
  {
    name: 'Teal 700',
    cssVar: '--teal-700',
    utility: 'bg-teal-700',
    lightHex: '#014745',
    darkHex: '#014745',
  },
  {
    name: 'Teal 800',
    cssVar: '--teal-800',
    utility: 'bg-teal-800',
    lightHex: '#013C3B',
    darkHex: '#013C3B',
  },
  {
    name: 'Red 600',
    cssVar: '--red-600',
    utility: 'bg-red-600',
    lightHex: '#FD4740',
    darkHex: '#FD4740',
  },
  {
    name: 'Red 800',
    cssVar: '--red-800',
    utility: 'bg-red-800',
    lightHex: '#CB0A04',
    darkHex: '#CB0A04',
  },
];

export const semanticTokens: ColorToken[] = [
  {
    name: 'background',
    cssVar: '--background',
    utility: 'bg-background',
    lightHex: 'neutral-0',
    darkHex: 'neutral-900',
  },
  {
    name: 'foreground',
    cssVar: '--foreground',
    utility: 'bg-foreground',
    lightHex: 'neutral-900',
    darkHex: 'neutral-0',
  },
  {
    name: 'primary',
    cssVar: '--primary',
    utility: 'bg-primary',
    lightHex: 'teal-700',
    darkHex: 'teal-700',
  },
  {
    name: 'secondary',
    cssVar: '--secondary',
    utility: 'bg-secondary',
    lightHex: 'neutral-100',
    darkHex: 'neutral-600',
  },
  {
    name: 'muted',
    cssVar: '--muted',
    utility: 'bg-muted',
    lightHex: 'neutral-100',
    darkHex: 'neutral-600',
  },
  {
    name: 'accent',
    cssVar: '--accent',
    utility: 'bg-accent',
    lightHex: 'neutral-300',
    darkHex: 'neutral-500',
  },
  {
    name: 'destructive',
    cssVar: '--destructive',
    utility: 'bg-destructive',
    lightHex: 'red-800',
    darkHex: 'red-800',
  },
  {
    name: 'border',
    cssVar: '--border',
    utility: 'bg-border',
    lightHex: 'neutral-400',
    darkHex: 'neutral-400',
  },
  {
    name: 'card',
    cssVar: '--card',
    utility: 'bg-card',
    lightHex: 'neutral-0',
    darkHex: 'neutral-800',
  },
  {
    name: 'sidebar',
    cssVar: '--sidebar',
    utility: 'bg-sidebar',
    lightHex: 'neutral-100',
    darkHex: 'neutral-800',
  },
];

export const typographyTokens: TypographyToken[] = [
  {
    name: 'Text Preset 1',
    className: 'text-preset-1 font-bold',
    size: '24px',
    lineHeight: '140%',
    weight: 'Bold (700)',
  },
  {
    name: 'Text Preset 2',
    className: 'text-preset-2 font-bold',
    size: '20px',
    lineHeight: '120%',
    weight: 'Bold (700)',
  },
  {
    name: 'Text Preset 2 (SemiBold)',
    className: 'text-preset-2 font-semibold',
    size: '20px',
    lineHeight: '120%',
    weight: 'SemiBold (600)',
  },
  {
    name: 'Text Preset 3',
    className: 'text-preset-3 font-semibold',
    size: '16px',
    lineHeight: '140%',
    weight: 'SemiBold (600)',
  },
  {
    name: 'Text Preset 3 (Medium)',
    className: 'text-preset-3-medium font-medium',
    size: '16px',
    lineHeight: '130%',
    weight: 'Medium (500)',
  },
  {
    name: 'Text Preset 4',
    className: 'text-preset-4 font-semibold',
    size: '14px',
    lineHeight: '140%',
    weight: 'SemiBold (600)',
  },
  {
    name: 'Text Preset 4 (Medium)',
    className: 'text-preset-4-medium font-medium',
    size: '14px',
    lineHeight: '150%',
    weight: 'Medium (500)',
  },
  {
    name: 'Text Preset 5',
    className: 'text-preset-5 font-medium',
    size: '12px',
    lineHeight: '140%',
    weight: 'Medium (500)',
  },
];

export const spacingTokens: SpacingToken[] = [
  { name: 'spacing-0', utility: 'w-0', pixels: '0', widthClass: 'w-0' },
  { name: 'spacing-025', utility: 'p-025 / gap-025', pixels: '2px', widthClass: 'w-025' },
  { name: 'spacing-050', utility: 'p-050 / gap-050', pixels: '4px', widthClass: 'w-050' },
  { name: 'spacing-075', utility: 'p-075 / gap-075', pixels: '6px', widthClass: 'w-075' },
  { name: 'spacing-100', utility: 'p-100 / gap-100', pixels: '8px', widthClass: 'w-100' },
  { name: 'spacing-125', utility: 'p-125 / gap-125', pixels: '10px', widthClass: 'w-125' },
  { name: 'spacing-150', utility: 'p-150 / gap-150', pixels: '12px', widthClass: 'w-150' },
  { name: 'spacing-200', utility: 'p-200 / gap-200', pixels: '16px', widthClass: 'w-200' },
  { name: 'spacing-250', utility: 'p-250 / gap-250', pixels: '20px', widthClass: 'w-250' },
  { name: 'spacing-300', utility: 'p-300 / gap-300', pixels: '24px', widthClass: 'w-300' },
  { name: 'spacing-400', utility: 'p-400 / gap-400', pixels: '32px', widthClass: 'w-400' },
  { name: 'spacing-500', utility: 'p-500 / gap-500', pixels: '40px', widthClass: 'w-500' },
  { name: 'spacing-600', utility: 'p-600 / gap-600', pixels: '48px', widthClass: 'w-600' },
  { name: 'spacing-800', utility: 'p-800 / gap-800', pixels: '64px', widthClass: 'w-800' },
  { name: 'spacing-1000', utility: 'p-1000 / gap-1000', pixels: '80px', widthClass: 'w-1000' },
  { name: 'spacing-1200', utility: 'p-1200 / gap-1200', pixels: '96px', widthClass: 'w-1200' },
  { name: 'spacing-1400', utility: 'p-1400 / gap-1400', pixels: '112px', widthClass: 'w-1400' },
  { name: 'spacing-1600', utility: 'p-1600 / gap-1600', pixels: '128px', widthClass: 'w-1600' },
  { name: 'spacing-1800', utility: 'p-1800 / gap-1800', pixels: '140px', widthClass: 'w-1800' },
];

export const radiusTokens: RadiusToken[] = [
  { name: 'radius-0', utility: 'rounded-0', pixels: '0', radiusClass: 'rounded-tl-0' },
  { name: 'radius-4', utility: 'rounded-4', pixels: '4px', radiusClass: 'rounded-tl-4' },
  { name: 'radius-6', utility: 'rounded-6', pixels: '6px', radiusClass: 'rounded-tl-6' },
  { name: 'radius-8', utility: 'rounded-8', pixels: '8px', radiusClass: 'rounded-tl-8' },
  { name: 'radius-10', utility: 'rounded-10', pixels: '10px', radiusClass: 'rounded-tl-10' },
  { name: 'radius-12', utility: 'rounded-12', pixels: '12px', radiusClass: 'rounded-tl-12' },
  { name: 'radius-16', utility: 'rounded-16', pixels: '16px', radiusClass: 'rounded-tl-16' },
  { name: 'radius-20', utility: 'rounded-20', pixels: '20px', radiusClass: 'rounded-tl-20' },
  { name: 'radius-24', utility: 'rounded-24', pixels: '24px', radiusClass: 'rounded-tl-24' },
  {
    name: 'radius-full',
    utility: 'rounded-full',
    pixels: '999px',
    radiusClass: 'rounded-l-full',
  },
];
