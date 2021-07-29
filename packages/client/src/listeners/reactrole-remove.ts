import { Listener } from 'discord-akairo';
import { MessageReaction, Snowflake, User } from 'discord.js';

import { logger, ReactRole } from '@duckbot/common/dist';

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
      const reactionRoles = await ReactRole.findAll({
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
            removeRoles.push(
              member?.roles.remove(reactRole.roleId as Snowflake)
            );
          }
        }

        await Promise.all(removeRoles);
      }
    } catch ({ message, stack }) {
      logger.error(`Unexpeted error while removing role. ${stack as string}`);
    }
  }
}
