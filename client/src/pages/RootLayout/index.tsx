import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';

import { Header, MainNav } from './components';

const RootLayout: React.FC = () => {
  return (
    <div className='container selection:bg-beta selection:text-foreground'>
      <Header />
      <main className='flex'>
        <MainNav />
        <div className='ml-auto min-h-screen w-[calc(100vw-(100vw-100%)-60px)] p-4 pb-[95px]'>
          <div className='bg-gradient-circle pointer-events-none fixed -left-[250px] -top-[145px] rotate-180' />
          <Outlet />
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default RootLayout;
