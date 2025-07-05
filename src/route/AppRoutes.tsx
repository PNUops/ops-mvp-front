import { useRoutes } from 'react-router-dom';

import MainLayout from '@layout/MainLayout';

import MainPage from '@pages/main/MainPage';
import ProjectEditorPage from '@pages/project-editor/ProjectEditorPage';
import ProjectViewerPage from '@pages/project-viewer/ProjectViewerPage';
import SignInPage from '@pages/signin/SignInPage';
import SignUpPage from '@pages/signup/SignUpPage';
import AdminPage from '@pages/admin/AdminPage';
import FindPage from '@pages/find/FindPage';
import ContestPage from '@pages/contest/ContestPage';

const AppRoutes = () =>
  useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <MainPage /> },
        { path: 'contest/:contestId', element: <ContestPage /> },
        { path: 'signin', element: <SignInPage /> },
        { path: 'signup', element: <SignUpPage /> },
        { path: 'teams/view/:teamId', element: <ProjectViewerPage /> },
        { path: 'teams/edit/:teamId', element: <ProjectEditorPage /> },
        { path: 'admin', element: <AdminPage /> },
        { path: 'find', element: <FindPage /> },
      ],
    },
  ]);

export default AppRoutes;
