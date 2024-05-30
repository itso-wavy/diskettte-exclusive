import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FeedNav, FeedNavItem, View } from './components';
import PageWrapper from '@/components/PageWrapper';
import FeedWrapper from '@/components/FeedWrapper';
import Post from '@/components/Post';
import { getRelativeTime } from '@/lib/utils';

const Feed: React.FC = () => {
  const [view, setView] = useState<View>('everyone');
  const navigate = useNavigate();

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
    <div className='relative'>
      <FeedNav className='top-10'>
        <FeedNavItem value='following' view={view} setView={setView} />
        <FeedNavItem value='everyone' view={view} setView={setView} />
      </FeedNav>
      <PageWrapper className='mt-10'>
        <FeedWrapper>
          {view === 'everyone' &&
            Array(10)
              .fill(post)
              .map((post, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/@${post.username}/${post._id}`)}
                  className='cursor-pointer'
                >
                  <Post key={index} post={post} />
                </div>
              ))}
          {view === 'following' && (
            <p>
              간단한 한글 로렘 입숨 문장입니다. 한글 로렘 입숨은 영문 로렘
              입숨과 유사하게 사용됩니다. 이 문장은 무의미한 내용으로 구성되어
              있습니다. 디자인이나 레이아웃을 구현할 때 활용할 수 있습니다. 한글
              로렘 입숨은 실제 내용이 아닌 것에 주의해야 합니다. 이 문장은
              단순히 자리 채우기용으로 사용됩니다. 한글 로렘 입숨은 디자인
              작업에 유용하게 활용할 수 있습니다. 간단한 한글 로렘 입숨
              문장입니다. 한글 로렘 입숨은 영문 로렘 입숨과 유사하게 사용됩니다.
              이 문장은 무의미한 내용으로 구성되어 있습니다. 디자인이나
              레이아웃을 구현할 때 활용할 수 있습니다. 한글 로렘 입숨은 실제
              내용이 아닌 것에 주의해야 합니다. 이 문장은 단순히 자리
              채우기용으로 사용됩니다. 한글 로렘 입숨은 디자인 작업에 유용하게
              활용할 수 있습니다. 간단한 한글 로렘 입숨 문장입니다. 한글 로렘
              입숨은 영문 로렘 입숨과 유사하게 사용됩니다. 이 문장은 무의미한
              내용으로 구성되어 있습니다. 디자인이나 레이아웃을 구현할 때 활용할
              수 있습니다. 한글 로렘 입숨은 실제 내용이 아닌 것에 주의해야
              합니다. 이 문장은 단순히 자리 채우기용으로 사용됩니다. 한글 로렘
              입숨은 디자인 작업에 유용하게 활용할 수 있습니다. 간단한 한글 로렘
              입숨 문장입니다. 한글 로렘 입숨은 영문 로렘 입숨과 유사하게
              사용됩니다. 이 문장은 무의미한 내용으로 구성되어 있습니다.
              디자인이나 레이아웃을 구현할 때 활용할 수 있습니다. 한글 로렘
              입숨은 실제 내용이 아닌 것에 주의해야 합니다. 이 문장은 단순히
              자리 채우기용으로 사용됩니다. 한글 로렘 입숨은 디자인 작업에
              유용하게 활용할 수 있습니다. 간단한 한글 로렘 입숨 문장입니다.
              한글 로렘 입숨은 영문 로렘 입숨과 유사하게 사용됩니다. 이 문장은
              무의미한 내용으로 구성되어 있습니다. 디자인이나 레이아웃을 구현할
              때 활용할 수 있습니다. 한글 로렘 입숨은 실제 내용이 아닌 것에
              주의해야 합니다. 이 문장은 단순히 자리 채우기용으로 사용됩니다.
              한글 로렘 입숨은 디자인 작업에 유용하게 활용할 수 있습니다. 간단한
              한글 로렘 입숨 문장입니다. 한글 로렘 입숨은 영문 로렘 입숨과
              유사하게 사용됩니다. 이 문장은 무의미한 내용으로 구성되어
              있습니다. 디자인이나 레이아웃을 구현할 때 활용할 수 있습니다. 한글
              로렘 입숨은 실제 내용이 아닌 것에 주의해야 합니다. 이 문장은
              단순히 자리 채우기용으로 사용됩니다. 한글 로렘 입숨은 디자인
              작업에 유용하게 활용할 수 있습니다.
            </p>
          )}
        </FeedWrapper>
      </PageWrapper>
    </div>
  );
};

export default Feed;
