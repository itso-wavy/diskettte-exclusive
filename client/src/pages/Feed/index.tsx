import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { FeedNav, FeedNavItem, View } from './components';
import { PageWrapper, WidthWrapper } from '@/components/layout';
import { FeedPost, PostSkeleton } from '@/components/post';
import ErrorText from '@/components/ErrorText';

import client from '@/lib/services';
import { RootState } from '@/lib/store';
import { Post } from '@/lib/types';

const Feed: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const [view, setView] = useState<View>('everyone');
  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['post', { view }, { isLoggedIn }],
    queryFn: () => client(!isLoggedIn ? `post/${view}` : `post/${view}/auth`),
    // retry: 3,
    // retryDelay: 100,
  });
  const postList: Post[] = response?.data || [];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setView(e.currentTarget.value as View);
  };

  let result;
  if (error) {
    console.log(error);

    result = <ErrorText />;
  } else {
    result = isLoading
      ? Array(2)
          .fill(0)
          .map((_, index) => <PostSkeleton key={'wavy' + index} />)
      : postList?.map((post: Post) => {
          if (!post) return;
          return (
            <div
              key={post._id}
              onClick={() => navigate(`/@${post.writer.username}/${post._id}`)}
              className='cursor-pointer'
            >
              <FeedPost post={post} />
            </div>
          );
        });
  }

  return (
    <div>
      <FeedNav className='fixed right-4 top-10 sm:left-[60px] sm:right-0 sm:mx-auto'>
        <FeedNavItem
          value='following'
          view={view}
          onClick={
            isLoggedIn ? handleClick : () => toast('로그인이 필요합니다.')
          }
        />
        <FeedNavItem value='everyone' view={view} onClick={handleClick} />
      </FeedNav>
      <PageWrapper className='mt-24 sm:mt-20'>
        <WidthWrapper>
          {result}
          {/* {error ? <ErrorText /> : null}
          {!error &&
            isLoading &&
            Array(3)
              .fill(0)
              .map((_, index) => <PostSkeleton key={'wavy' + index} />)}
          {!error &&
            !isLoading &&
            postList?.map((post: Post) => (
              <div
                key={post._id.toString()}
                onClick={() =>
                  navigate(`/@${post.writer.username}/${post._id}`)
                }
                className='cursor-pointer'
              >
                <FeedPost post={post} />
              </div>
            ))} */}
        </WidthWrapper>
      </PageWrapper>
    </div>
  );
};

export default Feed;
