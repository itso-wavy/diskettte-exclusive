import client from '.';
import { setLogin, setLogout, store } from '@/lib/store';

export const refreshAccessToken = async () => {
  try {
    const {
      data: { accessToken },
    } = await client.post('token-refresh', null, {
      withCredentials: true,
    });

    store.dispatch(setLogin({ token: accessToken }));

    return accessToken;
  } catch (error) {
    store.dispatch(setLogout());

    throw error;
  }
};
