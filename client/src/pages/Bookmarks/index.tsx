import { useOutletContext } from 'react-router-dom';

import { PageWrapper, WidthWrapper } from '@/components/layout';
import { PostList } from './components';

import { UserLayoutContext } from '../UserLayout';

const Bookmarks: React.FC = () => {
  const { username, isUserMatch } = useOutletContext<UserLayoutContext>();

  if (!isUserMatch) throw new Error('User not match!😥');

  return (
    <PageWrapper>
      <WidthWrapper>
        <PostList username={username} />
      </WidthWrapper>
    </PageWrapper>
  );
};

export default Bookmarks;
