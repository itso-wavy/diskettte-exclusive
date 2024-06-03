import { useParams } from 'react-router-dom';

import Post from '@/components/Post';
import PageWrapper from '@/components/layout/PageWrapper';
import FeedWrapper from '@/components/layout/FeedWrapper';
import { getRelativeTime } from '@/lib/utils';

const PostDetail: React.FC = () => {
  const { postId } = useParams();

  let post = {
    _id: 123456,
    username: 'wavy',
    profile: {
      nickname: '서핑하는 웨이비',
      image: '',
      description: '',
    },
    createdAt: getRelativeTime(new Date(1713057901555)),
    contents: {
      text: `Lorem ipsum dolor sit amet consectetur adipisicing elit.

      Voluptatum dolores eveniet delectus dicta assumenda itaque possimus, hic officia corporis quas saepe quidem. Perferendis labore accusantium ea quibusdam quo maiores repellat.
      Voluptatum eligendi quam illum aspernatur! Culpa autem earum commodi laborum? Illo commodi alias nam inventore sunt ex, rerum ea eos asperiores. Modi ad beatae culpa reprehenderit earum. Eveniet, non error.

      Voluptas non ut optio quam magnam provident tenetur eligendi atque minus unde fugit aliquam aut quasi, consequuntur quia adipisci dignissimos obcaecati debitis laborum officiis. Cumque nam voluptatum sunt dolorem dignissimos?`,
      images: [
        'https://images.unsplash.com/photo-1715464881886-0fd63cd7997b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1716244044193-1cb4daa4f487?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8',
        'https://images.unsplash.com/photo-1716449262006-86182cac98db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D',
      ],
    },
    likes: ['123', '234'],
    comments: [],
  };

  return (
    <PageWrapper>
      <FeedWrapper>
        <Post post={post} />
      </FeedWrapper>
    </PageWrapper>
  );
};

export default PostDetail;
