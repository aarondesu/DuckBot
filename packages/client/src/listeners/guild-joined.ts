import { Guild as DGuild } from 'discord.js';
import { Listener } from 'discord-akairo';
import { logger, Guild } from '@duckbot/common';

export default class GuildJoined extends Listener {
  constructor() {
    super('guildJoined', {
      emitter: 'client',
      event: 'guildCreate',
    });
  }

  async exec(guild: DGuild) {
    logger.info(`Bot joined guild ${guild.name}! Adding guild to database...`);
    // Check if guild has been created
    try {
      const findGuild = await Guild.findOne(guild.id);
      if (!findGuild) {
        await Guild.create({
          id: guild.id,
          name: guild.name,
          icon: guild.icon as string,
        }).save();

        logger.info('Guild has been added to the database!');
      } else {
        await Guild.update(guild.id, {
          name: guild.name,
          icon: guild.icon as string,
        });
      }
    } catch ({ stack }) {
      logger.error(stack);
    }
  }
}
