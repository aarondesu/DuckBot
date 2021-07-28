import DiscordBot from '@bot/structures/bot';
import logger from '@common/lib/logger';
import connectDB from 'src/database';

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
