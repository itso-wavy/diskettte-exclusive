import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import { Button, CircularButton } from '@/components/form';
import { ProfileSkeleton, ProfileCard, FollowButton } from '.';
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
  const [followersCount, setFollowersCount] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (profileDetail?.followers !== undefined)
      setFollowersCount(profileDetail.followers);
  }, [profileDetail?.followers]);

  if (error) {
    if (isAxiosError(error)) console.log(error.response?.data);

    throw new Error();
  }

  return (
    <>
      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <ProfileCard
          username={username}
          profileDetail={profileDetail}
          followersCount={followersCount}
        />
      )}
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
                defaultIsFollowing={profileDetail?.isFollowing}
                defaultFollowersCount={followersCount}
                setFollowersCount={setFollowersCount}
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
