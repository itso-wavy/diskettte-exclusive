import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import ProfileAvatar from '@/components/ProfileAvatar';
import Icon from '@/components/icons';
import { ThemeContext } from '@/context/themeContext';
import { ThemeState, themes } from '@/lib/types';
import { setDarkmode, setTheme } from '@/lib/store';
import { cn } from '@/lib/utils';

const NavSetting: React.FC = () => {
  let nickname = 'wavy';
  let profileImage = 'https://github.com/shadcn.png';
  let isLogin = false;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDarkmode } = useContext<ThemeState | null>(ThemeContext)!;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='absolute bottom-0 w-[40px] rounded-full ring-[3px] ring-main ring-offset-1 ring-offset-background *:rounded-full focus:outline-none'>
          <ProfileAvatar nickname={nickname} image={profileImage} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          isDarkmode && 'dark',
          `w-44 -translate-y-1.5 translate-x-2 font-mono`
        )}
      >
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={e => e.preventDefault()}
            className='cursor-default'
          >
            <label htmlFor='darkmode-toggle' onClick={e => e.stopPropagation()}>
              Darkmode
            </label>
            <Switch
              id='darkmode-toggle'
              checked={isDarkmode}
              onCheckedChange={() => dispatch(setDarkmode(!isDarkmode))}
              className='relative ml-auto h-6 w-[3.25rem]'
              handleClassName='data-[state=checked]:translate-x-[1.75rem] w-5 h-5'
            >
              <Icon.Moon
                viewBox='0 0 24 24'
                className='absolute left-0.5 h-4 w-4 text-background'
              />
              <Icon.Sun
                viewBox='0 0 24 24'
                className='absolute right-0.5 h-4 w-4'
              />
            </Switch>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              Colors
              <span className='ml-2 aspect-square w-3 rounded-full bg-main'></span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className={cn(isDarkmode && 'dark')}>
                <div className='grid grid-flow-col'>
                  {themes.map(theme => (
                    <DropdownMenuItem
                      key={theme}
                      onClick={() => dispatch(setTheme(theme))}
                      className={`theme-${theme}`} // here!
                    >
                      <div
                        id={`theme-${theme}`}
                        className='aspect-square w-3 rounded border bg-main'
                      />
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {!isLogin ? (
            <>
              <DropdownMenuItem onClick={() => console.log('Log in')}>
                <Icon.LogIn viewBox='0 0 24 24' className='mr-2 h-4 w-4' />
                Login
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log('Join')}>
                <Icon.Join viewBox='0 0 24 24' className='mr-2 h-4 w-4' />
                Join us
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem onClick={() => navigate('profile')}>
                <Icon.Profile viewBox='0 0 24 24' className='mr-2 h-4 w-4' />
                Change Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log('Log out')}>
                <Icon.LogOut viewBox='0 0 24 24' className='mr-2 h-4 w-4' />
                Log out
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <a
            target='_blank'
            href='https://diskettte.vercel.app/'
            className='flex'
          >
            <Icon.Diskette viewBox='0 0 24 24' className='mr-2 h-4 w-4' />
            Go to Diskettte
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavSetting;
