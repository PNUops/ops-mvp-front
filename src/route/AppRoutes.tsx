import { useRoutes } from 'react-router-dom';

import MainLayout from '@layout/MainLayout';
import FullContainer from '@layout/FullContainer';
import FitContainer from '@layout/FitContainer';
import Main from '@pages/main/Main';
import ProjectEditor from '@pages/project-editor/ProjectEditor';
import ProjectViewer from '@pages/project-viewer/ProjectViewer';


import SignInPage from '@pages/signin/SignInPage';
import SignUpPage from '@pages/signup/SignUpPage';

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
              element: <Main />,
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
