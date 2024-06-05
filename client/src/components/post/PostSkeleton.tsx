import { Post } from '.';
import Skeleton from '../Skeleton';

const PostSkeleton: React.FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <Post.Layout
      avatarPart={<Skeleton className='h-9 w-9 overflow-hidden rounded-full' />}
      topLinePart={<Skeleton className='h-[21px] w-[80px] rounded-md' />}
      className={className}
    >
      <div className='mt-2.5'>
        <Skeleton className='h-[21px] max-w-[300px] rounded-md' />
        <div className='mt-2.5 flex space-x-1.5 overflow-x-clip pb-3 *:h-[245px] *:w-[200px] *:shrink-0 *:rounded-lg'>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </div>
      <div className='-mb-1 mt-1.5 flex h-9 items-center gap-4 *:h-6 *:w-6 *:rounded-full'>
        <Skeleton />
        <Skeleton />
        <Skeleton className='ml-auto' />
      </div>
    </Post.Layout>
  );
};

export default PostSkeleton;
