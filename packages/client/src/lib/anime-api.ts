import Snoowrap, { Listing, Submission } from 'snoowrap';
import { logger } from '@duckbot/common';

import {
  APITokens,
  weebNsfwSource,
  weebNsfwSourceRandom,
  weebResultLimit,
  weebSfwSource,
} from '../config';

export interface IRedditResult {
  author?: string;
  subredditName?: string;
  subredditUrl?: string;
  title?: string;
  permalink?: string;
  imgUrl?: string;
  is18?: boolean;
  isSelf?: boolean;
}

const reddit = new Snoowrap({
  userAgent: 'API to be used for personal bot for our discord server',
  clientId: APITokens.reddit.clientId,
  clientSecret: APITokens.reddit.secret,
  refreshToken: APITokens.reddit.refreshToekn,
  accessToken: APITokens.reddit.accessToken,
});

reddit.config({ requestDelay: 1000 });

async function weebGet(listing: Listing<Submission>) {
  let rng = Math.floor(Math.random() * (weebResultLimit + 1));
  // Check to see if post is marked nsfw and if it is not a self post
  while (listing[rng].is_self && listing[rng].over_18) {
    rng = Math.floor(Math.random() * (weebResultLimit + 1));
  }

  const result: IRedditResult = {
    title: listing[rng].title,
    author: listing[rng].author.name,
    imgUrl: listing[rng].url,
    permalink: listing[rng].permalink,
    subredditName: listing[rng].subreddit_name_prefixed,
    subredditUrl: `https://reddit.com/r/${listing[rng].subreddit.display_name}`,
    isSelf: listing[rng].is_self,
    is18: listing[rng].over_18,
  };

  return Promise.resolve(result);
}

const getWeebHot = (source: string): Promise<IRedditResult> => {
  const submissionRes = reddit
    .getSubreddit(source)
    .fetch()
    .then((subreddit) =>
      subreddit.getHot({
        limit: weebResultLimit,
      })
    )
    .then(weebGet);

  return submissionRes;
};

const getWeebTop = (source: string): Promise<IRedditResult> => {
  const submissionRes = reddit
    .getSubreddit(source)
    .fetch()
    .then((subreddit) =>
      subreddit.getTop({
        limit: weebResultLimit,
      })
    )
    .then(weebGet);

  return submissionRes;
};

const getWeebControversial = (source: string): Promise<IRedditResult> => {
  const submissionRes = reddit
    .getSubreddit(source)
    .fetch()
    .then((subreddit) =>
      subreddit.getControversial({
        limit: weebResultLimit,
      })
    )
    .then(weebGet);

  return submissionRes;
};

export const getSfwWeeb = async (): Promise<IRedditResult> => {
  const redditType = ['hot', 'top', 'controversial'];

  const source =
    weebSfwSource[Math.floor(Math.random() * weebSfwSource.length)];
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
};

export const getNsfwWeeb = async (): Promise<IRedditResult> => {
  const redditType = ['hot', 'top', 'controversial'];

  const source =
    weebNsfwSource[Math.floor(Math.random() * weebSfwSource.length)];
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
};

function getNsfwRandomResult(submission: Submission): IRedditResult {
  const result: IRedditResult = {
    author: submission.author.name,
    subredditName: submission.subreddit_name_prefixed,
    subredditUrl: `https://reddit.com/${submission.subreddit_name_prefixed}`,
    title: submission.title,
    permalink: submission.permalink,
    imgUrl: submission.url,
    isSelf: submission.is_self,
    is18: submission.over_18,
  };

  return result;
}

export const getRandomNsfwWeeb = async (): Promise<IRedditResult> => {
  let result: IRedditResult;
  const source =
    weebNsfwSourceRandom[
      Math.floor(Math.random() * weebNsfwSourceRandom.length)
    ];

  const resolve = [];
  do {
    resolve.push(
      (result = Promise.resolve(
        reddit
          .getSubreddit(source)
          .getRandomSubmission()
          .then(getNsfwRandomResult)
          .catch(({ stack }) => {
            logger.error(stack);
            return undefined;
          })
      ) as IRedditResult)
    );
  } while (result.isSelf && !result.is18);

  await Promise.all(resolve);
  return result;
};
