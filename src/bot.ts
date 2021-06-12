import {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler,
} from 'discord-akairo';
import { resolve } from 'path';
import logger from './logger';

export default class DiscordBot extends AkairoClient {
  // #region Handlers
  public commandHandler = new CommandHandler(this, {
    directory: resolve(__dirname, './commands/'),
    prefix: '?',
  });

  public inhibitorHandler = new InhibitorHandler(this, {
    directory: resolve(__dirname, './inhibitors'),
  });

  public listenerHandler = new ListenerHandler(this, {
    directory: resolve(__dirname, './listeners/'),
  });
  // #endregion

  // #region Variables
  public logger = logger;
  // #endregion

  // #region Construcor
  public constructor() {
    super(
      {
        // Akario settings
        ownerID: '161427536096526336',
      },
      {
        // Discord settings
      }
    );
  }
  // #endregion

  // #region Functions

  // #endregion
}
