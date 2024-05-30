import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ProfileAvatar: React.FC<{
  nickname: string;
  image: string;
  className?: string;
}> = ({ nickname, image, className }) => {
  return (
    <Avatar className={className}>
      <AvatarImage
        src={image}
        alt={'@' + nickname}
        className='hover:opacity-75'
      />
      <AvatarFallback className='bg-gradient-to-b from-gray-400/60 via-gray-200/70 to-white to-[75%] text-sm text-zinc-800 shadow-inner hover:bg-gray-500/5 '>
        {nickname.slice(0, 1)}
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
