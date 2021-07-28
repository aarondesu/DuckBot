import {} from 'discord.js';
import {
  AkairoClient,
  AkairoHandler,
  AkairoHandlerOptions,
} from 'discord-akairo';

import TwitterStreamModule from '@bot/structures/modules/twitter-stream-module';

export interface TwitterStremHandlerOptions extends AkairoHandlerOptions {}

export default class TwitterStreamHandler extends AkairoHandler {
  options: TwitterStremHandlerOptions;

  constructor(client: AkairoClient, options: TwitterStremHandlerOptions) {
    super(client, {
      directory: options.directory,
      classToHandle: TwitterStreamModule,
    });

    this.options = options;
  }
}
