import { Outlet } from 'react-router-dom';
import { Header, MainNav } from './components';

const RootLayout: React.FC = () => {
  return (
    <div className='container selection:bg-sub selection:text-foreground'>
      <Header />
      <main className='flex'>
        <MainNav />
        <div className='ml-auto w-[calc(100vw-70px)] p-4 min-h-screen'>
          <div className='bg-gradient-circle pointer-events-none -left-[250px] -top-[145px] rotate-180' />
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
