import { useContext } from 'react';

import ProfileAvatar from '@/components/ProfileAvatar';

import { FollowContext, FollowContextProps } from '@/context/followContext';

const ProfileCard: React.FC<{
  username: string;
}> = ({ username }) => {
  const { profileDetail, followersCount } =
    useContext<FollowContextProps | null>(FollowContext)!;

  return (
    <div className='flex flex-col gap-x-5 gap-y-2 sm:flex-row'>
      <ProfileAvatar
        image={profileDetail?.profile.image}
        nickname={username || ''}
        className='h-20 w-20 rounded-full hover:opacity-100 max-sm:ml-auto'
      />
      <div className='*:select break-words text-[15px] leading-tight'>
        <p className='text-xl font-medium'>{profileDetail?.profile.nickname}</p>
        <p className='text-sm text-muted-foreground'>
          @{profileDetail?.username}
        </p>
        <p className='mt-1 leading-[1.15rem]'>
          {profileDetail?.profile.description}
        </p>
        <div className='mt-3 flex gap-4 text-sm leading-[21px] text-muted-foreground underline-offset-[3px]'>
          <p className='cursor-pointer hover:underline'>
            following {profileDetail?.following}
          </p>
          <p className='cursor-pointer hover:underline'>
            followers {followersCount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
