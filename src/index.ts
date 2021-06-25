import DiscordBot from '@structures/bot';
import logger from '@lib/logger';
import connectDB from '@database';

connectDB()
  .then((sequelize) => sequelize.sync())
  .then(() => {
    logger.info('Connetion to database successful!');
    const client = new DiscordBot();
    client.start().catch(({ stack }) => {
      logger.error(stack as string);
      logger.error('Bot is exiting...');
      process.exit(0);
    });
  })
  .catch(({ stack }) => {
    logger.error(`Unable to connet to database. ${stack as string}`);
  });
