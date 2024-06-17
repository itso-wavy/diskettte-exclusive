import { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { RootState } from '@/lib/store';
import { cn } from '@/lib/utils';

const DialogLayout = ({
  title,
  className,
  children,
}: PropsWithChildren<{
  title: string;
  className?: string;
}>) => {
  const { theme, isDarkmode } = useSelector((state: RootState) => state.theme);

  return (
    <DialogContent
      className={cn(
        `theme-${theme}`,
        'min-w-[300px] text-primary selection:bg-beta selection:text-foreground max-sm:rounded-none sm:w-[350px] sm:max-w-[90vw]',
        isDarkmode && 'dark',
        className
      )}
    >
      <DialogHeader>
        <DialogTitle className='my-3 text-center text-xl font-bold first-letter:uppercase'>
          {title}
        </DialogTitle>
      </DialogHeader>
      {children}
    </DialogContent>
  );
};

export default DialogLayout;
