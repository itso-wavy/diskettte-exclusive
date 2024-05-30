import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

const FeedWrapper = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={cn('mx-auto w-full md:w-[520px]', className)}>
      {children}
    </div>
  );
};

export default FeedWrapper;
