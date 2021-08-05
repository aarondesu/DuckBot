/* eslint-disable @typescript-eslint/no-redeclare */
import React, { FC, useEffect, useState } from 'react';
import { Menu, Segment, Sidebar, Button } from 'semantic-ui-react';
import { Outlet, useNavigate } from 'react-router';

import Navbar from '../../components/navbar';
import DashboardRoutes from './routes';
import { DashboardContainer } from './styles';
import { getUserDetails, userLogout } from '../../adapters/api';
import { logout, setUser } from '../../store/auth';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { UserDetails } from '../../types/user';
import VerticalSidebar from '../../components/sidebar';
import ServerModal from '../../components/server-modal';

const DashboardPage: FC = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const { discordId } = useAppSelector((state) => state.discord);
  const [displayModal, setDisplayModal] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutButton = async () => {
    await userLogout();
    dispatch(logout());
  };

  useEffect(() => {
    // Get user information from backend
    getUserDetails()
      .then(({ data }) => {
        dispatch(setUser(data));
      })
      .catch(() => {
        navigate('/');
      });

    // Check if discordId has been set
    if (discordId === '') {
      // Display modal
      // TODO
      setDisplayModal(true);
    }
  }, [dispatch, navigate, isLoading, discordId]);

  return (
    <>
      {!isLoading && (
        <DashboardContainer>
          {discordId === '' && <ServerModal open={displayModal} />}
          <Navbar fixed="top">
            <Menu.Menu position="right">
              <Menu.Item>
                <Button as="a" onClick={logoutButton} primary>
                  Logout
                </Button>
              </Menu.Item>
            </Menu.Menu>
          </Navbar>
          <Sidebar.Pushable
            as={Segment}
            vertical
            style={{ overflow: 'hidden', marginTop: '52px' }}
          >
            <VerticalSidebar user={user as UserDetails} />
            <Sidebar.Pusher>
              <Segment vertical>
                <DashboardRoutes />
                <Outlet />
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </DashboardContainer>
      )}
    </>
  );
};

export default DashboardPage;
