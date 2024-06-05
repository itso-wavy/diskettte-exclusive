import { cn } from '@/lib/utils';

const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn('h-full w-full animate-pulse bg-gray-300/70', className)}
    />
  );
};

export default Skeleton;
