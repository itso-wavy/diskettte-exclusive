import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import ProfileAvatar from '@/components/ProfileAvatar';
import {
  FormMode,
  LoginForm,
  // ProfileForm,
  RegisterForm,
} from '@/components/form';
import Icon from '@/components/icons';

import { RootState, setDarkmode, setLogout, setTheme } from '@/lib/store';
import { ThemeState, themes } from '@/lib/types';
import { cn } from '@/lib/utils';

const NavMenuBlock: React.FC = () => {
  const [formMode, setFormMode] = useState<FormMode>(FormMode.LOGIN);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { isDarkmode } = useSelector((state: RootState) => state.theme);
  const { profile } = useSelector((state: RootState) => state.user);
  // const handleLogout = () => dispatch(setLogout());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='absolute bottom-0 w-[40px] rounded-full ring-[3px] ring-alpha ring-offset-1 ring-offset-background *:rounded-full focus:outline-none'>
            <ProfileAvatar nickname={profile.nickname} image={profile.image} />
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
              <label
                htmlFor='darkmode-toggle'
                onClick={e => e.stopPropagation()}
              >
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
                <span className='ml-2 aspect-square w-3 rounded-full bg-alpha'></span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className={cn(isDarkmode && 'dark')}>
                  <div className='grid grid-flow-col'>
                    {themes.map(theme => (
                      <DropdownMenuItem
                        key={theme}
                        onClick={() => dispatch(setTheme(theme))}
                        className={`theme-${theme}`}
                      >
                        <div
                          id={`theme-${theme}`}
                          className='aspect-square w-3 rounded border bg-alpha'
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
            {!isLoggedIn ? (
              <>
                <DialogTrigger asChild>
                  <DropdownMenuItem onClick={() => setFormMode(FormMode.LOGIN)}>
                    <Icon.LogIn viewBox='0 0 24 24' className='mr-2 h-4 w-4' />
                    Login
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onClick={() => setFormMode(FormMode.REGISTER)}
                  >
                    <Icon.Join viewBox='0 0 24 24' className='mr-2 h-4 w-4' />
                    Join us
                  </DropdownMenuItem>
                </DialogTrigger>
              </>
            ) : (
              <>
                {/* <DialogTrigger asChild> */}
                {/* <DropdownMenuItem onClick={() => setFormMode(FormMode.PROFILE)}> */}
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <Icon.Profile viewBox='0 0 24 24' className='mr-2 h-4 w-4' />
                  Change Profile
                </DropdownMenuItem>
                {/* </DialogTrigger> */}
                <DropdownMenuItem onClick={() => dispatch(setLogout())}>
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
      {formMode === FormMode.LOGIN && <LoginForm />}
      {formMode === FormMode.REGISTER && <RegisterForm />}
      {/* {formMode === FormMode.PROFILE && <ProfileForm />} */}
    </Dialog>
  );
};

export default NavMenuBlock;
