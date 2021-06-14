import { Listener } from 'discord-akairo';
import logger from '../logger';

class ReadyListener extends Listener {
  public constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready',
    });
  }

  exec() {
    logger.info('Ready listener called');
  }
}

module.exports = ReadyListener;
