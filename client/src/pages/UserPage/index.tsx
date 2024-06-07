import { useOutletContext } from 'react-router-dom';

import { PageWrapper, WidthWrapper } from '@/components/layout';
import { ProfileField, PostListField } from './components';

import { UserLayoutContext } from '../UserLayout';

const UserPage: React.FC = () => {
  const { usernameParam, isUserMatch, isLoggedIn } =
    useOutletContext<UserLayoutContext>();

  return (
    <PageWrapper>
      <WidthWrapper className='border-b'>
        <div className='mb-5'>
          <ProfileField username={usernameParam} isUserMatch={isUserMatch} />
        </div>
      </WidthWrapper>
      <WidthWrapper>
        <div className='pt-4'>
          <PostListField username={usernameParam} isLoggedIn={isLoggedIn} />
        </div>
      </WidthWrapper>
    </PageWrapper>
  );
};

export default UserPage;
