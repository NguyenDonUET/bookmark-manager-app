import type { IconProps } from './types';

export function IconSwitchVertical01({ size = 20, ...props }: IconProps) {
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
        d="M14.1667 3.33333V16.6667M17.5 13.3333L14.1667 16.6667L10.8333 13.3333M5.83333 16.6667V3.33333M9.16667 6.66667L5.83333 3.33333L2.5 6.66667"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
