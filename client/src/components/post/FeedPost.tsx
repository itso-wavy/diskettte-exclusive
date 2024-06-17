import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  Post,
  PostMoreButton,
  PostLikeButton,
  PostBookmarkButton,
  PostCommentButton,
} from '.';
import { PostUIType } from '../dialog';

import PostProvider from '@/context/postContext';
import { RootState } from '@/lib/store';
import { Post as PostT } from '@/lib/types';
import { getRelativeTime } from '@/lib/utils';

export const FeedPost: React.FC<{
  type?: PostUIType;
  post: PostT;
  className?: string;
}> = ({ type = PostUIType.FEED, post, className }) => {
  const { username, isLoggedIn } = useSelector(
    (state: RootState) => state.auth
  );

  const relativeTime = getRelativeTime(post.createdAt);
  const isWriter = post.writer.username === username;

  return (
    <PostProvider
      type={type}
      post={post}
      writer={post.writer.username}
      isLoggedIn={isLoggedIn}
    >
      <Post.Layout
        avatarPart={
          <Post.AvatarLink
            to={`/@${post.writer.username}`}
            image={post.writer.profile.image}
            nickname={post.writer.username}
          />
        }
        topLinePart={
          <>
            <div className='flex gap-1.5'>
              <Post.UsernameLink
                to={`/@${post.writer.username}`}
                username={post.writer.profile.nickname}
              />
              <Post.Date date={relativeTime} />
            </div>
            <PostMoreButton
              username={username}
              isWriter={isWriter}
              post={post}
            />
          </>
        }
        className={className}
      >
        <Post.Content
          nickname={post.writer.profile.nickname}
          createdAt={relativeTime}
          contents={post.contents}
        />
        <div className='-mb-1 mt-1.5 flex h-9 items-center gap-4'>
          <PostLikeButton
            defaultLiked={post.isLiked}
            defaultCount={post.likesCount}
          />
          <PostCommentButton commentsCount={post.commentsCount} />
          <PostBookmarkButton defaultBookmarked={post.isBookmarked} />
        </div>
      </Post.Layout>
    </PostProvider>
  );
};

export const FeedLinkPost: React.FC<{
  post: PostT;
  className?: string;
}> = ({ post, className }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/@${post.writer.username}/${post._id}`)}
      className='cursor-pointer border-b last:border-b-0'
    >
      <FeedPost post={post} className={className} />
    </div>
  );
};

export const CommentFormPost: React.FC<{
  post: PostT;
  className?: string;
}> = ({ post, className }) => {
  const relativeTime = getRelativeTime(post.createdAt);

  return (
    <Post.Layout
      avatarPart={
        <Post.AvatarLink
          to={`/@${post.writer.username}`}
          image={post.writer.profile.image}
          nickname={post.writer.username}
        />
      }
      topLinePart={
        <>
          <div className='flex gap-1.5'>
            <Post.UsernameLink
              to={`/@${post.writer.username}`}
              username={post.writer.profile.nickname}
            />
            <Post.Date date={relativeTime} />
          </div>
        </>
      }
      className={className}
    >
      <Post.Content
        nickname={post.writer.profile.nickname}
        createdAt={relativeTime}
        contents={post.contents}
      />
    </Post.Layout>
  );
};
