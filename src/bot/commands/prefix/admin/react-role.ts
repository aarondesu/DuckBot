import { COLOR_PRIMARY, COLOR_ERROR } from '@bot/constants';
import emojiRegex from 'emoji-regex';
import logger from '@common/lib/logger';
// import GuildModel from '@models/guilds.model';
// mport ReactionRole from '@models/reaction-role.model';
import { Argument, Command } from 'discord-akairo';
import { EmojiResolvable, Message, Role } from 'discord.js';
import ReactionRole from '@common/models/reaction-roles.model';
import { EmbedBuilderUtil } from '@bot/lib/utils';

interface CmdArgs {
  message: Message;
  emoji: EmojiResolvable;
  role: Role;
}

export default class ReaectRole extends Command {
  public constructor() {
    super('react-role', {
      aliases: ['react-role'],
      clientPermissions: ['MANAGE_ROLES', 'ADD_REACTIONS'],
      userPermissions: ['MANAGE_ROLES'],
      channel: 'guild',
      description: '',
      args: [
        {
          id: 'message',
          type: 'guildMessage',
          prompt: {
            start:
              'Enter the ID of the message the feature will be attatched to.',
            retry: 'Unable to resolve message',
          },
        },
        {
          id: 'emoji',
          type: Argument.union(
            'emoji',
            Argument.validate('string', (_, userInput) => {
              const regex = emojiRegex();
              const match = regex.exec(userInput);

              return !!match;
            })
          ),
          prompt: {
            start: 'Enter enter emoji to be used for reacting with the role',
            retry: 'Unable to resolve emoji',
          },
        },
        {
          id: 'role',
          type: 'role',
          prompt: {
            start: 'Enter the role that will be used to add after reacting.',
            retry: 'Unable to resolve role',
          },
        },
      ],
    });
  }

  async exec(cmdMessage: Message, { message, emoji, role }: CmdArgs) {
    try {
      const mId = message.id;
      const rId = role.id;
      const eId = emoji;
      const cId = message.channel.id;
      const gId = message.guild?.id;

      const model = await ReactionRole.create({
        guildId: gId,
        channelId: cId,
        messageId: mId,
        emojiId: eId,
        roleId: rId,
      });

      await model.save();

      await cmdMessage.react(emoji);

      return await cmdMessage.util?.reply({
        embeds: [
          EmbedBuilderUtil({
            color: COLOR_PRIMARY,
            description: `Reaction role successfully added into message (Click Here)[${cmdMessage.url}]`,
            footer: 'Reaction role added!',
            timestamp: true,
          }),
        ],
      });
    } catch ({ errMsg, stack }) {
      logger.error(`${this.constructor.name} error. ${stack as string}`);
      return cmdMessage.util?.reply({
        embeds: [
          EmbedBuilderUtil({
            color: COLOR_ERROR,
            description: `Reaction role failed to process: ${errMsg as string}`,
            footer: 'Error occured',
            timestamp: true,
          }),
        ],
      });
    }
  }
}
