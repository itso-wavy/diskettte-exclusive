import { Link, Outlet } from 'react-router-dom';

const RootLayout: React.FC = () => {
  return (
    <div className='*:select container selection:bg-indigo-300/90'>
      <header>
        <h1>
          <Link to='/'>
            <img src='/logo.png' alt='diskettte exclusive' />
          </Link>
        </h1>
      </header>
      <main className='h-[1000px] w-[2000px]'>
        <Outlet />
      </main>
      <footer>footer</footer>
    </div>
  );
};

export default RootLayout;
