import { PropsWithChildren } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ProfileAvatar from './ProfileAvatar';
import CircularButton from './CircularButton';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Icon from './icons';
import { cn } from '@/lib/utils';

const Post: React.FC<{ post: any; className?: string }> = ({
  post,
  className,
  ...props
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        'border-b px-0 py-3 text-[15px] last:border-b-0 sm:px-6',
        className
      )}
      {...props}
    >
      <div className='select *:select grid grid-cols-[min-content,minmax(0,1fr)] grid-rows-[21px,19px,max-content]'>
        <div className='row-span-2 pr-2 pt-1'>
          <PostAvatarLink
            to={`/@${post.username}`}
            image={post.profile.image}
            nickname={post.username}
          />
        </div>
        <div className='*:select grid grid-cols-[1fr,max-content] gap-x-1.5 leading-tight'>
          <div className='flex gap-1.5'>
            <PostUsernameLink
              to={`/@${post.username}`}
              username={post.profile.nickname}
            />
            <PostDate date={post.createdAt} />
          </div>
          <PostButton
            ariaLabel='more'
            onClick={() => console.log('post click')}
            className='ml-auto text-muted-foreground'
          >
            <Icon.More viewBox='0 0 24 24' className='h-5 w-5' />
          </PostButton>
        </div>
        <div className='*:select col-start-2 row-span-2'>
          <PostContent
            nickname={post.profile.nickname}
            createdAt={post.createdAt}
            contents={post.contents}
          />
          <div className='-mb-1 mt-1.5 flex h-9 items-center gap-4'>
            <PostButton
              ariaLabel='likes'
              onClick={() => console.log('likes')}
              count={post.likes.length}
            >
              <Icon.Heart
                viewBox='0 0 24 24'
                strokeWidth={1}
                className='h-[20px] w-[20px]'
              />
            </PostButton>
            <PostButton
              ariaLabel='comments'
              onClick={() => console.log('comments')}
              count={post.comments.length}
            >
              <Icon.Comment
                viewBox='0 0 24 24'
                strokeWidth={1.25}
                className='h-[20px] w-[20px]'
              />
            </PostButton>
            <PostButton
              ariaLabel='bookmark'
              onClick={() => console.log('bookmark')}
              className='ml-auto'
            >
              <Icon.Bookmark
                viewBox='0 0 24 24'
                strokeWidth={0.9}
                className='h-[20px] w-[20px]'
              />
            </PostButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const StopPropagationButton = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div onClick={e => e.stopPropagation()} className={className}>
      {children}
    </div>
  );
};

const PostAvatarLink: React.FC<{
  to: string;
  image: string;
  nickname: string;
}> = ({ to, image, nickname }) => {
  return (
    <StopPropagationButton>
      <Link to={to}>
        <ProfileAvatar
          image={image}
          nickname={nickname}
          className='h-9 w-9 overflow-hidden rounded-full'
        />
      </Link>
    </StopPropagationButton>
  );
};

const PostUsernameLink: React.FC<{ to: string; username: string }> = ({
  to,
  username,
}) => {
  return (
    <StopPropagationButton>
      <Link
        to={to}
        className='break-all leading-[21px] underline-offset-[3px] hover:underline'
      >
        <span className='select font-semibold'>{username}</span>
      </Link>
    </StopPropagationButton>
  );
};

const PostDate: React.FC<{ date: string }> = ({ date }) => {
  return (
    <time dateTime={date} className='select text-sm text-muted-foreground'>
      {date}
    </time>
  );
};

const PostContent: React.FC<{
  nickname?: string;
  createdAt?: string;
  contents: { text?: string; images?: string[] };
}> = ({ nickname, createdAt, contents }) => {
  const { text, images } = contents;

  return (
    <div className=' mt-1'>
      <p className='*:select'>
        {text?.split('\n').map((t, index) => {
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
      <ScrollArea onClick={e => e.stopPropagation()}>
        <div className='flex w-max space-x-1.5 overflow-x-auto pb-3'>
          {images?.length &&
            images.map((i, index) => (
              <img
                key={index}
                src={i}
                alt={`Photo by ${nickname} on ${createdAt}`}
                draggable='false'
                className='mt-2 h-[245px] max-w-[245px] rounded-lg border object-cover'
              />
            ))}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  );
};

const PostButton = ({
  ariaLabel,
  onClick,
  count,
  className,
  children,
}: PropsWithChildren<{
  ariaLabel: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  count?: number;
  className?: string;
}>) => {
  return (
    <StopPropagationButton className={className}>
      {!count ? (
        <CircularButton ariaLabel={ariaLabel} onClick={onClick}>
          {children}
        </CircularButton>
      ) : (
        <div className='flex items-center'>
          <CircularButton ariaLabel={ariaLabel} onClick={onClick}>
            {children}
            {Number(count) > 0 && (
              <span className='select ml-1.5 text-sm'>{count}</span>
            )}
          </CircularButton>
        </div>
      )}
    </StopPropagationButton>
  );
};

export default Post;
