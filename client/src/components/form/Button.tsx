import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

export const Button = ({
  type,
  onClick,
  disabled,
  className,
  children,
}: PropsWithChildren<{
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  className?: string;
}>) => {
  return (
    <>
      <button
        type={type ? type : 'button'}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          'm-1 rounded-md px-4 py-2 text-white focus:outline-none focus:ring active:ring  disabled:active:ring-0',
          'bg-alpha ring-beta hover:bg-gamma disabled:bg-alpha disabled:opacity-70',
          className
        )}
      >
        {children}
      </button>
    </>
  );
};

export const StopPropagationButton = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div onClick={e => e.stopPropagation()} className={className}>
      {children}
    </div>
  );
};

export const CircularButton = ({
  props,
  onClick,
  ariaLabel,
  className,
  children,
}: PropsWithChildren<{
  props?: React.HTMLAttributes<HTMLButtonElement>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
  className?: string;
}>) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        'relative flex items-center justify-center rounded-full p-0.5 text-ring *:z-10 before:absolute before:h-0 before:w-0 before:rounded-full before:bg-secondary hover:before:scale-125 hover:before:animate-in dark:before:bg-border',
        'h-6 hover:before:h-full hover:before:w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
