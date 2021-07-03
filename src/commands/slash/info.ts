import { CommandInteraction } from 'discord.js';
import { SlashCommand } from '@structures/modules/slash-command';
import { oneLine } from 'common-tags';
import { COLOR_PRIMARY } from '@constants';
import { EmbedBuilderUtil } from '@lib/utils';

export default class InfoCommand extends SlashCommand {
  public constructor() {
    super('info', {
      description: `Returns info about the bot`,
    });
  }

  async exec(interaction: CommandInteraction) {
    const owner = await this.client.users.fetch('161427536096526336');

    try {
      await interaction.reply({
        embeds: [
          EmbedBuilderUtil({
            color: COLOR_PRIMARY,
            url: 'https://github.com/Shinudesu/DuckBot',
            thumbnail:
              'https://cdn.discordapp.com/attachments/841881726946377738/855647445777645618/33022.png',
            title: 'Duck Bot',
            description: 'Discord bot for our server!',
            timestamp: true,
            footer: `Developed by ${owner.tag}`,
            footerIcon: `${owner.avatarURL() as string}`,
            fields: [
              {
                name: 'Report issues',
                value:
                  '[Click Here](https://github.com/Shinudesu/DuckBot/issues)',
                inline: true,
              },
              {
                name: 'Source',
                value: '[Click Here](https://github.com/Shinudesu/DuckBot)',
                inline: true,
              },
            ],
          }),
        ],
      });
    } catch ({ message, stack }) {
      await this.emitError(
        oneLine`Failed to send message. ${message as string}`,
        stack,
        interaction
      );
    }
  }
}
