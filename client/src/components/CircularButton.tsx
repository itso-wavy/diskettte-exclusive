import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

const CircularButton = ({
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
      // onClick={e => {
      //   e.stopPropagation();
      //   onClick?.(e);
      // }}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        'relative flex items-center justify-center rounded-full p-0.5 text-ring *:z-10 before:absolute before:h-0 before:w-0 before:rounded-full before:bg-secondary hover:before:scale-125 hover:before:animate-in',
        'h-6 hover:before:h-full hover:before:w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default CircularButton;
