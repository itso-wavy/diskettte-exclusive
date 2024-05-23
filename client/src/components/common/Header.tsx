import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className='relative z-10 bg-white pt-4'>
      <h1 className='rounded-ee-4xl absolute h-[70px] w-fit bg-inherit px-5 py-2'>
        <Link to='/'>
          <img src='/logo.png' alt='diskettte exclusive' className='h-full' />
        </Link>
        <WavyDeco className='absolute left-[60px] top-[70px]' />
        <WavyDeco className='absolute -right-[40px] top-0' />
      </h1>
    </header>
  );
};

const WavyDeco: React.FC<{ className: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      width={40}
      height={40}
      viewBox='0 0 40 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M40 0H0V40C0 17.9086 17.9086 0 40 0Z'
        fill='white'
      />
    </svg>
  );
};

export default Header;
