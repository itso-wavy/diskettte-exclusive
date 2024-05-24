import { PropsWithChildren } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils/cn';
import Icons from '@/lib/assets/Icons';

const MainNav: React.FC = () => {
  let nickname = 'wavy';
  let profileImage = 'https://github.com/shadcn.png';
  const { pathname } = useLocation();

  return (
    <nav className='sticky top-0 h-[calc(100vh-16px)] w-[60px] flex-shrink-0 bg-white px-2.5 py-[78px]'>
      <ul className='relative flex h-full flex-col justify-center gap-4'>
        <NavLink to='/' tooltip='Home'>
          {pathname === '/' ? <Icons.HomeFill /> : <Icons.Home />}
        </NavLink>
        <NavLink to='/search' tooltip='Search'>
          {pathname === '/search' ? (
            <Icons.Search style={{ strokeWidth: 3.5 }} />
          ) : (
            <Icons.Search />
          )}
        </NavLink>
        <NavLink to='/post' tooltip='Post'>
          {pathname === '/post' ? <Icons.PostFill /> : <Icons.Post />}
        </NavLink>
        <NavLink to='/liked' tooltip='Liked'>
          {pathname === '/liked' ? <Icons.HeartFill /> : <Icons.Heart />}
        </NavLink>
        <NavLink
          to='/profile'
          tooltip='Setting'
          className='absolute bottom-0 w-[40px] text-sm *:rounded-full'
        >
          <Avatar>
            <AvatarImage
              src={profileImage}
              alt={'@' + nickname}
              className='hover:opacity-75'
            />
            <AvatarFallback className='bg-gradient-to-b from-gray-950/20 via-gray-950/5 to-white to-[75%] shadow-inner hover:bg-gray-500/5'>
              {nickname.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
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
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Link
              to={to}
              className='grid aspect-square w-full place-content-center overflow-hidden rounded-lg border hover:bg-gray-500/10'
            >
              {children}
            </Link>
          </TooltipTrigger>
          <TooltipContent
            side='right'
            className='bg-gray-950 px-2.5 py-1 text-xs text-white'
          >
            {tooltip}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </li>
  );
};

export default MainNav;
