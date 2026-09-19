import type { IconProps } from './types';

export function IconSun({ size = 20, ...props }: IconProps) {
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
        d="M10 1.66667V3.33333M10 16.6667V18.3333M3.33333 10H1.66667M5.26176 5.26176L4.08325 4.08325M14.7382 5.26176L15.9167 4.08325M5.26176 14.7417L4.08325 15.9202M14.7382 14.7417L15.9167 15.9202M18.3333 10H16.6667M14.1667 10C14.1667 12.3012 12.3012 14.1667 10 14.1667C7.69881 14.1667 5.83333 12.3012 5.83333 10C5.83333 7.69881 7.69881 5.83333 10 5.83333C12.3012 5.83333 14.1667 7.69881 14.1667 10Z"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
