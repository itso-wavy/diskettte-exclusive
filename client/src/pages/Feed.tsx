import { cn } from '@/lib/utils/cn';
import { useState } from 'react';
import Post from './Post';

const Feed: React.FC = () => {
  const [view, setView] = useState('everyone');

  return (
    <div>
      <nav className='sticky top-5 mx-auto mb-4 w-fit space-x-1 rounded-[20px] bg-white p-1.5 text-sm text-gray-900/60 drop-shadow-lg hover:drop-shadow-xl'>
        <button
          value='following'
          onClick={e => setView(e.target.value)}
          className={cn(
            'rounded-[13px] px-3 py-1 hover:bg-gray-900/20 hover:text-white active:bg-gray-900/35 active:text-white',
            view === 'following' && 'bg-gray-900/20 text-white'
          )}
        >
          Following
        </button>
        <button
          value='everyone'
          onClick={e => setView(e.target.value)}
          className={cn(
            'rounded-[13px] px-3 py-1 hover:bg-gray-900/20 hover:text-white active:bg-gray-900/35 active:text-white',
            view === 'everyone' && 'bg-gray-900/20 text-white'
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
