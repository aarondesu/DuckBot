import {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler,
} from 'discord-akairo';
import { Intents } from 'discord.js';
import { resolve } from 'path';
import logger from 'lib/logger';

export default class DiscordBot extends AkairoClient {
  // #region Handlers
  public commandHandler = new CommandHandler(this, {
    directory: resolve(__dirname, 'commands'),
    commandUtil: true,
    prefix: '?',
  });

  public inhibitorHandler = new InhibitorHandler(this, {
    directory: resolve(__dirname, 'inhibitors'),
  });

  public listenerHandler = new ListenerHandler(this, {
    directory: resolve(__dirname, 'listeners'),
  });
  // #endregion

  // #region Variables
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
        disableMentions: 'everyone',
        partials: ['CHANNEL', 'MESSAGE', 'GUILD_MEMBER'],
        ws: { intents: Intents.NON_PRIVILEGED },
      }
    );
  }
  // #endregion

  // #region Functions
  public async start() {
    logger.info('Initializing bot.');

    logger.info('Loading inhibitors...');
    this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
    this.inhibitorHandler.loadAll();
    logger.info(`${this.inhibitorHandler.modules.size} inhibitors loaded.`);

    logger.info('Loading commands...');
    this.commandHandler.loadAll();
    logger.info(`${this.commandHandler.modules.size} commands loaded.`);

    logger.info('Loading listeners...');
    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      inhibitorHandler: this.inhibitorHandler,
      listenerHandler: this.listenerHandler,
    });
    this.listenerHandler.loadAll();
    logger.info(`${this.listenerHandler.modules.size} listeners loaded.`);

    logger.info('Logging into discord...');
    await this.login(process.env.DISCORD_TOKEN);
    // #endregion
  }
}
