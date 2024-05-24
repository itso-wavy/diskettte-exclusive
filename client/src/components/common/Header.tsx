import { Link } from 'react-router-dom';
import WavyDeco from '@/lib/assets/wave.svg?react';

const Header: React.FC = () => {
  return (
    <header className='relative z-10 bg-white pt-4'>
      <h1 className='rounded-ee-4xl absolute h-[70px] w-fit bg-inherit px-5 pb-3 pt-0.5'>
        <Link to='/'>
          <img
            src='/logo.png'
            alt='diskettte exclusive'
            className='h-full hover:opacity-75'
          />
        </Link>
        <WavyDeco className='absolute left-[60px] top-[70px]' />
        <WavyDeco className='absolute -right-[40px] top-0' />
      </h1>
    </header>
  );
};

export default Header;
