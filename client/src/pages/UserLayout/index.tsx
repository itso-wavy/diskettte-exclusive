import { Outlet, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '@/lib/store';

export interface UserLayoutContext {
  username: string;
  isLoggedIn: boolean;
  usernameParam: string;
  isUserMatch: boolean;
}

const UserLayout: React.FC = () => {
  let { username: usernameParam } = useParams();
  if (usernameParam?.[0] !== '@')
    throw new Error('😥사용자 이름을 확인해주세요.');

  usernameParam = usernameParam?.slice(1);

  const { username, isLoggedIn } = useSelector(
    (state: RootState) => state.auth
  );

  const isUserMatch = username === usernameParam;

  return (
    <Outlet context={{ username, isLoggedIn, usernameParam, isUserMatch }} />
  );
};

export default UserLayout;
