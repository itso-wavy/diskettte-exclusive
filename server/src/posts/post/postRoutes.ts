import { Router } from 'express';
import {
  getPosts,
  getFollowingPosts,
  getUserPosts,
  getPost,
  getPostComments,
  createPost,
  editPost,
  deletePost,
} from './postController';
import { authentication } from '@/middleware/authentication';

const router: Router = Router();

router.get('/post/everyone', getPosts);
router.get('/post/everyone/auth', authentication, getPosts);
router.get('/post/following/auth', authentication, getFollowingPosts);
router.get('/post/:username', getUserPosts);
router.get('/post/:username/auth', authentication, getUserPosts);
router.get('/post/:username/:postId', getPost);
router.get('/post/:username/:postId/auth', authentication, getPost);
router.get('/post/:username/:postId/comments', getPostComments);
router.get(
  '/post/:username/:postId/comments/auth',
  authentication,
  getPostComments
);

router.post('/post/create', authentication, createPost);
router.patch('/post/:postId/edit', authentication, editPost);
router.delete('/post/:postId/delete', authentication, deletePost);

export { router as postRouter };
