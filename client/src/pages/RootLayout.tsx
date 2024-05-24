import { Outlet } from 'react-router-dom';
import { Header, MainNav } from '@/components/common';

const RootLayout: React.FC = () => {
  return (
    <div className='container selection:bg-[#95e78e] selection:text-black'>
      <Header />
      <main className='flex'>
        <MainNav />
        <div className='w-full overflow-x-hidden p-4'>
          <div className='bg-gradient-circle -left-[250px] -top-[145px] rotate-180' />
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
