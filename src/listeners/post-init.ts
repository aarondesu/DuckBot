import { Listener } from 'discord-akairo';
import logger from '@lib/logger';
import { DuckPresence } from '@config';

export default class PostInit extends Listener {
  public constructor() {
    super('postinit', {
      emitter: 'client',
      event: 'ready',
    });
  }

  exec() {
    // Display login info
    logger.info(`Logged in as user: ${this.client.user?.username as string}`);

    // Set presence data
    this.client.user?.setPresence(DuckPresence);
  }
}
