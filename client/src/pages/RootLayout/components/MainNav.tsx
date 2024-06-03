import { useLocation, useNavigate } from 'react-router-dom';

import { NavLinkButton, NavMenuBlock } from '.';
import Icon from '@/components/icons';

import { cn } from '@/lib/utils';

const MainNav: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav className='fixed top-0 z-10 h-screen w-[60px] flex-shrink-0 bg-background from-gray-500/20 to-transparent px-2.5 py-[78px] text-foreground before:absolute before:bottom-0 before:right-0 before:inline-block before:h-[90%] before:w-px before:bg-gradient-to-t'>
      <ul className='relative flex h-full flex-col justify-center gap-4'>
        <NavLinkButton tooltip='Home' onClick={() => navigate('/')}>
          <Icon.Home className={cn(pathname === '/' && 'svg-fill')} />
        </NavLinkButton>
        <NavLinkButton tooltip='Search' onClick={() => navigate('/search')}>
          {pathname === '/search' ? (
            <Icon.Search style={{ strokeWidth: 3.5 }} />
          ) : (
            <Icon.Search />
          )}
        </NavLinkButton>
        <NavLinkButton tooltip='Post' onClick={() => navigate('/post')}>
          <Icon.Post className={cn(pathname === '/post' && 'svg-fill')} />
        </NavLinkButton>
        <NavLinkButton tooltip='Bookmark' onClick={() => navigate('/bookmark')}>
          <Icon.Bookmark
            className={cn(pathname === '/bookmark' && 'svg-fill')}
          />
        </NavLinkButton>
        <NavMenuBlock />
      </ul>
    </nav>
  );
};

export default MainNav;
