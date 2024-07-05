import { createBrowserRouter } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SecondPage from './components/SecondPage';

type Router = ReturnType<typeof createBrowserRouter>;

const router: Router = createBrowserRouter([
  { path: '/', element: <LoginForm /> },
  {
    path: '/dashboard',
    element: <SecondPage />,
  },
]);

export default router;
