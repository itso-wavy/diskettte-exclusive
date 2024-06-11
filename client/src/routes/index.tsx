import { createBrowserRouter } from 'react-router-dom';
import {
  RootLayout,
  UserLayout,
  Error,
  Feed,
  Search,
  UserPage,
  PostDetail,
  Bookmarks,
  Profile,
} from '@/pages';

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
        path: ':username',
        element: <UserLayout />,
        children: [
          {
            index: true,
            element: <UserPage />,
          },
          {
            path: ':postId',
            element: <PostDetail />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'bookmark',
            element: <Bookmarks />,
          },
        ],
      },
    ],
  },
]);

export default router;
