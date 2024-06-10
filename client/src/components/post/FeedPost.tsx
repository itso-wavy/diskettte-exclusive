import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Post, MoreButton, LikeButton, BookmarkButton } from '.';
import Icon from '../icons';

import { RootState } from '@/lib/store';
import { Post as PostT } from '@/lib/types';
import { getRelativeTime } from '@/lib/utils';

export const FeedPost: React.FC<{
  post: PostT;
  className?: string;
}> = ({ post, className }) => {
  const navigate = useNavigate();
  const { username, isLoggedIn } = useSelector(
    (state: RootState) => state.auth
  );

  const relativeTime = getRelativeTime(post.createdAt);
  const isWriter = post.writer.username === username;

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
          <MoreButton username={username} isWriter={isWriter} post={post}>
            <div>
              <Post.Button
                ariaLabel='more'
                className='ml-auto text-muted-foreground'
              >
                <Icon.More viewBox='0 0 24 24' className='h-5 w-5' />
              </Post.Button>
            </div>
          </MoreButton>
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
        <LikeButton
          postId={post._id}
          username={username}
          isLoggedIn={isLoggedIn}
          defaultLiked={post.isLiked}
          defaultCount={post.likesCount}
        />
        {/* <Post.Button
          ariaLabel='likes'
          onClick={() => {
            setIsLiked(prev => !prev); 
            setLikesCount(prev => prev + (isLiked ? -1 : 1));
          }}
          count={likesCount}
        >
          <Icon.Heart
            viewBox='0 0 24 24'
            strokeWidth={1}
            className={cn(
              'h-[20px] w-[20px]',
              isLiked && 'svg-fill-theme text-alpha'
            )}
          />
        </Post.Button> */}
        <Post.Button
          ariaLabel='comments'
          onClick={() => {
            navigate(`/@${post.writer.username}/${post._id}`);
          }}
          count={post.commentsCount}
        >
          <Icon.Comment
            viewBox='0 0 24 24'
            strokeWidth={1.25}
            className='h-[20px] w-[20px]'
          />
        </Post.Button>
        <BookmarkButton
          postId={post._id}
          username={username}
          isLoggedIn={isLoggedIn}
          defaultBookmarked={post.isBookmarked}
        />
        {/* <Post.Button
          ariaLabel='bookmark'
          onClick={() => console.log('bookmark')}
          className='ml-auto'
        >
          <Icon.Bookmark
            viewBox='0 0 24 24'
            strokeWidth={0.9}
            className={cn(
              'h-[20px] w-[20px]',
              isBookmarked && 'svg-fill-theme text-alpha'
            )}
          />
        </Post.Button> */}
      </div>
    </Post.Layout>
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
