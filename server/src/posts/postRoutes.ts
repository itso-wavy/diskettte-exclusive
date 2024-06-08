import { Router } from 'express';
import {
  getPosts,
  getFollowingPosts,
  getUserPosts,
  getPost,
  createPost,
  editPost,
  deletePost,
} from '@/posts/post/postController';
import {
  addComment,
  getPostComments,
  removeComment,
} from '@/posts/comment/commentController';
import { addLike, removeLike } from '@/posts/likes/likeController';
import {
  addBookmark,
  removeBookmark,
} from '@/users/bookmark/bookmarkController';

import { authentication } from '@/middleware/authentication';

const router: Router = Router();

// post crud
router.get('/post/everyone', getPosts);
router.get('/post/everyone/auth', authentication, getPosts);
router.get('/post/following/auth', authentication, getFollowingPosts);
router.get('/post/:username', getUserPosts);
router.get('/post/:username/auth', authentication, getUserPosts);
router.get('/post/:username/:postId', getPost);
router.get('/post/:username/:postId/auth', authentication, getPost);

router.post('/post/create', authentication, createPost);
router.patch('/post/:postId/edit', authentication, editPost);
router.delete('/post/:postId/delete', authentication, deletePost);

// comments crud
router.get('/post/:username/:postId/comment', getPostComments);
router.get(
  '/post/:username/:postId/comment/auth',
  authentication,
  getPostComments
);
router.post('/post/:postId/comment', authentication, addComment);
router.delete('/post/:postId/comment', authentication, removeComment);

// likes
router.post('/post/:postId/like', authentication, addLike);
router.delete('/post/:postId/like', authentication, removeLike);

// bookmark
router.post('/post/:postId/bookmark', authentication, addBookmark);
router.delete('/post/:postId/bookmark', authentication, removeBookmark);

export { router as postRouter };
