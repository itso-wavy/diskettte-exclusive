import { createBrowserRouter } from 'react-router-dom';
import {
  RootLayout,
  // AuthLayout,
  Error,
  Feed,
  Search,
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
        path: 'bookmark',
        element: <Bookmarks />,
      },
      {
        path: ':username',
        element: <Profile />,
      },
      {
        path: ':username/:postId',
        element: <PostDetail />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      // {
      //   path: 'auth',
      //   element: <AuthLayout />,
      //   children: [
      //     {
      //       path: 'login',
      //       element: <div>Login</div>,
      //       // element: <Login />,
      //     },
      //     {
      //       path: 'join',
      //       element: <div>join</div>,
      //       // element: <Register />,
      //     },
      //   ],
      // },
    ],
  },
]);

export default router;
