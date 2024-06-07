import Skeleton from '@/components/Skeleton';

const ProfileSkeleton: React.FC = () => {
  return (
    <div className='flex flex-col gap-x-5 gap-y-2 sm:flex-row'>
      <Skeleton className='h-20 w-20 rounded-full max-sm:ml-auto' />
      <div className='*:select spacey break-words pt-0.5 text-[15px] leading-tight'>
        <Skeleton className='mt-1 h-[22px] w-32 rounded-md' />
        <Skeleton className='mt-1.5 h-4 w-12 rounded-[5px]' />
        <Skeleton className='mt-1.5 h-4 w-48 rounded-[5px]' />
        <div className='mt-[15px] flex gap-4'>
          <Skeleton className='h-4 w-16 rounded-[5px]' />
          <Skeleton className='h-4 w-16 rounded-[5px]' />
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
