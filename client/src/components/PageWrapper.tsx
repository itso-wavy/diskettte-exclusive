import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

const PageWrapper = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={cn('select *:select mt-20', className)}>{children}</div>
  );
};

export default PageWrapper;
