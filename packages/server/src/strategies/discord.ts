import passport from 'passport';
import DiscordStrategy from 'passport-discord';
import { logger, User } from '@duckbot/common';

import { StrategyConfig } from '../config';

passport.serializeUser(async (user, done) => {
  done(null, (user as User).id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findOne({ where: { id } });
    return user ? done(null, user) : done(null, null);
  } catch (err) {
    logger.error(err);
    return done(err, null);
  }
});

passport.use(
  'discord',
  new DiscordStrategy(
    {
      clientID: StrategyConfig.id,
      clientSecret: StrategyConfig.secret,
      callbackURL: StrategyConfig.callbackUrl,
      scope: ['identify', 'guilds'],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const { id, username, discriminator, avatar } = profile;
        logger.info('Searching for user...');
        const findUser = await User.findOne({
          where: {
            id,
          },
        });

        if (!findUser) {
          logger.info('User does not exist! Creating...');
          const newUser = await User.create({
            id,
            tag: `${username}#${discriminator}`,
            avatar,
          }).save();

          if (newUser) logger.info('User created!');

          return done(null, newUser);
        }

        logger.info('User found!');
        await User.update(id, {
          tag: `${username}#${discriminator}`,
          avatar,
        });

        return done(null, findUser);
      } catch (err) {
        logger.error(err);
        return done(null, undefined);
      }
    }
  )
);
