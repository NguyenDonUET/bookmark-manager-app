import type { IconProps } from './types';

export function IconRefreshCcw01({ size = 20, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden={props['aria-label'] || props['aria-labelledby'] ? undefined : true}
      {...props}
      width={size}
      height={size}
    >
      <path
        d="M1.66667 8.33333C1.66667 8.33333 3.33748 6.05685 4.69486 4.69854C6.05224 3.34022 7.928 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C6.58076 17.5 3.69593 15.2119 2.79314 12.0833M6.66667 8.33333H1.66667V3.33333"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
