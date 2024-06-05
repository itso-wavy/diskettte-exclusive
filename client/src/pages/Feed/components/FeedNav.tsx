import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

export type View = 'everyone' | 'following';

const FeedNav = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <nav
      className={cn(
        'z-50 flex w-fit flex-col justify-center gap-1 rounded-[20px] bg-background p-1.5 text-sm text-muted-foreground outline-1 outline-border drop-shadow-lg hover:outline hover:drop-shadow-xl dark:outline sm:flex-row',
        className
        // outline-gray-950/5 text-gray-900/60
      )}
    >
      {children}
    </nav>
  );
};

const FeedNavItem: React.FC<{
  value: View;
  view: View;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ value, view, onClick }) => {
  return (
    <button
      value={value}
      onClick={onClick}
      className={cn(
        'rounded-[13px] px-3 py-1 first-letter:uppercase hover:bg-secondary active:bg-border dark:active:bg-muted',
        view === value && 'bg-secondary text-foreground shadow-inner'
      )}
    >
      {value}
    </button>
  );
};

export { FeedNav, FeedNavItem };
