import { Outlet } from 'react-router-dom';
import { Header, MainNav } from '@/components/common';

const RootLayout: React.FC = () => {
  return (
    <div className='container selection:bg-[#95e78e] selection:text-black'>
      <Header />
      <main className='flex'>
        <MainNav />
        <div className='w-full p-4'>
          <span className='bg-gradient-theme absolute -left-[250px] -top-[145px] -z-10 h-[650px] w-[650px] rotate-180 rounded-full opacity-30 blur-[90px]' />
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
