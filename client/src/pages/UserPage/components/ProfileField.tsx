import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Button, CircularButton } from '@/components/form';
import ProfileAvatar from '@/components/ProfileAvatar';
import ProfileSkeleton from './ProfileSkeleton';
import Icon from '@/components/icons';

import { profileKeys, getUserProfile } from '@/lib/queries/profile';
import { cn } from '@/lib/utils';
import { ProfileDetail } from '@/lib/types';

const ProfileField: React.FC<{
  username: string;
  isUserMatch: boolean;
}> = ({ username, isUserMatch }) => {
  const navigate = useNavigate();
  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: profileKeys.userProfile({ username, isUserMatch }),
    queryFn: getUserProfile,
  });
  const body = response?.data;

  const [isFollowing, setIsFollowing] = useState<boolean | undefined>(
    body.profile.isFollowing
  );

  if (error) {
    throw new Error('😥사용자 이름을 확인해주세요.');
  }

  const profileSection = isLoading ? (
    <ProfileSkeleton />
  ) : (
    <div className='flex flex-col gap-x-5 gap-y-2 sm:flex-row'>
      <ProfileAvatar
        image={body.profile.profile.image}
        nickname={username || ''}
        className='h-20 w-20 rounded-full hover:opacity-100 max-sm:ml-auto'
      />
      <div className='*:select break-words text-[15px] leading-tight'>
        <p className='text-xl font-medium'>{body.profile.profile.nickname}</p>
        <p className='text-sm text-muted-foreground'>
          @{body.profile.username}
        </p>
        <p className='mt-1 leading-[1.15rem]'>
          {body.profile.profile.description}
        </p>
        <div className='mt-3 flex gap-4 text-sm leading-[21px] text-muted-foreground underline-offset-[3px]'>
          <p className='cursor-pointer hover:underline'>
            following {body.profile.following}
          </p>
          <p className='cursor-pointer hover:underline'>
            followers {body.profile.followers}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {profileSection}
      <div className='my-3 flex items-center justify-between gap-x-3'>
        {isUserMatch ? (
          <>
            <div className='flex w-full'>
              <Button onClick={() => navigate('profile')} className='w-full'>
                edit profile
              </Button>
            </div>
            <CircularButton
              onClick={() => navigate('bookmark')}
              className='h-10 w-10 border p-2'
            >
              <Icon.Bookmark viewBox='0 0 24 24' />
            </CircularButton>
          </>
        ) : (
          <>
            <div className='flex w-full'>
              <Button
                onClick={() => setIsFollowing(prev => !prev)}
                className={cn(
                  'w-full bg-gamma hover:ring',
                  isFollowing && 'bg-alpha'
                )}
              >
                {isFollowing ? 'following' : 'follow'}
              </Button>
            </div>
            <CircularButton
              onClick={() => console.log('reply')}
              className='h-10 w-10 border p-2'
            >
              <Icon.Message
                viewBox='0 0 24 24'
                className='relative right-0.5 top-0.5'
              />
            </CircularButton>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileField;
