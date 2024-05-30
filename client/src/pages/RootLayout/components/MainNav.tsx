import { useLocation, useNavigate } from 'react-router-dom';

import NavLink from './NavLink';
import NavSetting from './NavSetting';
import Icon from '@/components/icons';
import { cn } from '@/lib/utils';

const MainNav: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav className='fixed top-0 z-10 h-screen w-[60px] flex-shrink-0 bg-background from-gray-500/20 to-transparent px-2.5 py-[78px] text-foreground before:absolute before:bottom-0 before:right-0 before:inline-block before:h-[90%] before:w-px before:bg-gradient-to-t'>
      <ul className='relative flex h-full flex-col justify-center gap-4'>
        <NavLink tooltip='Home' onClick={() => navigate('/')}>
          <Icon.Home className={cn(pathname === '/' && 'svg-fill')} />
        </NavLink>
        <NavLink tooltip='Search' onClick={() => navigate('/search')}>
          {pathname === '/search' ? (
            <Icon.Search style={{ strokeWidth: 3.5 }} />
          ) : (
            <Icon.Search />
          )}
        </NavLink>
        <NavLink tooltip='Post' onClick={() => navigate('/post')}>
          <Icon.Post className={cn(pathname === '/post' && 'svg-fill')} />
        </NavLink>
        <NavLink tooltip='Bookmark' onClick={() => navigate('/bookmark')}>
          <Icon.Bookmark
            className={cn(pathname === '/bookmark' && 'svg-fill')}
          />
        </NavLink>
        <NavSetting />

        {/* <NavItem
          tooltip='Setting'
          onClick={() => {}}
          className='absolute bottom-0 w-[40px] rounded-full ring-2 ring-sub ring-offset-1 ring-offset-background *:rounded-full'
        >
          <Avatar>
            <AvatarImage
              src={profileImage}
              alt={'@' + nickname}
              className='hover:opacity-75'
            />
            <AvatarFallback className='bg-gradient-to-b from-gray-950/20 via-gray-950/5 to-white to-[75%] text-sm shadow-inner hover:bg-gray-500/5'>
              {nickname.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
        </NavItem> */}
      </ul>
    </nav>
  );
};

export default MainNav;
