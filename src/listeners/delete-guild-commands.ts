import { Listener } from 'discord-akairo';
import logger from '@lib/logger';
import { promisify } from 'util';
import { ClientConfig } from '@config';

const wait = promisify(setTimeout);

export default class DeleteGuildCommands extends Listener {
  public constructor() {
    super('produc', {
      emitter: 'client',
      event: 'ready',
    });
  }

  async exec() {
    // Wait for 10 seconds before starting
    await wait(10000);

    // Get all guilds
    const resolve = [];

    const guilds = this.client.guilds.cache;
    for (const [, guild] of guilds) {
      // Check if not dev server
      if (guild.id !== ClientConfig.guildDev) {
        if (guild.commands.cache.size !== 0) {
          resolve.push(guild.commands.set([]));
          logger.info(`Removed guild based commands from guildId: ${guild.id}`);
        }
      }
    }
  }
}
