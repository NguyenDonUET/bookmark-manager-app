import type { IconProps } from './types';

export function IconPalette({ size = 20, ...props }: IconProps) {
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
        d="M1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333C11.3807 18.3333 12.5 17.214 12.5 15.8333V15.4167C12.5 15.0296 12.5 14.8361 12.5214 14.6737C12.6691 13.5518 13.5518 12.6691 14.6737 12.5214C14.8361 12.5 15.0296 12.5 15.4167 12.5H15.8333C17.214 12.5 18.3333 11.3807 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10Z"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.83333 10.8333C6.29357 10.8333 6.66667 10.4602 6.66667 10C6.66667 9.53976 6.29357 9.16667 5.83333 9.16667C5.3731 9.16667 5 9.53976 5 10C5 10.4602 5.3731 10.8333 5.83333 10.8333Z"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3333 7.5C13.7936 7.5 14.1667 7.1269 14.1667 6.66667C14.1667 6.20643 13.7936 5.83333 13.3333 5.83333C12.8731 5.83333 12.5 6.20643 12.5 6.66667C12.5 7.1269 12.8731 7.5 13.3333 7.5Z"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.33333 6.66667C8.79357 6.66667 9.16667 6.29357 9.16667 5.83333C9.16667 5.3731 8.79357 5 8.33333 5C7.8731 5 7.5 5.3731 7.5 5.83333C7.5 6.29357 7.8731 6.66667 8.33333 6.66667Z"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
