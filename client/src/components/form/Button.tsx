import { PropsWithChildren, forwardRef } from 'react';

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
          'm-1 rounded-md px-4 py-2 text-white focus:outline-none focus-visible:ring active:ring disabled:active:ring-0',
          'bg-alpha ring-beta disabled:border disabled:border-alpha disabled:bg-alpha disabled:text-beta disabled:opacity-30',
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
  stopPropagation = true,
  children,
}: PropsWithChildren<{ stopPropagation?: boolean; className?: string }>) => {
  return (
    <div
      onClick={e => (stopPropagation ? e.stopPropagation() : {})}
      className={className}
    >
      {children}
    </div>
  );
};

interface CircularButtonProps {
  props?: React.HTMLAttributes<HTMLButtonElement>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
  className?: string;
}

export const CircularButton = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<CircularButtonProps>
>(({ props, onClick, ariaLabel, className, children }, ref) => {
  return (
    <button
      ref={ref}
      type='button'
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
});

interface CountButtonProps {
  ariaLabel: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  count?: number;
  stopPropagation?: boolean;
  className?: string;
}

export const ButtonWithCount = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<CountButtonProps>
>(
  (
    { ariaLabel, onClick, count, stopPropagation = true, className, children },
    ref
  ) => {
    return (
      <StopPropagationButton
        stopPropagation={stopPropagation}
        className={className}
      >
        {!count ? (
          <CircularButton ref={ref} ariaLabel={ariaLabel} onClick={onClick}>
            {children}
          </CircularButton>
        ) : (
          <div className='flex items-center'>
            <CircularButton ariaLabel={ariaLabel} onClick={onClick}>
              {children}
              {Number(count) > 0 && (
                <span className='select ml-1.5 text-sm'>{count}</span>
              )}
            </CircularButton>
          </div>
        )}
      </StopPropagationButton>
    );
  }
);

export default Button;
