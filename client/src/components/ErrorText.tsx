import { Button } from './form';

const ErrorText: React.FC<{ handleRetry: () => void }> = ({ handleRetry }) => {
  return (
    <div className='absolute bottom-0 left-0 grid h-[calc(100%-65px)] w-full place-content-center gap-y-2 text-center text-xs'>
      <div className='flex flex-col gap-y-1'>
        <p>에러가 발생했습니다.</p>
        <p>잠시 후 다시 시도해주세요.</p>
      </div>
      <Button
        onClick={handleRetry}
        className='border bg-background text-foreground hover:bg-secondary focus:ring-0 focus-visible:ring active:bg-border active:ring-0 disabled:bg-border dark:active:bg-muted'
      >
        재요청
      </Button>
    </div>
  );
};

export default ErrorText;
