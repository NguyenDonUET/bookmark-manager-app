import type { IconProps } from './types';

export function IconMoon02({ size = 20, ...props }: IconProps) {
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
        d="M18.2957 10.7972C17.1483 12.8099 14.9826 14.1669 12.5 14.1669C8.8181 14.1669 5.83333 11.1822 5.83333 7.50027C5.83333 5.01747 7.19056 2.85166 9.20356 1.70431C4.97479 2.10526 1.66667 5.66634 1.66667 10.0001C1.66667 14.6024 5.39763 18.3334 10 18.3334C14.3335 18.3334 17.8944 15.0256 18.2957 10.7972Z"
        stroke="currentColor"
        strokeWidth={1.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
