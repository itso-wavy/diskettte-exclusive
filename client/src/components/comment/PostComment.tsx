import { Post } from '../post';
import { CommentButton, HeartButton } from '../form';
import { CommentMoreButton } from '.';

import CommentProvider from '@/context/commentContext';
import { getRelativeTime } from '@/lib/utils';
import { Comment, Post as PostT } from '@/lib/types';

const PostComment: React.FC<{
  post: PostT;
  comment: Comment;
  username: string;
}> = ({ post, comment, username }) => {
  const relativeTime = getRelativeTime(comment.createdAt);
  const isWriter = comment.writer.username === username;

  return (
    <CommentProvider post={post} comment={comment}>
      <Post.Layout
        avatarPart={
          <Post.AvatarLink
            to={`/@${comment.writer.username}`}
            image={comment.writer.profile.image}
            nickname={comment.writer.username}
          />
        }
        topLinePart={
          <>
            <div className='flex gap-1.5'>
              <Post.UsernameLink
                to={`/@${comment.writer.username}`}
                username={comment.writer.profile.nickname}
              />
              <Post.Date date={relativeTime} />
            </div>
            <CommentMoreButton isWriter={isWriter} />
          </>
        }
      >
        <div className='mt-1'>
          <p className='*:select'>
            {comment.content?.split('\n').map((t, index) => {
              return t ? (
                <span
                  key={index}
                  className='mt-2.5 inline-block w-full break-words first:mt-0'
                >
                  {t}
                </span>
              ) : null;
            })}
          </p>
        </div>
        <div className='-mb-1 mt-1.5 flex h-9 items-center gap-4'>
          <HeartButton isLiked={false} handleClick={() => {}} />
          <CommentButton hasCommented={false} handleClick={() => {}} />
        </div>
      </Post.Layout>
    </CommentProvider>
  );
};

export default PostComment;
