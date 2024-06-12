import { Router } from 'express';
import {
  registerHandler,
  loginHandler,
  refreshTokenHandler,
} from '@/controllers/authController';
import {
  editUserProfile,
  getUserProfileDetail,
} from '@/controllers/profileController';
import { followUser, unfollowUser } from '@/controllers/followController';
import { getUserBookmarkPosts } from '@/controllers/postController';

import { authentication } from '@/middlewares/authentication';

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
