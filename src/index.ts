import DiscordBot from '@structures/bot';
import logger from '@lib/logger';
import { connectDB } from '@database';
import { oneLine } from 'common-tags';

connectDB()
  .then((sequelize) => sequelize.sync())
  .then(() => {
    logger.info('Connetion to database successful!');
    const client = new DiscordBot();
    client.start().catch(({ message, stack }) =>
      logger.error(
        `An error occured. ${message as string} 
      \nStack: ${stack as string}`
      )
    );
  })
  .catch(({ message, stack }) => {
    logger.error(
      oneLine`Unable to connet to database. ${message as string}. ${
        stack as string
      }`
    );
  });
