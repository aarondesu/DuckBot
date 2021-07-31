import { Guild } from 'discord.js';
import { Listener } from 'discord-akairo';
import { logger, Guild as EGuild } from '@duckbot/common';

export default class GuildJoined extends Listener {
  constructor() {
    super('guildJoined', {
      emitter: 'client',
      event: 'guildCreate',
    });
  }

  async exec(guild: Guild) {
    logger.info(`Bot joined guild ${guild.name}! Adding guild to database...`);
    // Check if guild has been created
    try {
      const findGuild = await EGuild.findOne(guild.id);
      if (!findGuild) {
        await EGuild.create({
          id: guild.id,
          name: guild.name,
          avatar: guild.icon as string,
        }).save();
        logger.info('Guild has been added to the database!');
      } else {
        await EGuild.update(guild.id, {
          name: guild.name,
          avatar: guild.icon as string,
        });
      }
    } catch ({ stack }) {
      logger.error(stack);
    }
  }
}
