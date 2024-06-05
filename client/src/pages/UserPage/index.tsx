import { useOutletContext } from 'react-router-dom';
import { PageWrapper, WidthWrapper } from '@/components/layout';

import { UserLayoutContext } from '../UserLayout';

const UserPage: React.FC = () => {
  const { usernameParam, isUserMatch } = useOutletContext<UserLayoutContext>();

  return (
    <PageWrapper>
      <WidthWrapper className='border-b'></WidthWrapper>
    </PageWrapper>
  );
};

export default UserPage;
