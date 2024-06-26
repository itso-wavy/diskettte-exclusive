import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { FeedLinkPost } from '@/components/post';
import ErrorText from '@/components/ErrorText';
import Loader from '@/components/Loader';

import { postKeys, getUserPosts } from '@/lib/queries/post';
import { Post } from '@/lib/types';

const PostListField: React.FC<{ username: string; isLoggedIn: boolean }> = ({
  username,
  isLoggedIn,
}) => {
  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: postKeys.userPost({ username, isLoggedIn }),
    queryFn: getUserPosts,
  });
  const { posts } = response?.data || {};

  if (error) {
    console.log(error);

    if (isAxiosError(error)) console.log(error.response?.data);

    return (
      <ErrorText handleRetry={refetch} className='h-[calc(100vh-419px)]' />
    );
  }

  if (isLoading) {
    return <Loader className='h-[calc(100vh-419px)]' />;
  } else {
    return !posts.length ? (
      <ErrorText
        message={
          <>
            <p>작성한 포스트가 없습니다.</p>
            <p>새로운 아이디어를 기록해보세요!</p>
          </>
        }
        className='h-[calc(100vh-419px-38px)]'
      />
    ) : (
      posts?.map((post: Post) => <FeedLinkPost key={post._id} post={post} />)
    );
  }
};

export default PostListField;
