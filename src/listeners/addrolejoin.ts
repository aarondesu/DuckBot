import { Listener } from 'discord-akairo';
import { GuildMember, Role } from 'discord.js';
import logger from 'lib/logger';

export default class AddRoleJoin extends Listener {
  public constructor() {
    super('addrolejoin', {
      emitter: 'client',
      event: 'guildMemberAdd',
    });
  }

  async exec(guildMember: GuildMember) {
    // Auto assign guild member role
    logger.info(
      `${guildMember.user.tag} joined the channel. Adding Guest role...`
    );

    const guestRole = guildMember.guild.roles.cache.find(
      (role) => role.name === 'Guest'
    ) as Role;

    await guildMember.roles.add(guestRole);
  }
}
