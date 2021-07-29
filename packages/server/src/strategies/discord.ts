import passport from 'passport';
import DiscordStrategy from 'passport-discord';
import { logger } from '@duckbot/common/dist';

import User from '../models/user.model';

passport.serializeUser((user, done) => {
  const u = user as User;
  done(null, u.discordId);
});

passport.deserializeUser(async (discordId: string, done) => {
  try {
    const user = await User.findOne({ where: { discordId } });
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
      clientID: process.env.DASHBOARD_CLIENT_ID as string,
      clientSecret: process.env.DASHOBARD_CLIENT_SECRET as string,
      callbackURL: process.env.DASHBOARD_CLIENT_CALLBACK_URL as string,
      scope: ['identify', 'guilds'],
    },
    async (_accessToken, _refreshToekn, profile, done) => {
      try {
        const { id, username, discriminator, avatar, guilds } = profile;
        const findUser = await User.findOne({
          where: { discordId: id },
        });

        if (!findUser) {
          logger.info('User does not exist! Creating...');
          const newUser = await User.create({
            discordId: id,
            discordTag: `${username}#${discriminator}`,
            avatar,
            guilds,
          });

          return done(null, newUser);
        }

        logger.info('User found!');
        const updatedUser = await findUser.update({
          ddiscordTag: `${username}#${discriminator}`,
          avatar,
          guilds,
        });

        return done(null, updatedUser);
      } catch (err) {
        logger.error(err);
        return done(null, undefined);
      }
    }
  )
);
