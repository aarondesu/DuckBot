/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

import { API_URL } from '../constants';
import { UserDetails } from '../types/user';

export const getUserDetails = () => {
  return axios.get<UserDetails>(`${API_URL}/auth/status`, {
    withCredentials: true,
  });
};

export const userLogout = async () => {
  await axios.get(`${API_URL}/auth/logout`, {
    withCredentials: true,
  });
};

export const validateGuild = (id: string) => {
  return axios.get<boolean>(`${API_URL}/discord/joined`, {
    withCredentials: true,
    data: {
      id,
    },
  });
};

export const getGuilds = () => {
  return axios.get(`${API_URL}/discord/guilds`, {
    withCredentials: true,
  });
};
