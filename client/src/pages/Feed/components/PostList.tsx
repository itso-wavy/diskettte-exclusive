import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { FeedLinkPost, PostSkeleton } from '@/components/post';
import ErrorText from '@/components/ErrorText';

import { getViewFeed, postKeys } from '@/lib/queries/post';
import { Post } from '@/lib/types';
import { ViewT } from '..';

const PostList: React.FC<{ view: ViewT; isLoggedIn: boolean }> = ({
  view,
  isLoggedIn,
}) => {
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

  if (error) {
    if (isAxiosError(error)) console.log(error.response?.data);

    return (
      <ErrorText handleRetry={refetch} className='h-[calc(100vh-191px)]' />
    );
  } else {
    return isLoading
      ? Array(2)
          .fill(0)
          .map((_, index) => <PostSkeleton key={'wavy' + index} />)
      : postList?.map((post: Post) => {
          if (!post) return;
          return <FeedLinkPost key={post._id} post={post} />;
        });
  }
};

export default PostList;
