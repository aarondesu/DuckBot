import logger from '@common/lib/logger';
import ReactionRoles from '@common/models/reaction-roles.model';
import { Listener } from 'discord-akairo';
import { MessageReaction, User, Snowflake } from 'discord.js';

export default class ReactRoleAdd extends Listener {
  public constructor() {
    super('react-role-remove', {
      emitter: 'client',
      event: 'messageReactionAdd',
    });
  }

  async exec(reaction: MessageReaction, user: User) {
    if (user.id === this.client.user?.id || !reaction.message.guild || user.bot)
      return;

    try {
      const reactionRoles = await ReactionRoles.findAll({
        where: { guildId: reaction.message.guild.id },
      });

      if (reactionRoles.length > 0) {
        const member = reaction.message.guild.members.cache.get(user.id);
        const giveRoles = [];

        for (const reactRole of reactionRoles) {
          if (
            reactRole.emojiId === reaction.emoji.toString() &&
            reactRole.messageId === reaction.message.id
          ) {
            giveRoles.push(member?.roles.add(reactRole.roleId as Snowflake));
          }
        }

        await Promise.all(giveRoles);
      }
    } catch ({ message, stack }) {
      logger.error(`Unexpeted error while adding role. ${stack as string}`);
    }
  }
}
