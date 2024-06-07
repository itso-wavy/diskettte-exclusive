import Icon from './icons';

import { cn } from '@/lib/utils';

const Loader: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('relative h-[calc(100%-65px)] min-h-[97px]', className)}>
      <div className='absolute inset-0 grid place-content-center'>
        <Icon.Loader
          viewBox='0 0 24 24'
          className='h-5 w-5 animate-spin text-muted-foreground'
        />
      </div>
    </div>
  );
};

export default Loader;
