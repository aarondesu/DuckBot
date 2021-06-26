/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import logger from './logger';

export async function nsfwImage(
  type: string | undefined
): Promise<string | undefined> {
  try {
    type res = {
      url: string;
    };

    const result = await axios.get<res>(
      `https://api.waifu.pics/nsfw/${type || 'waifu'}`
    );
    return result.data.url;
  } catch ({ stack }) {
    logger.error(stack);
    return undefined;
  }
}

/*
export async function wallpaper(name?: string | undefined): Promise<string> {
  const a

  const authToken = axios.post(
    'https://www.reddit.com/api/v1/access_token',
    {},
    {
      auth: {
        
      }
      headers: {},
    }
  );
}
*/
