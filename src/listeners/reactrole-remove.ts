import logger from '@lib/logger';
import ReactionRoles from '@models/reaction-roles.model';
import { Listener } from 'discord-akairo';
import { MessageReaction, User } from 'discord.js';
// import logger from '@lib/logger';

export default class ReactRoleRemove extends Listener {
  public constructor() {
    super('react=role-remove', {
      emitter: 'client',
      event: 'messageReactionRemove',
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
        const removeRoles = [];

        for (const reactRole of reactionRoles) {
          if (
            reactRole.emojiId === reaction.emoji.toString() &&
            reactRole.messageId === reaction.message.id
          ) {
            removeRoles.push(member?.roles.remove(reactRole.roleId));
          }
        }

        await Promise.all(removeRoles);
      }
    } catch ({ message, stack }) {
      logger.error(
        `Unexpeted error while removing role. ${message as string}: ${
          stack as string
        }`
      );
    }
  }
}
