import { ButtonWithCount } from '.';
import Icon from '../icons';

import { cn } from '@/lib/utils';

export const HeartButton: React.FC<{
  isLiked: boolean;
  likesCount?: number;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}> = ({ isLiked, likesCount, handleClick, className }) => {
  return (
    <ButtonWithCount
      ariaLabel='likes'
      onClick={handleClick}
      count={likesCount}
      className={className}
    >
      <Icon.Heart
        viewBox='0 0 24 24'
        strokeWidth={1}
        className={cn(
          'h-[20px] w-[20px]',
          isLiked && 'svg-fill-theme text-alpha'
        )}
      />
    </ButtonWithCount>
  );
};

export const BookmarkButton: React.FC<{
  isBookmarked: boolean;
  bookmarkCount?: number;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}> = ({ isBookmarked, bookmarkCount, handleClick, className }) => {
  return (
    <ButtonWithCount
      ariaLabel='bookmark'
      onClick={handleClick}
      count={bookmarkCount}
      className={className}
    >
      <Icon.Bookmark
        viewBox='0 0 24 24'
        strokeWidth={0.9}
        className={cn(
          'h-[20px] w-[20px]',
          isBookmarked && 'svg-fill-theme text-alpha'
        )}
      />
    </ButtonWithCount>
  );
};

export const CommentButton: React.FC<{
  hasCommented: boolean;
  commentsCount?: number;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  stopPropagation?: boolean;
  className?: string;
}> = ({
  hasCommented,
  commentsCount,
  handleClick,
  stopPropagation,
  className,
}) => {
  return (
    <ButtonWithCount
      ariaLabel='comments'
      onClick={handleClick}
      count={commentsCount}
      stopPropagation={stopPropagation}
      className={className}
    >
      <Icon.Comment
        viewBox='0 0 24 24'
        strokeWidth={1.25}
        className={cn(
          'h-[20px] w-[20px]',
          hasCommented && 'svg-fill-theme text-alpha'
        )}
      />
    </ButtonWithCount>
  );
};

export const MoreButton: React.FC<{
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}> = ({ handleClick, className }) => {
  return (
    <ButtonWithCount
      ariaLabel='more'
      onClick={handleClick}
      className={className}
    >
      <Icon.More viewBox='0 0 24 24' className='h-5 w-5' />
    </ButtonWithCount>
  );
};
