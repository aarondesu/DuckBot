import { CommandInteraction, Snowflake } from 'discord.js';
import { SlashCommand } from '@structures/modules/slash-command';
import { dateToString, EmbedBuilderUtil } from '@lib/utils';
import { COLOR_PRIMARY } from '@constants';

export default class UserInfoCommand extends SlashCommand {
  public constructor() {
    super('userinfo', {
      description: `Gets information regarding the user. Requests self if no user supplied`,
      options: [
        {
          name: 'user',
          description: 'User to be searched.',
          type: 'USER',
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
          EmbedBuilderUtil({
            color: COLOR_PRIMARY,
            author: user.tag,
            icon: user.avatarURL() as string,
            thumbnail: user.avatarURL() as string,
            footer: `User info`,
            timestamp: true,
            fields: [
              { name: 'ID', value: `${user.id}` },
              {
                name: 'Status',
                value: `${user.presence.status as string}`,
                inline: true,
              },
              {
                name: 'Nickname',
                value: `${guildUser?.nickname?.toString() as string}`,
                inline: true,
              },
              {
                name: 'Account Created',
                value: `${dateToString(user.createdAt)}`,
              },
              {
                name: 'Join Date',
                value: `${dateToString(guildUser?.joinedAt as Date)}`,
                inline: true,
              },
              {
                name: 'Roles',
                value: `${guildUser?.roles.cache.size.toString()} `,
              },
            ],
          }),
        ],
      });
    } catch ({ messag: message, stack }) {
      await this.emitError(message, stack, interaction);
    }
  }
}
