import { useOutletContext, useParams } from 'react-router-dom';

import { UserLayoutContext } from '../UserLayout';
import { PageWrapper, WidthWrapper } from '@/components/layout';

const PostDetail: React.FC = () => {
  const { postId } = useParams();
  const { usernameParam, isLoggedIn } = useOutletContext<UserLayoutContext>();

  return (
    <PageWrapper>
      <WidthWrapper>{'result'}</WidthWrapper>
    </PageWrapper>
  );
};

export default PostDetail;
