import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import detectlanguage from 'detectlanguage';
import logger from '../logger';

export default class AutoTranslator extends Listener {
  public constructor() {
    super('translator', {
      emitter: 'client',
      event: 'message',
    });
  }

  public async exec(message: Message) {
    logger.info('Message event called.');
    logger.info(message.content);
  }
}
