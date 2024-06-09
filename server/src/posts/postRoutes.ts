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
router.get('/posts/view/everyone', getPosts);
router.get('/posts/view/everyone/auth', authentication, getPosts);
router.get('/posts/view/following/auth', authentication, getFollowingPosts);
router.get('/posts/user/:username', getUserPosts);
router.get('/posts/user/:username/auth', authentication, getUserPosts);
router.get('/post/user/:username/:postId', getPost, getPostComments);
router.get(
  '/post/user/:username/:postId/auth',
  authentication,
  getPost,
  getPostComments
);

router.post('/post/create', authentication, createPost);
router.patch('/post/:postId/edit', authentication, editPost);
router.delete('/post/:postId/delete', authentication, deletePost);

// comments crud
router.post('/post/:postId/comment', authentication, addComment);
router.delete('/post/:postId/comment', authentication, removeComment);

// likes
router.post('/post/:postId/like', authentication, addLike);
router.delete('/post/:postId/like', authentication, removeLike);

// bookmark
router.post('/post/:postId/bookmark', authentication, addBookmark);
router.delete('/post/:postId/bookmark', authentication, removeBookmark);

export { router as postRouter };
