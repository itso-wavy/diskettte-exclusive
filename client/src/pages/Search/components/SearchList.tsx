import { Post } from '@/components/post';
import { FollowButton } from '@/pages/UserPage/components';

import FollowProvider from '@/context/followContext';
import { ProfileDetail } from '@/lib/types';

const SearchList: React.FC<{
  isLoggedIn: boolean;
  result: ProfileDetail[];
}> = ({ isLoggedIn, result }) => {
  return (
    <>
      {result &&
        result.map((userProfile: ProfileDetail) => (
          <FollowProvider key={Math.random()} profileDetail={userProfile}>
            <Post.Layout
              key={userProfile.username}
              avatarPart={
                <Post.AvatarLink
                  to={`/@${userProfile.username}`}
                  image={userProfile.profile.image}
                  nickname={userProfile.profile.nickname}
                  // className='h-9 w-9 overflow-hidden rounded-full'
                />
              }
              topLinePart={
                <div className='flex flex-col gap-x-1.5 sm:flex-row'>
                  <Post.UsernameLink
                    to={`/@${userProfile.username}`}
                    username={userProfile.profile.nickname}
                  />
                  <p className='select text-sm text-muted-foreground'>
                    @{userProfile.username}
                  </p>
                </div>
              }
            >
              <div className='relative flex justify-between'>
                <p className='select mt-1 w-full text-pretty text-sm sm:text-[16px]'>
                  팔로워{' '}
                  {new Intl.NumberFormat('ko-KR').format(userProfile.followers)}
                  명
                </p>
                <FollowButton
                  username={userProfile.username}
                  isLoggedIn={isLoggedIn}
                  defaultIsFollowing={userProfile.isFollowing}
                  className='relative bottom-5 ml-auto h-fit w-28 px-3 py-1.5 text-[13px] sm:bottom-2 sm:text-sm'
                />
              </div>
            </Post.Layout>
          </FollowProvider>
        ))}
    </>
  );
};

export default SearchList;
