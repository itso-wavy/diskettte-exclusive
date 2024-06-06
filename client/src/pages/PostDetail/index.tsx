import { useOutletContext, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { PageWrapper, WidthWrapper } from '@/components/layout';
import { FeedPost, PostSkeleton } from '@/components/post';
import ErrorText from '@/components/ErrorText';

import { UserLayoutContext } from '../UserLayout';
import { postKeys, getPostDetail } from '@/lib/queries/post';
import { Post } from '@/lib/types';

const PostDetail: React.FC = () => {
  const { postId } = useParams();
  const { usernameParam, isLoggedIn } = useOutletContext<UserLayoutContext>();

  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useQuery({
    // queryKey: ['posts', { postId, username: usernameParam, isLoggedIn }],
    // queryFn: () =>
    //   client(
    //     !isLoggedIn
    //       ? `post/${usernameParam}/${postId}`
    //       : `post/${usernameParam}/${postId}/auth`
    //   ),
    queryKey: postKeys.postDetail({
      postId,
      username: usernameParam,
      isLoggedIn,
    }),
    queryFn: getPostDetail,
  });
  const post: Post = response?.data;

  let result;
  if (error) {
    if (isAxiosError(error)) console.log(error.response?.data);

    result = <ErrorText handleRetry={refetch} />;
  } else {
    result = isLoading ? <PostSkeleton /> : <FeedPost post={post} />;
  }

  return (
    <PageWrapper>
      <WidthWrapper>{result}</WidthWrapper>
    </PageWrapper>
  );
};

export default PostDetail;
