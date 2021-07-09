import axios from 'axios';
import Snoowrap, { Listing, Submission } from 'snoowrap';
import { APITokens, weebSource } from '@config';

import logger from './logger';

export interface IRedditResult {
  author?: string;
  subredditName?: string;
  subredditUrl?: string;
  title?: string;
  permalink?: string;
  imgUrl?: string;
}

const reddit = new Snoowrap({
  userAgent: 'API to be used for personal bot for our discord server',
  clientId: APITokens.redditClientId,
  clientSecret: APITokens.redditSecret,
  refreshToken: APITokens.redditRefreshToken,
  accessToken: APITokens.redditAccessToken,
});

const resultLimit = 200;

export async function getNsfw(
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

async function weebGet(listing: Listing<Submission>) {
  let rng = Math.floor(Math.random() * (resultLimit + 1));
  while (listing[rng].is_self) {
    rng = Math.floor(Math.random() * (resultLimit + 1));
  }

  const result: IRedditResult = {
    title: listing[rng].title,
    author: listing[rng].author.name,
    imgUrl: listing[rng].url,
    permalink: listing[rng].permalink,
    subredditName: listing[rng].subreddit.display_name,
    subredditUrl: `https://reddit.com/r/${listing[rng].subreddit.display_name}`,
  };

  return Promise.resolve(result);
}

async function getWeebHot(source: string): Promise<IRedditResult> {
  const submissionRes = reddit
    .getSubreddit(source)
    .fetch()
    .then((subreddit) =>
      subreddit.getHot({
        limit: resultLimit,
      })
    )
    .then(weebGet);

  return submissionRes;
}

async function getWeebTop(source: string): Promise<IRedditResult> {
  const submissionRes = reddit
    .getSubreddit(source)
    .fetch()
    .then((subreddit) =>
      subreddit.getTop({
        limit: resultLimit,
      })
    )
    .then(weebGet);

  return submissionRes;
}

async function getWeebControversial(source: string): Promise<IRedditResult> {
  const submissionRes = reddit
    .getSubreddit(source)
    .fetch()
    .then((subreddit) =>
      subreddit.getControversial({
        limit: resultLimit,
      })
    )
    .then(weebGet);

  return submissionRes;
}

export async function getWeeb(): Promise<IRedditResult> {
  const redditType = ['hot', 'top', 'controversial'];

  const source = weebSource[Math.floor(Math.random() * weebSource.length)];
  const type = redditType[Math.floor(Math.random() * redditType.length)];

  let result: IRedditResult = {};

  switch (type) {
    case 'hot':
      result = await getWeebHot(source);
      break;
    case 'top':
      result = await getWeebTop(source);
      break;
    case 'controversial':
      result = await getWeebControversial(source);
      break;
  }

  return result;
}
