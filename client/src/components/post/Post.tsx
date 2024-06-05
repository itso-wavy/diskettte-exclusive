import { PropsWithChildren, forwardRef } from 'react';
import { Link } from 'react-router-dom';

import ProfileAvatar from '../ProfileAvatar';
import { StopPropagationButton, CircularButton } from '@/components/form';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import { cn } from '@/lib/utils';

export const Layout = ({
  avatarPart,
  topLinePart,
  className,
  children,
}: PropsWithChildren<{
  avatarPart: React.ReactNode;
  topLinePart: React.ReactNode;
  className?: string;
}>) => {
  return (
    <div
      className={cn(
        'border-b px-0 py-3 text-[15px] last:border-b-0 sm:px-6',
        className
      )}
    >
      <div className='select *:select grid grid-cols-[min-content,minmax(0,1fr)] grid-rows-[21px,19px,max-content]'>
        <div className='row-span-2 pr-2 pt-1'>{avatarPart}</div>
        <div className='*:select grid grid-cols-[1fr,max-content] gap-x-1.5 leading-tight'>
          {topLinePart}
        </div>
        <div className='*:select col-start-2 row-span-2'>{children}</div>
      </div>
    </div>
  );
};

export const AvatarLink: React.FC<{
  to: string;
  image: string | null;
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

export const UsernameLink: React.FC<{ to: string; username: string }> = ({
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

export const Date: React.FC<{ date: string }> = ({ date }) => {
  return (
    <time dateTime={date} className='select text-sm text-muted-foreground'>
      {date}
    </time>
  );
};

export const Content: React.FC<{
  nickname?: string;
  createdAt?: string;
  contents: { text?: string; images?: string[] };
}> = ({ nickname, createdAt, contents }) => {
  const { text, images } = contents;

  return (
    <div className='mt-1'>
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
          {images?.length! > 0 &&
            images!.map((i, index) => (
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

interface PostButtonProps {
  ariaLabel: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  count?: number;
  className?: string;
}

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<PostButtonProps>
>(({ ariaLabel, onClick, count, className, children }, ref) => {
  return (
    <StopPropagationButton className={className}>
      {!count ? (
        <CircularButton ref={ref} ariaLabel={ariaLabel} onClick={onClick}>
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
});
