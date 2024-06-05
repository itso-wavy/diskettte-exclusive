const ErrorText: React.FC = () => {
  return (
    <div className='absolute bottom-0 left-0 grid h-[calc(100%-65px)] w-full place-content-center gap-y-1 text-center text-xs'>
      <p>에러가 발생했습니다.</p>
      <p>잠시 후 다시 시도해주세요.</p>
    </div>
  );
};

export default ErrorText;
