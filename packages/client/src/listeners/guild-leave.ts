import { Guild } from 'discord.js';
import { Listener } from 'discord-akairo';
import { logger, Guild as EGuild } from '@duckbot/common';

export default class GuildJoined extends Listener {
  constructor() {
    super('guildLeave', {
      emitter: 'client',
      event: 'guildDelete',
    });
  }

  async exec(guild: Guild) {
    try {
      logger.info(`Bot left guild ${guild.name}! Removing from database...`);
      const findGuild = await EGuild.findOne({ where: { id: guild.id } });
      if (findGuild) {
        await findGuild.remove();
        logger.info(`Guild successfully removed from database`);
      } else {
        logger.info(`Bot not found in database. Skipping!`);
      }
    } catch ({ stack }) {
      logger.error(stack);
    }
  }
}
