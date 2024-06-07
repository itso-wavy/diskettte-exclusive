import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { FeedPost, PostSkeleton } from '@/components/post';
import ErrorText from '@/components/ErrorText';

import { getPostDetail, postKeys } from '@/lib/queries/post';
import { Post as PostT } from '@/lib/types';

// import { getViewFeed, postKeys } from '@/lib/queries/post';
// import { Post } from '@/lib/types';

const PostWithComments: React.FC<{
  postId: string;
  usernameParam: string;
  isLoggedIn: boolean;
}> = ({ postId, usernameParam, isLoggedIn }) => {
  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: postKeys.postDetail({
      postId,
      username: usernameParam,
      isLoggedIn,
    }),
    queryFn: getPostDetail,
  });
  const post: PostT = response?.data;

  if (error) {
    let message;
    if (isAxiosError(error)) {
      console.log(error.response?.data);
      message = error.response?.status === 404 && error.response?.data.error;
    }

    return (
      <ErrorText
        message={message}
        handleRetry={refetch}
        className='h-[calc(100vh-191px)]'
      />
    );
  } else {
    return isLoading ? <PostSkeleton /> : <FeedPost post={post} />;
  }
};

export default PostWithComments;