import { PropsWithChildren, forwardRef } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';

interface NavLinkButtonProps {
  tooltip: string;
  onClick: () => void;
  className?: string;
}

const NavLinkButton = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<NavLinkButtonProps>
>(({ tooltip, onClick, className, children }, forwardedRef) => {
  return (
    <li className={cn('relative', className)}>
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <button
              ref={forwardedRef}
              onClick={onClick}
              className='grid aspect-square w-full place-content-center overflow-hidden rounded-lg border hover:bg-gray-500/10'
            >
              {children}
            </button>
          </TooltipTrigger>
          <TooltipContent
            side='right'
            className='bg-gray-950 px-2.5 py-1 text-xs text-white'
          >
            {tooltip}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </li>
  );
});

export default NavLinkButton;
