import { createBrowserRouter } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import DashboardPage from './components/DashboardPage';

type Router = ReturnType<typeof createBrowserRouter>;

const router: Router = createBrowserRouter([
  { path: '/', element: <LoginForm /> },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
]);

export default router;
