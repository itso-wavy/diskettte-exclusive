import { Router } from 'express';
import {
  registerHandler,
  loginHandler,
  refreshTokenHandler,
} from '@/users/auth/authController';
import {
  editUserProfile,
  getUserProfileDetail,
} from '@/users/profile/profileController';
import {
  followUser,
  getUserFollowers,
  getUserFollows,
  unfollowUser,
} from './follow/followController';
import { getUserBookmarks } from '@/users/bookmark/bookmarkController';

import { authentication } from '@/middleware/authentication';

const router: Router = Router();

// auth
router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.post('/token-refresh', refreshTokenHandler);

// profile
router.get('/user/:username/profile', getUserProfileDetail);
router.get(
  '/user/:username/profile/auth',
  authentication,
  getUserProfileDetail
);
router.post('/user/:username/profile/edit', authentication, editUserProfile);

// follow
router.get('/user/:username/follow', getUserFollows);
router.get('/user/:username/follower', getUserFollowers);
router.post('/user/:username/follower', followUser);
router.delete('/user/:username/follower', unfollowUser);

// bookmark
router.get('/user/:username/bookmark', getUserBookmarks);

export { router as userRouter };
