import { useSelector } from 'react-redux';

import { ProfileForm } from '@/components/form';

import { RootState } from '@/lib/store';
import { PageWrapper, FeedWrapper } from '@/components/layout';

const Profile: React.FC = () => {
  const { profile } = useSelector((state: RootState) => state.user);
  // const { username } = useParams(); // @wavy

  return (
    <PageWrapper>
      <FeedWrapper>
        <ProfileForm profile={profile} />
      </FeedWrapper>
    </PageWrapper>
  );
};

export default Profile;
