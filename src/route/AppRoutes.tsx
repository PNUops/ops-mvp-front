import { useRoutes } from 'react-router-dom';

import MainLayout from '@layout/MainLayout';
import FullContainer from '@layout/FullContainer';
import FitContainer from '@layout/FitContainer';
import MainPage from '@pages/main/MainPage';
import ProjectEditorPage from '@pages/project-editor/ProjectEditorPage';
// import ProjectViewerPage from '@pages/project-viewer/ProjectViewerPage';
import SignInPage from '@pages/signin/SignInPage';
import SignUpPage from '@pages/signup/SignUpPage';
import AdminPage from '@pages/admin/AdminPage';
import ProjectViewerPage from '@pages/project-viewer/ProjectViewerPage';

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
              element: <SignUpPage />,
            },
            {
              path: 'signin',
              element: <SignInPage />,
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
              element: <ProjectViewerPage />,
            },
            {
              path: 'edit',
              element: <ProjectEditorPage />,
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
