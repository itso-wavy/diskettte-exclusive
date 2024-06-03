import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

const Button = ({
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
          'hover:bg-gamma bg-alpha ring-beta disabled:bg-alpha disabled:opacity-70',
          className
        )}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
