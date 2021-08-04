import { Listener } from 'discord-akairo';
import { logger, Guild } from '@duckbot/common';

import { DuckPresence } from '../config';

export default class PostInit extends Listener {
  public constructor() {
    super('postinit', {
      emitter: 'client',
      event: 'ready',
    });
  }

  async initializeGuilds() {
    // Update existing guilds
    const existingGuilds = await Guild.find();

    await Promise.all(
      existingGuilds.map(async (guild) => {
        const exists = this.client.guilds.cache.get(guild.id);

        if (exists) {
          // Update guild info if it exists
          return Guild.update(guild, {
            name: exists.name,
            icon: exists.icon as string,
          });
        }

        // Remove guild if it doesn't exist in cache anymore
        return Guild.remove(guild);
      })
    );

    // Check if bot was added into server while it was offline
    const guilds = Array.from(this.client.guilds.cache.values());
    await Promise.all(
      guilds.map(async (guild) => {
        const exists = await Guild.findOne(guild.id);

        if (exists) return Promise.resolve();

        return Guild.create({
          id: guild.id,
          name: guild.name,
          icon: guild.icon as string,
        }).save();
      })
    );

    logger.info('Guild database initialized!');
  }

  async exec() {
    // Initialize guilds database
    await this.initializeGuilds();

    // Display login info
    logger.info(`Logged in as user: ${this.client.user?.username as string}`);

    // Set presence data
    this.client.user?.setPresence(DuckPresence);
  }
}
