import { cn } from '@/lib/utils/cn';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

const MainNav: React.FC = () => {
  let nickname = 'wavy';

  return (
    <nav className='sticky top-0 h-screen w-[60px] flex-shrink-0 bg-white px-2.5 py-[78px]'>
      <ul className='relative flex h-full flex-col justify-center gap-4'>
        <NavLink to='/' tooltip='Home'>
          <img src='/home.svg' alt='home' />
        </NavLink>
        <NavLink to='/search' tooltip='Search'>
          <img src='/search.svg' alt='search' />
        </NavLink>
        <NavLink to='/post' tooltip='Post'>
          <img src='/post.svg' alt='post' />
        </NavLink>
        <NavLink to='/liked' tooltip='Liked'>
          <img src='/like.svg' alt='liked' />
        </NavLink>
        <NavLink
          to='/profile'
          tooltip='Profile'
          className='absolute bottom-0 w-[40px] text-sm *:rounded-full'
        >
          <img src='' alt={'@' + nickname} />
        </NavLink>
      </ul>
    </nav>
  );
};

const NavLink = ({
  to,
  tooltip,
  className,
  children,
}: PropsWithChildren<{ to: string; tooltip: string; className?: string }>) => {
  return (
    <li className={cn('relative', className)}>
      <Link
        to={to}
        className='grid aspect-square w-full place-content-center overflow-hidden rounded-lg border'
      >
        {children}
        <p className='absolute left-12 top-2 rounded-md bg-gray-950 px-2.5 py-1 text-xs text-white'>
          {tooltip}
        </p>
      </Link>
    </li>
  );
};
export default MainNav;
