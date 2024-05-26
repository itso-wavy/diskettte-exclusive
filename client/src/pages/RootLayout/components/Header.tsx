import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import WavyDeco from '@/lib/assets/wave.svg?react';
import { RootState } from '@/lib/store';

const Header: React.FC = () => {
  const { isDarkmode } = useSelector((state: RootState) => state.theme);

  return (
    <header className='fixed z-20 w-full bg-background from-main via-gray-500/20 to-transparent pt-4 before:absolute before:bottom-0 before:right-0 before:inline-block before:h-px before:w-[calc(100vw-200px)] before:bg-gradient-to-l'>
      <h1 className='absolute h-[70px] w-fit rounded-ee-4xl bg-background px-5 pb-3 pt-0.5'>
        <Link to='/'>
          <img
            src={!isDarkmode ? '/logo.png' : '/logo-dark.png'}
            alt='diskettte exclusive'
            className='h-full hover:opacity-75'
          />
        </Link>
        <WavyDeco className='pointer-events-none absolute left-[60px] top-[70px] text-background' />
        <WavyDeco className='pointer-events-none absolute -right-[40px] top-0 text-background' />
      </h1>
    </header>
  );
};

export default Header;
