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
        'sticky z-50 ml-auto flex w-fit flex-col justify-center gap-1 rounded-[20px] bg-background p-1.5 text-sm text-muted-foreground outline-1 outline-border drop-shadow-lg hover:outline hover:drop-shadow-xl dark:outline sm:mx-auto sm:flex-row',
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
  setView: React.Dispatch<React.SetStateAction<View>>;
}> = ({ value, view, setView }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setView(e.currentTarget.value as View);
  };

  return (
    <button
      value={value}
      onClick={handleClick}
      className={cn(
        'rounded-[13px] px-3 py-1 first-letter:uppercase hover:bg-secondary active:bg-gray-900/10',
        view === value && 'bg-secondary text-foreground shadow-inner'
        // text-accent-foreground hover:bg-gray-100 active:bg-gray-900/10
      )}
    >
      {value}
    </button>
  );
};

export { FeedNav, FeedNavItem };
