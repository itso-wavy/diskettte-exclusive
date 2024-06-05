import { Post } from './lib/types';

let posts: Post = {
  _id: '123456',
  writer: {
    username: 'wavy',
    profile: {
      nickname: '서핑하는 웨이비',
      image: '',
      description: '',
    },
  },
  createdAt: new Date(1713057901555),
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
  likes: [123, 234],
  comments: 0,
};
let followings: Post = {
  _id: '123456',
  writer: {
    username: 'wavy',
    profile: {
      nickname: '서핑하는 웨이비',
      image: '',
      description: '',
    },
  },
  createdAt: new Date(1713057901555),
  contents: {
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit.

      Voluptatum dolores eveniet delectus dicta assumenda itaque possimus, hic officia corporis quas saepe quidem. Perferendis labore accusantium ea quibusdam quo maiores repellat.
      Voluptatum eligendi quam illum aspernatur! Culpa autem earum commodi laborum? Illo commodi alias nam inventore sunt ex, rerum ea eos asperiores. Modi ad beatae culpa reprehenderit earum. Eveniet, non error.

      Voluptas non ut optio quam magnam provident tenetur eligendi atque minus unde fugit aliquam aut quasi, consequuntur quia adipisci dignissimos obcaecati debitis laborum officiis. Cumque nam voluptatum sunt dolorem dignissimos?`,
    images: [
      'https://images.unsplash.com/photo-1717210398121-245fc24025d7?q=80&w=985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1697730172915-26165f42ffe9?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1716847214506-d93ba9fe5be4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  likes: [123, 234],
  comments: 0,
};
