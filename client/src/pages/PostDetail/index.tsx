import { useOutletContext, useParams } from 'react-router-dom';

import { PageWrapper, WidthWrapper } from '@/components/layout';
import { PostWithComments } from './components';

import { UserLayoutContext } from '../UserLayout';

const PostDetail: React.FC = () => {
  const { postId } = useParams();
  const { usernameParam, isLoggedIn } = useOutletContext<UserLayoutContext>();

  return (
    <PageWrapper>
      <WidthWrapper>
        <PostWithComments
          postId={postId!}
          usernameParam={usernameParam}
          isLoggedIn={isLoggedIn}
        />
      </WidthWrapper>
    </PageWrapper>
  );
};

export default PostDetail;
