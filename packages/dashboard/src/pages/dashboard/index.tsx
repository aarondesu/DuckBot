import React, { FC } from 'react';
import { Menu, Segment, Sidebar } from 'semantic-ui-react';

import Navbar from '../../components/navbar';
import { DashboardContainer } from './styles';

const VerticalSidebar: FC = () => {
  return (
    <Sidebar as={Menu} borderless inverted visible vertical direction="left">
      <Menu.Item as="a">Discord Info Here</Menu.Item>
      <Menu.Item as="a">General</Menu.Item>
      <Menu.Item as="a">Auto Role Join</Menu.Item>
      <Menu.Item as="a">Reminders</Menu.Item>
      <Menu.Item as="a">Twitter Webhooks</Menu.Item>
    </Sidebar>
  );
};

const DashboardPage: FC = () => {
  return (
    <>
      <DashboardContainer>
        <Navbar fixed="top">
          <Menu.Item position="right">Test</Menu.Item>
        </Navbar>
        <Sidebar.Pushable
          as={Segment}
          vertical
          style={{ overflow: 'hidden', marginTop: '52px' }}
        >
          <VerticalSidebar />
          <Sidebar.Pusher>
            <Segment vertical>Content Here</Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </DashboardContainer>
    </>
  );
};

export default DashboardPage;
