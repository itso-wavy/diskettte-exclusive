// import { ObjectId } from 'mongoose';

export interface AuthState {
  username: string;
  isLoggedIn: boolean;
  accessToken: string | null;
}

export interface UserProfile {
  nickname: string;
  image: string | null;
  description: string | null;
}

export interface UserState {
  profile: UserProfile;
}
