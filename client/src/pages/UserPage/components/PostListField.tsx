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
  console.log('posts: ', posts);

  if (error) {
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
            <p>마음에 드는 포스트를 찾아보세요!</p>
          </>
        }
        className='h-[calc(100vh-191px)]'
      />
    ) : (
      posts?.map((post: Post) => <FeedLinkPost key={post._id} post={post} />)
    );
  }
};

export default PostListField;
