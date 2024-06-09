import { NextFunction, Response } from 'express';
import { ExpandedRequest } from '@/middleware/ExpandedRequestType';
import { Comment, User } from '@/db';

export const getPostComments = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.findOne({ post: postId });
    if (!comments) {
      next({ message: '문서를 찾을 수 없습니다.', status: 404 });
    }

    const formattedComments = comments?.comments.map(async comment => ({
      ...comment,
      user: await User.findById(comment.user),
    }));

    req.body.comments = formattedComments;
    next();
  } catch (err) {
    next(err);
  }
};

export const addComment = async (_req: ExpandedRequest, _res: Response) => {};

export const removeComment = async (
  _req: ExpandedRequest,
  _res: Response
) => {};

/* // 좋아요 추가
router.post('/posts/:postId/like', async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    // 해당 사용자의 좋아요 정보 찾기
    let like = await Like.findOne({ user: userId, post: postId });

    if (!like) {
      // 좋아요가 없다면 새로 생성
      like = new Like({
        user: userId,
        post: postId,
        isLiked: true
      });
      await like.save();
    } else {
      // 좋아요가 있다면 상태 변경
      like.isLiked = true;
      await like.save();
    }

    res.status(200).json(like);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 좋아요 취소
router.delete('/posts/:postId/like', async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    // 해당 사용자의 좋아요 정보 찾기
    const like = await Like.findOne({ user: userId, post: postId });

    if (!like) {
      // 좋아요가 없다면 에러 반환
      return res.status(404).json({ message: 'Like not found' });
    }

    // 좋아요 정보 삭제
    await like.delete();

    res.status(200).json({ message: 'Like deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}); */
