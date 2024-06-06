import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

import { NavLinkButton, NavMenuBlock } from '.';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { PostForm, DialogMode } from '@/components/dialog';
import Icon from '@/components/icons';

import { cn } from '@/lib/utils';
import { RootState } from '@/lib/store';

const MainNav: React.FC = () => {
  const [dialogMode, setDialogMode] = useState<DialogMode | null>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, username } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <Dialog>
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
          <DialogTrigger asChild>
            <NavLinkButton
              tooltip='Post'
              onClick={() => {
                isLoggedIn
                  ? setDialogMode(DialogMode.POST)
                  : toast('로그인이 필요합니다.');
              }}
            >
              <Icon.Post />
            </NavLinkButton>
          </DialogTrigger>
          <NavLinkButton
            tooltip='My Profile'
            onClick={() => navigate(`@${username}`)}
          >
            {pathname === `/@${username}` ? (
              <Icon.AtSign style={{ strokeWidth: 3 }} />
            ) : (
              <Icon.AtSign />
            )}
          </NavLinkButton>
          <NavMenuBlock />
        </ul>
      </nav>
      {dialogMode === DialogMode.POST && <PostForm username={username} />}
    </Dialog>
  );
};

export default MainNav;
