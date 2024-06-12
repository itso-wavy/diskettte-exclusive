import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { FeedLinkPost, PostSkeleton } from '@/components/post';
import ErrorText from '@/components/ErrorText';

import { getUserBookmarks, postKeys } from '@/lib/queries/post';
import { Post } from '@/lib/types';

const PostList: React.FC<{ username: string }> = ({ username }) => {
  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: postKeys.bookmarkPost({ username }),
    queryFn: getUserBookmarks,
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
            <p>북마크한 포스트가 없습니다.</p>
            <p>마음에 드는 포스트를 찾아보세요!</p>
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
