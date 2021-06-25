/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export async function waifu(): Promise<string> {
  type res = {
    url: string;
  };

  const result = await axios.get<res>('https://api.waifu.pics/nsfw/waifu');
  return result.data.url;
}
