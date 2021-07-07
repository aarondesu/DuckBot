/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */
import Snoowrap from 'snoowrap';

import { APITokens } from './config';
import logger from './lib/logger';

const reddit = new Snoowrap({
  userAgent: 'API to be used for personal bot for our discord server',
  clientId: APITokens.redditClientId,
  clientSecret: APITokens.redditSecret,
  refreshToken: APITokens.redditRefreshToken,
  accessToken: APITokens.redditAccessToken,
});

reddit
  .getSubreddit('Animewallpaper')
  .fetch()
  .then((subreddit) =>
    subreddit.getControversial({
      limit: 200,
    })
  )
  .then((listing) => {
    console.log(listing.length);
    let rng = Math.floor(Math.random() * (100 + 1));
    while (listing[rng].is_self) {
      rng = Math.floor(Math.random() * (100 + 1));
    }

    console.log(listing[rng].title);
    console.log(listing[rng].author.name);
    console.log(listing[rng].url);
    console.log(listing[rng].permalink);
    console.log(listing[rng].subreddit.display_name);
  })
  .catch(logger.error);
