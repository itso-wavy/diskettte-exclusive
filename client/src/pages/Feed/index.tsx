import { useState } from 'react';
import { cn } from '@/lib/utils';
import Post from './Post';

type View = 'everyone' | 'following';

const Feed: React.FC = () => {
  const [view, setView] = useState<View>('everyone');

  return (
    <div className='relative'>
      <FeedNav view={view} setView={setView} />
      <section className='select border border-white'>
        {/* {Array(10)
          .fill(view)
          .map((post, index) => (
            <Post key={index} post={post} />
          ))} */}
          <h2 className='text-semibold text-2xl'>Lorm ipsum dolor sit amet consecteetur</h2>

        
        molestiae tempore nobis est sunt, ex, ipsam alias dicta, dolorum
        corrupti quasi in ducimus sapiente aperiam nostrum accusantium nisi
        reiciendis eaque. Repellat soluta rem unde dolorem harum ea hic ipsum
        possimus, laboriosam, modi aliquam voluptas nesciunt exercitationem
        impedit rerum cum! Minima quasi iure possimus rerum in! Velit est
        placeat perferendis minus. Similique ratione quod blanditiis fugiat ipsa
        rem, ut, tempore delectus modi iusto aut temporibus incidunt quasi
        perferendis mollitia sit repellat error iure expedita? Repellat
        quibusdam ipsam perspiciatis ratione illum quidem. Delectus dignissimos,
        ab praesentium nobis molestias quos asperiores dolorem quis eligendi,
        quo ad nesciunt quas voluptas sapiente laborum quam est laudantium
        officiis officia minus accusamus temporibus. Distinctio impedit
        veritatis accusantium! Consequuntur impedit eaque non ullam sunt tenetur
        provident veniam laudantium modi molestiae possimus nobis, commodi
        quibusdam pariatur architecto? Dolor, provident. Ad magnam temporibus
        accusamus sapiente. Commodi facere hic accusamus deleniti. reiciendis
        eaque. Repellat soluta rem unde dolorem harum ea hic ipsum possimus,
        laboriosam, modi aliquam voluptas nesciunt exercitationem impedit rerum
        cum! Minima quasi iure possimus rerum in! Velit est placeat perferendis
        minus. Similique ratione quod blanditiis fugiat ipsa rem, ut, tempore
        delectus modi iusto aut temporibus incidunt quasi perferendis mollitia
        sit repellat error iure expedita? Repellat quibusdam ipsam perspiciatis
        ratione illum quidem. Delectus dignissimos, ab praesentium nobis
        molestias quos asperiores dolorem quis eligendi, quo ad nesciunt quas
        voluptas sapiente laborum quam est laudantium officiis officia minus
        accusamus temporibus. Distinctio impedit veritatis accusantium!
        Consequuntur impedit eaque non ullam sunt tenetur provident veniam
        laudantium modi molestiae possimus nobis, commodi quibusdam pariatur
        architecto? Dolor, provident. Ad magnam temporibus accusamus sapiente.
        Commodi facere hic accusamus deleniti.
      </section>
    </div>
  );
};

export default Feed;

const FeedNav: React.FC<{
  view: View;
  setView: React.Dispatch<React.SetStateAction<View>>;
}> = ({ view, setView }) => {
  return (
    <nav className='sticky top-5 mb-4 ml-auto flex w-fit flex-col justify-center gap-1 rounded-[20px] bg-background p-1.5 text-sm text-gray-900/60 outline-1 outline-gray-950/5 drop-shadow-lg hover:outline hover:drop-shadow-xl sm:mx-auto sm:flex-row'>
      <FeedNavItem value='following' view={view} setView={setView} />
      <FeedNavItem value='everyone' view={view} setView={setView} />
    </nav>
  );
};

const FeedNavItem: React.FC<{
  value: View;
  view: View;
  setView: React.Dispatch<React.SetStateAction<View>>;
}> = ({ value, view, setView }) => {
  return (
    <button
      value={value}
      onClick={e => setView(e.target.value)}
      className={cn(
        'rounded-[13px] px-3 py-1 first-letter:uppercase hover:bg-gray-100 active:bg-gray-900/10',
        view === value && 'bg-gray-100 text-accent-foreground shadow-inner'
      )}
    >
      {value}
    </button>
  );
};
