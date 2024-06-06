import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';

import { FeedNav, FeedNavItem } from './components';
import { PageWrapper, WidthWrapper } from '@/components/layout';
import { FeedLinkPost, PostSkeleton } from '@/components/post';
import ErrorText from '@/components/ErrorText';

import { RootState } from '@/lib/store';
import { postKeys, getViewFeed } from '@/lib/queries/post';
import { Post } from '@/lib/types';

export type ViewT = 'everyone' | 'following';

const Feed: React.FC = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [view, setView] = useState<ViewT>('everyone');

  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useQuery({
    // queryKey: ['posts', { view, isLoggedIn }],
    // queryFn: () => client(!isLoggedIn ? `post/${view}` : `post/${view}/auth`),
    queryKey: postKeys.viewfeed({ view, isLoggedIn }),
    queryFn: getViewFeed,
  });
  const postList: Post[] = response?.data || [];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setView(e.currentTarget.value as ViewT);
  };

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
        <WidthWrapper>{result}</WidthWrapper>
      </PageWrapper>
    </div>
  );
};

export default Feed;
