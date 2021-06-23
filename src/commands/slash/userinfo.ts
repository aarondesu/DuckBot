import { CommandInteraction, MessageEmbed, Snowflake } from 'discord.js';
import { SlashCommand } from '@structures/modules/slash_command';
import logger from '@lib/logger';
import { dateToString } from '@lib/utils';
import { EmbedColorCoding } from '@constants';

export default class UserInfoCommand extends SlashCommand {
  public constructor() {
    super('userinfo', {
      description: `Gets information regarding the user`,
      options: [
        {
          name: 'user',
          description: 'User to be searched.',
          type: 'USER',
          required: true,
        },
      ],
    });
  }

  async exec(interaction: CommandInteraction) {
    await interaction.defer();

    try {
      const { guild } = interaction;
      const user = await this.client.users.fetch(
        interaction.options.get('user')?.value as Snowflake
      );

      const guildUser = guild?.members.cache.get(user.id);

      await interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(EmbedColorCoding.primary)
            .setAuthor(`${user.tag}`, `${user.avatarURL() as string}`)
            .setThumbnail(`${user.avatarURL() as string}`)
            .setFooter('User Info')
            .setTimestamp()
            .addFields(
              { name: 'ID', value: `${user.id}`, inline: true },
              {
                name: 'Status',
                value: `${user.presence.status}`,
                inline: true,
              },
              {
                name: 'Nickname',
                value: `${
                  !guildUser?.nickname
                    ? (guildUser?.nickname as string)
                    : 'none'
                }`,
              },
              {
                name: 'Account Created',
                value: `${dateToString(user.createdAt)}`,
              },
              {
                name: 'Join Date',
                value: `${dateToString(guildUser?.joinedAt as Date)}`,
              },
              {
                name: 'Roles',
                value: `${guildUser?.roles.cache.size as number}`,
              }
            ),
        ],
      });
    } catch ({ messag: message, stack }) {
      await this.displayError(
        `Unable to retrieve user info ${message as string}`,
        stack as string,
        interaction
      );
    }
  }
}
