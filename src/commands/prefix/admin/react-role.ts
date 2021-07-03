import { COLOR_PRIMARY, COLOR_ERROR } from '@constants';
import emojiRegex from 'emoji-regex';
import logger from '@lib/logger';
// import GuildModel from '@models/guilds.model';
// mport ReactionRole from '@models/reaction-role.model';
import { Argument, Command } from 'discord-akairo';
import { EmojiResolvable, Message, MessageEmbed, Role } from 'discord.js';
import ReactionRole from '@models/reaction-roles.model';

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
          new MessageEmbed()
            .setColor(COLOR_PRIMARY)
            .setDescription(
              `Reaction role successfully added into message (Click Here)[${cmdMessage.url}]`
            )
            .setFooter('Reaction role added!')
            .setTimestamp(),
        ],
      });
    } catch ({ errMsg, stack }) {
      logger.error(`${this.constructor.name} error. ${stack as string}`);
      return cmdMessage.util?.reply({
        embeds: [
          new MessageEmbed()
            .setColor(COLOR_ERROR)
            .setDescription(
              `Reaction role failed to process: ${errMsg as string}`
            )
            .setFooter('Error occured')
            .setTimestamp(),
        ],
      });
    }
  }
}
