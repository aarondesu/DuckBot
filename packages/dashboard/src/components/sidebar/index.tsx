/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-redeclare */
import React, { FC, useState } from 'react';
import {
  Menu,
  Sidebar,
  Image,
  Header,
  Divider,
  MenuItemProps,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { UserDetails } from '../../types/user';

interface VerticalSidebarProps {
  user: UserDetails;
}

const VerticalSidebar: FC<VerticalSidebarProps> = ({ user }) => {
  const [activeItem, setActiveItem] = useState('');

  const handleItemClick = (
    _e: React.MouseEvent<HTMLAnchorElement>,
    data: MenuItemProps
  ) => {
    setActiveItem(data.name as string);
  };

  return (
    <Sidebar as={Menu} borderless inverted visible vertical direction="left">
      <Menu.Item>
        <Image
          src={`https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.webp`}
          size="small"
          circular
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
        />
      </Menu.Item>
      <Menu.Item style={{ textAlign: 'center' }}>
        <Header as="h3" inverted>
          {user?.tag}
        </Header>
      </Menu.Item>
      <Divider horizontal inverted />
      <Menu.Item
        name="general"
        as={Link}
        to="general"
        active={activeItem === '/general'}
        onClick={handleItemClick}
      >
        General
      </Menu.Item>
      <Menu.Item
        name="reminder"
        as={Link}
        to="reminder"
        active={activeItem === '/reminder'}
        onClick={handleItemClick}
      >
        Reminders
      </Menu.Item>
      <Menu.Item
        name="twitter"
        as={Link}
        to="reminder"
        active={activeItem === '/twitter'}
        onClick={handleItemClick}
      >
        Twitter Webhooks
      </Menu.Item>
      <Menu.Item
        name="options"
        as={Link}
        to="reminder"
        active={activeItem === '/options'}
        onClick={handleItemClick}
      >
        Options
      </Menu.Item>
    </Sidebar>
  );
};

export default VerticalSidebar;
