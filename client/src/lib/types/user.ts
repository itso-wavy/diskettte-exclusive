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

export interface ProfileDetail {
  username: string;
  profile: UserProfile;
  following: number;
  followers: number;
  isFollowing?: boolean;
}

export interface UserState {
  profile: UserProfile;
}
