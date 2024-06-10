import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import { Button, CircularButton } from '@/components/form';
import { ProfileSkeleton, FollowButton } from '.';
import ProfileAvatar from '@/components/ProfileAvatar';
import Icon from '@/components/icons';

import { profileKeys, getUserProfile } from '@/lib/queries/profile';

const ProfileField: React.FC<{
  username: string;
  isLoggedIn: boolean;
  isUserMatch: boolean;
}> = ({ username, isLoggedIn, isUserMatch }) => {
  const navigate = useNavigate();

  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: profileKeys.userProfile({ username, isLoggedIn }),
    queryFn: getUserProfile,
  });
  const { profileDetail } = response?.data || {};

  if (error) {
    if (isAxiosError(error)) console.log(error.response?.data);

    throw new Error();
  }

  const profileSection = isLoading ? (
    <ProfileSkeleton />
  ) : (
    <div className='flex flex-col gap-x-5 gap-y-2 sm:flex-row'>
      <ProfileAvatar
        image={profileDetail.profile.image}
        nickname={username || ''}
        className='h-20 w-20 rounded-full hover:opacity-100 max-sm:ml-auto'
      />
      <div className='*:select break-words text-[15px] leading-tight'>
        <p className='text-xl font-medium'>{profileDetail.profile.nickname}</p>
        <p className='text-sm text-muted-foreground'>
          @{profileDetail.username}
        </p>
        <p className='mt-1 leading-[1.15rem]'>
          {profileDetail.profile.description}
        </p>
        <div className='mt-3 flex gap-4 text-sm leading-[21px] text-muted-foreground underline-offset-[3px]'>
          <p className='cursor-pointer hover:underline'>
            following {profileDetail.following}
          </p>
          <p className='cursor-pointer hover:underline'>
            followers {profileDetail.followers}
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
              <FollowButton
                username={username}
                isLoggedIn={isLoggedIn}
                defaultFollowing={profileDetail?.isFollowing}
              />
            </div>
            <CircularButton
              onClick={() => toast('DM!💌')}
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
