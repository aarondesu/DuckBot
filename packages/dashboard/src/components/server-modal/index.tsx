/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-redeclare */
import React, { FC, useEffect, useState } from 'react';
import { DropdownItemProps, Form, Modal } from 'semantic-ui-react';
import { useQuery, gql } from '@apollo/client';

import { setDiscordId } from '../../store/discord';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface Guild {
  id: string;
  name: string;
  icon: string;
}

interface User {
  guilds: Guild[];
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
      }
    }
  }
`;

interface ServerModalProps {
  open: boolean;
}

const ServerModal: FC<ServerModalProps> = ({ open }) => {
  const [selectedId, setSelectedId] = useState('');
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

  const test = () => {
    // TODO
  };

  const onSubmit = () => {
    console.log('Submit!');
    dispatch(setDiscordId(selectedId));
  };

  useEffect(() => {
    if (!loading) {
      const guilds = data?.user.guilds;

      const options = guilds?.map<DropdownItemProps>((guild) => {
        const option: DropdownItemProps = {
          text: guild.name,
          value: guild.id,
          image: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`,
        };

        return option;
      });

      setServers(options as DropdownItemProps[]);
    }

    console.log(data);
  }, [loading, data]);

  return (
    <>
      <Modal open={open} size="mini" onOpen={test}>
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
          <Form.Button onClick={onSubmit} primary>
            Done
          </Form.Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default ServerModal;
