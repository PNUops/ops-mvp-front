import { createBrowserRouter, useRoutes } from 'react-router-dom';

import MainLayout from '@layout/MainLayout';

import MainPage from '@pages/main/MainPage';
import ProjectEditorPage from '@pages/project-editor/ProjectEditorPage';
import ProjectViewerPage from '@pages/project-viewer/ProjectViewerPage';
import SignInPage from '@pages/signin/SignInPage';
import SignUpPage from '@pages/signup/SignUpPage';
import AdminPage from '@pages/admin/AdminPage';
import FindPage from '@pages/find/FindPage';
import GoogleOAuthCallback from '@pages/signin/SocialSignIn/GoogleOAuthCallback';
import NoticeDetail from '@pages/notice/NoticeDetail';
import ContestPage from '@pages/contest/ContestPage';
import AdminTabs from './AdminTabs';

const AppRoutes = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <MainPage /> },
        { path: 'contest/:contestId', element: <ContestPage /> },
        { path: 'signin', element: <SignInPage /> },
        { path: 'signup', element: <SignUpPage /> },
        { path: 'teams/view/:teamId', element: <ProjectViewerPage /> },
        { path: 'teams/edit/:teamId', element: <ProjectEditorPage mode="edit" /> },
        {
          path: 'admin',
          element: <AdminPage />,
          children: AdminTabs,
        },
        { path: 'find', element: <FindPage /> },
        { path: 'oauth/google/callback', element: <GoogleOAuthCallback /> },
        { path: 'notices/:noticeId', element: <NoticeDetail /> },
      ],
    },
  ]);

export default AppRoutes;
