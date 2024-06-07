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
  const postList: Post[] = response?.data || [];

  if (error) {
    if (isAxiosError(error)) console.log(error.response?.data);

    return (
      <ErrorText handleRetry={refetch} className='h-[calc(100vh-419px)]' />
    );
  } else {
    return isLoading ? (
      <Loader className='h-[calc(100vh-419px)]' />
    ) : (
      postList?.map((post: Post) => {
        if (!post) return;
        return <FeedLinkPost key={post._id} post={post} />;
      })
    );
  }
};

export default PostListField;
