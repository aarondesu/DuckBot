import { Listener } from 'discord-akairo';
import logger from 'lib/logger';

class ReadyListener extends Listener {
  public constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready',
    });
  }

  exec() {
    logger.info(`Logged in as user: ${this.client.user?.username as string}`);
  }
}

module.exports = ReadyListener;
