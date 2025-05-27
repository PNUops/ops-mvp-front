import { useRoutes } from 'react-router-dom';

import MainLayout from '@layout/MainLayout';
import FullContainer from '@layout/FullContainer';
import FitContainer from '@layout/FitContainer';
import SignUp from '@pages/auth/SignUp';
import Login from '@pages/auth/Login';
import MainPage from '@pages/main/MainPage';
import ProjectEditor from '@pages/project-editor/ProjectEditor';
import ProjectViewer from '@pages/project-viewer/ProjectViewer';
import AdminPage from '@pages/admin/AdminPage';

const AppRoutes = () =>
  useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          element: <FullContainer />,
          children: [
            {
              path: 'signup',
              element: <SignUp />,
            },
            {
              path: 'login',
              element: <Login />,
            },
          ],
        },
        {
          element: <FitContainer />,
          children: [
            {
              index: true,
              element: <MainPage />,
            },
            {
              path: 'view',
              element: <ProjectViewer />,
            },
            {
              path: 'edit',
              element: <ProjectEditor />,
            },
            {
              path: 'monitor',
              element: <AdminPage />,
            },
          ],
        },
      ],
    },
  ]);

export default AppRoutes;
