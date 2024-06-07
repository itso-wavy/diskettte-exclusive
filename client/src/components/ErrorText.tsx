import { Button } from './form';

import { cn } from '@/lib/utils';

const ErrorText: React.FC<{
  message?: string;
  handleRetry?: () => void;
  className?: string;
}> = ({ message, handleRetry, className }) => {
  return (
    <div className={cn('relative h-[calc(100%-65px)] min-h-[97px]', className)}>
      <div className='absolute bottom-0 left-0 grid h-full w-full place-content-center gap-y-2 text-center text-xs'>
        {message ? (
          message
        ) : (
          <div className='flex flex-col gap-y-1'>
            <p>에러가 발생했습니다.</p>
            <p>잠시 후 다시 시도해주세요.</p>
          </div>
        )}

        {handleRetry && (
          <Button
            onClick={handleRetry}
            className='border bg-background text-foreground ring hover:bg-secondary active:bg-border active:ring-0 disabled:bg-border dark:active:bg-muted'
          >
            {/* focus:ring-0 focus-visible:ring  */}
            재요청
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorText;
