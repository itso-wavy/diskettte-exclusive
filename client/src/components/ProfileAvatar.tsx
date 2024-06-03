import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from './icons';

import { cn } from '@/lib/utils';

const ProfileAvatar: React.FC<{
  nickname: string;
  image: string | null;
  className?: string;
}> = ({ nickname, image, className }) => {
  return (
    <Avatar className={cn('hover:opacity-75', className)}>
      <AvatarImage
        src={image ? image : undefined}
        alt={'@' + nickname}
        className='object-cover'
      />
      <AvatarFallback className='bg-gradient-to-b from-gray-400/60 via-gray-200/70 to-white to-[75%] shadow-inner hover:bg-gray-500/5 '>
        <Icon.AtSign viewBox='0 0 24 24' className='h-6 w-6 text-beta' />
        {/* {nickname ? (
          <p className='text-sm text-zinc-800'>{nickname.slice(0, 1)}</p>
        ) : (
          <Icon.AtSign viewBox='0 0 24 24' className='h-6 w-6 text-beta' />
        )} */}
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
