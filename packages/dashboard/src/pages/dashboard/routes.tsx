import React, { FC, useEffect } from 'react';
import { Navigate, useLocation, useNavigate, useRoutes } from 'react-router';
import { useAppSelector } from '../../store/hooks';

import DashboardMainOutlet from './main';

const DashboardRoutes: FC = () => {
  const { discordId } = useAppSelector((state) => state.discord);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate back to '/dashboard' if no discordID is set
    if (
      location.pathname !== '/dashboard' &&
      (discordId === '' || discordId === undefined)
    ) {
      navigate('/dashboard');
    }
  }, [discordId, location.pathname, navigate]);

  const routes = useRoutes([
    {
      path: '*',
      element: <Navigate to="" />,
    },
    {
      path: '',
      element: <DashboardMainOutlet />,
    },
    {
      path: 'general',
      element: <div>General</div>,
    },
    {
      path: 'reminder',
      element: <div>Reminders</div>,
    },
  ]);

  return <>{routes}</>;
};

export default DashboardRoutes;
