import {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler,
} from 'discord-akairo';
import { Intents } from 'discord.js';
import { resolve } from 'path';
import logger from '@lib/logger';
import SlashCommandHandler from './handlers/slash-command-handler';
import { ClientConfig } from '../config';
import CronJobHandler from './handlers/cronjob-handler';

export default class DiscordBot extends AkairoClient {
  // TODO: Combine prefix command handler and slash command handler
  prefixCommandHandler = new CommandHandler(this, {
    directory: resolve(__dirname, '..', `commands/prefix`),
    commandUtil: true,
    allowMention: false,
    prefix: ClientConfig.prefix,
  });

  slashCommandHandler = new SlashCommandHandler(this, {
    directory: resolve(__dirname, '..', `commands/slash`),
  });

  listenerHandler = new ListenerHandler(this, {
    directory: resolve(__dirname, '..', `listeners`),
  });

  inhibitorHandler = new InhibitorHandler(this, {
    directory: resolve(__dirname, '..', `inhibitors`),
  });

  cronJobHandler = new CronJobHandler(this, {
    directory: resolve(__dirname, '..', `jobs`),
  });

  public constructor() {
    super(
      {
        // Akario settings
        ownerID: ClientConfig.owners,
      },
      {
        // Discord settings
        partials: ['CHANNEL', 'MESSAGE', 'GUILD_MEMBER', 'USER', 'REACTION'],
        intents: Intents.ALL,
      }
    );
  }

  async start() {
    logger.info('Initializing bot...');
    logger.info(`Starting bot in NODE_ENV=${process.env.NODE_ENV as string}`);

    logger.info('Loading inhibitors...');
    this.prefixCommandHandler.useInhibitorHandler(this.inhibitorHandler);
    // this.inhibitorHandler.loadAll();
    logger.info(`${this.inhibitorHandler.modules.size} inhibitors loaded.`);

    logger.info('Loading listeners...');
    this.prefixCommandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.setEmitters({
      listenerHandler: this.listenerHandler,
      inhibitorHandler: this.inhibitorHandler,
      prefixCommandHandler: this.prefixCommandHandler,
      slashCommandHandler: this.slashCommandHandler,
    });
    this.listenerHandler.loadAll();
    logger.info(`${this.listenerHandler.modules.size} listeners loaded.`);

    logger.info('Loading prefix commands...');
    this.prefixCommandHandler.loadAll();
    logger.info(
      `${this.prefixCommandHandler.modules.size} prefix commands loaded.`
    );

    logger.info('Loading slash commands...');
    this.slashCommandHandler.loadAll();
    logger.info(
      `${this.slashCommandHandler.modules.size} slash commands loaded.`
    );

    logger.info('Loading cron jobs...');
    this.cronJobHandler.loadAll();
    logger.info(`${this.cronJobHandler.modules.size} cron jobs loaded.`);

    logger.info('Logging into discord...');
    await this.login(process.env.DISCORD_TOKEN);
  }
}
