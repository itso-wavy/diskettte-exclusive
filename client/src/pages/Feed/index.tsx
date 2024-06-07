import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

import { FeedNav, FeedNavItem, PostList } from './components';
import { PageWrapper, WidthWrapper } from '@/components/layout';

import { RootState } from '@/lib/store';

export type ViewT = 'everyone' | 'following';

const Feed: React.FC = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [view, setView] = useState<ViewT>('everyone');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setView(e.currentTarget.value as ViewT);
  };

  return (
    <div>
      <FeedNav className='fixed right-4 top-10 sm:left-[60px] sm:right-0 sm:mx-auto'>
        <FeedNavItem
          value='following'
          view={view}
          onClick={
            isLoggedIn ? handleClick : () => toast('로그인이 필요합니다.')
          }
        />
        <FeedNavItem value='everyone' view={view} onClick={handleClick} />
      </FeedNav>
      <PageWrapper className='mt-24 sm:mt-20'>
        <WidthWrapper>
          <PostList view={view} isLoggedIn={isLoggedIn} />
        </WidthWrapper>
      </PageWrapper>
    </div>
  );
};

export default Feed;
