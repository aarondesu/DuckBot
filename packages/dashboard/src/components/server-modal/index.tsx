/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-bitwise */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-redeclare */
import React, { FC, useEffect, useState } from 'react';
import { DropdownItemProps, Form, Modal } from 'semantic-ui-react';
import { useQuery, gql } from '@apollo/client';

import { setDiscordId } from '../../store/discord';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { DISCORD_INVITE_URL } from '../../constants';

interface Guild {
  id: string;
  name: string;
  icon: string;
  permissions: string;
}

interface User {
  guilds: Guild[];
  botGuilds: Guild[];
}

interface UserData {
  user: User;
}

interface UserVariables {
  id: string;
}

const GET_USER_GUILDS = gql`
  query GetUserGuilds($id: String!) {
    user(id: $id) {
      guilds {
        id
        name
        icon
        owner
        permissions
      }
      botGuilds {
        id
      }
    }
  }
`;

interface ServerModalProps {
  open: boolean;
}

const ServerModal: FC<ServerModalProps> = ({ open }) => {
  const [selectedId, setSelectedId] = useState('');
  const [mutualGuilds, setMutualGuilds] = useState<Guild[]>();

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [servers, setServers] = useState<DropdownItemProps[]>([
    {
      value: 'placeholder',
      text: 'placeholder',
    },
  ]);

  const { loading, data } = useQuery<UserData, UserVariables>(GET_USER_GUILDS, {
    variables: { id: user?.id as string },
  });

  const onSubmit = () => {
    console.log(mutualGuilds);
    // Check if id is in mutual guilsd list
    const filter = mutualGuilds?.filter((guild) => guild.id === selectedId);
    if (filter?.length === 0) {
      console.log(DISCORD_INVITE_URL);
      // window.location.href = DISCORD_INVITE_URL;
    } else {
      dispatch(setDiscordId(selectedId));
    }
  };

  useEffect(() => {
    if (!loading) {
      const guilds = data?.user.guilds;
      const botGuilds = data?.user.botGuilds;

      // Get mutual guilds
      const mutual = guilds?.filter((guild) => {
        const find = botGuilds?.filter((bGuild) => bGuild.id === guild.id);
        if (find?.length === 1) {
          return true;
        }

        return false;
      });
      setMutualGuilds(mutual);

      // Filter servers where user has no MANAGE_ROLE permission
      const filtered = guilds?.filter((guild) => {
        const perms = Number(guild.permissions);
        if ((perms & 0x20) === 0x20) {
          return true;
        }
        return false;
      });

      const options = filtered?.map<DropdownItemProps>((guild) => {
        const option: DropdownItemProps = {
          text: guild.name,
          value: guild.id,
        };

        return option;
      });

      setServers(options as DropdownItemProps[]);
    }
  }, [loading, data]);

  return (
    <>
      <Modal open={open} size="mini">
        <Modal.Header as="h2" style={{ textAlign: 'center' }}>
          Server Selection
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Dropdown
              placeholder="Select Server"
              options={servers}
              fluid
              selection
              loading={loading}
              onChange={(_e, d) => setSelectedId(d.value as string)}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Form.Button onClick={onSubmit} loading={loading} primary>
            Done
          </Form.Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default ServerModal;
