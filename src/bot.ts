import {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler,
} from 'discord-akairo';
import { Intents } from 'discord.js';
import { resolve } from 'path';
import logger from './logger';

export default class DiscordBot extends AkairoClient {
  // #region Handlers
  public commandHandler = new CommandHandler(this, {
    directory: resolve(__dirname, '..', './src/commands'),
    prefix: '?',
  });

  public inhibitorHandler = new InhibitorHandler(this, {
    directory: resolve(__dirname, '..', './src/inhibitors'),
  });

  public listenerHandler = new ListenerHandler(this, {
    directory: resolve(__dirname, '..', './src/listeners'),
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
        partials: ['CHANNEL', 'MESSAGE', 'GUILD_MEMBER'],
        ws: {
          intents: [Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_MESSAGES],
        },
      }
    );

    logger.info(resolve(__dirname, '..', 'command'));
  }
  // #endregion

  // #region Functions
  public async start() {
    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      inhibitorHandler: this.inhibitorHandler,
      listenerHandler: this.listenerHandler,
    });
    this.listenerHandler.loadAll();

    logger.info('Logging into discord...');
    this.login(process.env.DISCORD_TOKEN)
      .then(() => {
        logger.info(`Logged in as user: ${this.user?.username as string}`);
      })
      .catch((err) => {
        logger.error(`${err as string}`);
      });
  }
  // #endregion
}
