import Errorball from '@/lib/assets/errorball.svg?react';

const Error: React.FC = () => {
  return (
    <div className='container text-center'>
      <h1 className='pt-32 text-4xl font-black uppercase italic'>Error!</h1>
      <div className='relative m-auto w-full max-w-[620px] animate-bounce md:-top-1'>
        <Errorball />
      </div>
    </div>
  );
};

export default Error;
