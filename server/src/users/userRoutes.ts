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
import { followUser, unfollowUser } from '@/users/follow/followController';
import { getUserBookmarkPosts } from '@/posts/post/postController';

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
router.post('/user/:username/follower', authentication, followUser);
router.delete('/user/:username/follower', authentication, unfollowUser);

// bookmark
router.get('/user/:username/bookmark', authentication, getUserBookmarkPosts);

export { router as userRouter };
