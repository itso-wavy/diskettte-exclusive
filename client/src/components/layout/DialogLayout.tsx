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
  children,
}: PropsWithChildren<{
  title: string;
}>) => {
  const { theme, isDarkmode } = useSelector((state: RootState) => state.theme);

  return (
    <DialogContent
      className={cn(
        `theme-${theme}`,
        'w-[350px] min-w-[300px] max-w-[90vw] text-primary',
        isDarkmode && 'dark'
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
