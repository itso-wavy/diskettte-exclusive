import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { PageWrapper, WidthWrapper } from '@/components/layout';
import { ProfileForm } from '@/components/form';

import { RootState } from '@/lib/store';
import { UserLayoutContext } from '../UserLayout';

const Profile: React.FC = () => {
  const { isUserMatch } = useOutletContext<UserLayoutContext>();
  const { profile } = useSelector((state: RootState) => state.user);

  if (!isUserMatch) throw new Error('User not match!😥');

  return (
    <PageWrapper>
      <WidthWrapper>
        <ProfileForm profile={profile} />
      </WidthWrapper>
    </PageWrapper>
  );
};

export default Profile;
