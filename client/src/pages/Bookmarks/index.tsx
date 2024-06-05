import PageWrapper from '@/components/layout/PageWrapper';
import { useOutletContext } from 'react-router-dom';
import { UserLayoutContext } from '../UserLayout';

const Bookmarks: React.FC = () => {
  const { isUserMatch } = useOutletContext<UserLayoutContext>();

  if (!isUserMatch) throw new Error('User not match!😥');

  return <PageWrapper>Bookmarks</PageWrapper>;
};

export default Bookmarks;
