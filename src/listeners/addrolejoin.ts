import { oneLine } from 'common-tags';
import { Listener } from 'discord-akairo';
import { GuildMember, Role } from 'discord.js';
import logger from '@lib/logger';

export default class AddRoleJoin extends Listener {
  public constructor() {
    super('addrolejoin', {
      emitter: 'client',
      event: 'guildMemberAdd',
    });
  }

  async exec(guildMember: GuildMember) {
    // Check if guild member is a bot
    if (guildMember.user.bot === true) return;

    try {
      // Auto assign guild member role
      logger.info(
        `${guildMember.user.tag} joined the server. Adding Guest role...`
      );

      const guestRole = guildMember.guild.roles.cache.find(
        (role) => role.name === 'Guest'
      ) as Role;

      await guildMember.roles.add(guestRole);
    } catch (error) {
      logger.error(
        oneLine`Failed to add role to user ${guildMember.user.tag}. ${
          error as string
        }`
      );
    }
  }
}
