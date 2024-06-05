import { useOutletContext, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { PageWrapper, WidthWrapper } from '@/components/layout';
import { FeedPost, PostSkeleton } from '@/components/post';
import ErrorText from '@/components/ErrorText';

import client from '@/lib/services';
import { UserLayoutContext } from '../UserLayout';
import { Post } from '@/lib/types';

const PostDetail: React.FC = () => {
  const { postId } = useParams();
  const { usernameParam, isLoggedIn } = useOutletContext<UserLayoutContext>();

  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['post', { postId }, { isLoggedIn }],
    queryFn: () =>
      client(
        !isLoggedIn
          ? `post/${usernameParam}/${postId}`
          : `post/${usernameParam}/${postId}/auth`
      ),
    retry: 3,
  });
  const post: Post = response?.data;

  let result;
  if (error) {
    console.log(error);

    result = <ErrorText />;
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
