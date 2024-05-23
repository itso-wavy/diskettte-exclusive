import { createBrowserRouter } from 'react-router-dom';
import { RootLayout, Error, Feed, Search, Post, Liked, Profile } from '@/pages';

type Router = ReturnType<typeof createBrowserRouter>;

const router: Router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Feed />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'liked',
        element: <Liked />,
      },
      {
        path: ':username',
        element: <Profile />,
      },
      {
        path: ':username/:postId',
        element: <Post />,
      },
    ],
  },
]);

export default router;