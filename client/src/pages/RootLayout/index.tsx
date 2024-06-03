import { Outlet } from 'react-router-dom';
import { Header, MainNav } from './components';

const RootLayout: React.FC = () => {
  return (
    <div className='selection:bg-beta container selection:text-foreground'>
      <Header />
      <main className='flex'>
        <MainNav />
        <div className='ml-auto min-h-screen w-[calc(100vw-70px)] p-4 pb-[95px]'>
          <div className='bg-gradient-circle pointer-events-none fixed -left-[250px] -top-[145px] rotate-180' />
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RootLayout;