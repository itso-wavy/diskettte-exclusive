import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import Post from './Post';

type View = 'everyone' | 'following';

const Feed: React.FC = () => {
  const [view, setView] = useState<View>('everyone');

  return (
    <div>
      <nav className='sticky top-5 mx-auto mb-4 w-fit space-x-1 rounded-[20px] bg-white p-1.5 text-sm text-gray-900/60 outline-1 outline-gray-950/5 drop-shadow-lg hover:outline hover:drop-shadow-xl'>
        <button
          value='following'
          onClick={e => setView(e.target.value)}
          className={cn(
            'rounded-[13px] px-3 py-1 hover:bg-accent active:bg-gray-900/10',
            view === 'following' &&
              'bg-accent text-accent-foreground shadow-inner'
          )}
        >
          Following
        </button>
        <button
          value='everyone'
          onClick={e => setView(e.target.value)}
          className={cn(
            'rounded-[13px] px-3 py-1 hover:bg-accent active:bg-gray-900/10',
            view === 'everyone' &&
              'bg-accent text-accent-foreground shadow-inner'
          )}
        >
          Everyone
        </button>
      </nav>
      <section className='select h-[1000px] border border-white'>
        {/* {Array(10)
          .fill(view)
          .map((post, index) => (
            <Post key={index} post={post} />
          ))} */}
      </section>
    </div>
  );
};

export default Feed;
