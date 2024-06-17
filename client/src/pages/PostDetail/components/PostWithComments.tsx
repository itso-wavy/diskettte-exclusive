import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { FeedPost, PostSkeleton } from '@/components/post';
import { PostComment } from '@/components/comment';
import { PostUIType } from '@/components/dialog';
import ErrorText from '@/components/ErrorText';

import { getPostDetail, postKeys } from '@/lib/queries/post';
import { Comment } from '@/lib/types';

const PostWithComments: React.FC<{
  postId: string;
  usernameParam: string;
  isLoggedIn: boolean;
  username: string;
}> = ({ postId, usernameParam, isLoggedIn, username }) => {
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
  const { post } = response?.data || {};

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
    return isLoading ? (
      <PostSkeleton />
    ) : (
      <>
        <FeedPost type={PostUIType.DETAIL} post={post} />
        <div>
          <div className='border-b py-3 text-[15px] font-medium sm:px-6 '>
            답글
          </div>
          {post?.comments.map((comment: Comment) => (
            <PostComment
              key={comment._id}
              post={post}
              comment={comment}
              username={username}
            />
          ))}
        </div>
      </>
    );
  }
};

export default PostWithComments;
