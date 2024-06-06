import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { PageWrapper, WidthWrapper } from '@/components/layout';
import { Button, CircularButton } from '@/components/form';
import { FeedLinkPost, PostSkeleton } from '@/components/post';
import ProfileAvatar from '@/components/ProfileAvatar';
import ErrorText from '@/components/ErrorText';
import Icon from '@/components/icons';

import { UserLayoutContext } from '../UserLayout';
import { postKeys, getUserPosts } from '@/lib/queries/post';
import { Post } from '@/lib/types';
import { cn } from '@/lib/utils';

const UserPage: React.FC = () => {
  const navigate = useNavigate();
  const { usernameParam, isUserMatch } = useOutletContext<UserLayoutContext>();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useQuery({
    // queryKey: ['posts', { username: usernameParam }],
    // queryFn: () => client(`post/${usernameParam}`),
    queryKey: postKeys.userPost(usernameParam),
    queryFn: getUserPosts,
  });
  const postList: Post[] = response?.data || [];

  let result;
  if (error) {
    if (isAxiosError(error)) console.log(error.response?.data);

    result = <ErrorText handleRetry={refetch} />;
  } else {
    result = isLoading
      ? Array(2)
          .fill(0)
          .map((_, index) => <PostSkeleton key={'wavy' + index} />)
      : postList?.map((post: Post) => {
          if (!post) return;
          return <FeedLinkPost key={post._id} post={post} />;
        });
  }

  return (
    <PageWrapper>
      <WidthWrapper className='border-b'>
        <div className='mb-5'>
          <div className='flex flex-col gap-x-5 gap-y-2 sm:flex-row'>
            <ProfileAvatar
              image={'profile.image'}
              nickname={usernameParam || ''}
              className='h-20 w-20 rounded-full hover:opacity-100 max-sm:ml-auto'
            />
            <div className='*:select break-words text-[15px] leading-tight'>
              <p className='text-xl font-medium'>{'profile.nickname'}</p>
              <p className='text-sm text-muted-foreground'>@{usernameParam}</p>
              <p className='mt-1'>{'profile.description'}</p>
              <div className='mt-4 flex gap-4 text-sm leading-[21px] text-muted-foreground underline-offset-[3px]'>
                <p className='cursor-pointer hover:underline'>following {1}</p>
                <p className='cursor-pointer hover:underline'>followers {1}</p>
              </div>
            </div>
          </div>
          {/* //TODO: */}
          <div className='my-3 flex items-center justify-between gap-x-3'>
            {isUserMatch ? (
              <>
                <div className='flex w-full'>
                  <Button
                    onClick={() => navigate('profile')}
                    className='w-full'
                  >
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
        </div>
      </WidthWrapper>
      <WidthWrapper>
        <div className='pt-4'>{result}</div>
      </WidthWrapper>
    </PageWrapper>
  );
};

export default UserPage;
