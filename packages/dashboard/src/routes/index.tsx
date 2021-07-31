import React, { FC } from 'react';
import { Navigate, useRoutes } from 'react-router';

import LandingPage from '../pages/landing';
import DashboardPage from '../pages/dashboard';

const ApplicationRoutes: FC = () => {
  const routes = useRoutes([
    {
      path: '*',
      element: <Navigate to="/" />,
    },
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: 'dashboard/*',
      element: <DashboardPage />,
    },
  ]);

  return <>{routes}</>;
};

export default ApplicationRoutes;
