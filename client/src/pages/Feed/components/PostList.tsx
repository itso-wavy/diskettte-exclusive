import { useNavigate } from 'react-router-dom';
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
    queryKey: postKeys.viewfeed({ view, isLoggedIn }),
    queryFn: getViewFeed,
  });
  const { posts } = response?.data || {};
  const navigate = useNavigate();

  if (error) {
    if (isAxiosError(error)) console.log(error.response?.data);

    return (
      <ErrorText handleRetry={refetch} className='h-[calc(100vh-191px)]' />
    );
  }

  if (isLoading) {
    return Array(2)
      .fill(0)
      .map((_, index) => <PostSkeleton key={'wavy' + index} />);
  } else {
    return !posts.length ? (
      <ErrorText
        message={
          <>
            <p>팔로우한 유저가 없습니다.</p>
            <p>관심 있는 유저를 팔로우해보세요!</p>
          </>
        }
        handleRetry={() => navigate('/search')}
        buttonText='검색'
        className='h-[calc(100vh-191px)]'
      />
    ) : (
      posts?.map((post: Post) => <FeedLinkPost key={post._id} post={post} />)
    );
  }
};

export default PostList;
