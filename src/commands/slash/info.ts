import { CommandInteraction, MessageEmbed } from 'discord.js';
import { SlashCommand } from '@structures/modules/slash-command';
import { oneLine } from 'common-tags';
import { EmbedColorCoding } from '@constants';

export default class InfoCommand extends SlashCommand {
  public constructor() {
    super('info', {
      description: `Returns info about the bot`,
    });
  }

  async exec(interaction: CommandInteraction) {
    const owner = await this.client.users.fetch('161427536096526336');
    const botInfo = new MessageEmbed()
      .setColor(EmbedColorCoding.primary)
      .setURL('https://github.com/Shinudesu/RALMBot')
      .setThumbnail(
        'https://cdn.discordapp.com/attachments/841881726946377738/855647445777645618/33022.png'
      )
      .setTitle('RALM-Botm(Rappy A La Mode Bot)')
      .setDescription('Discord bot for our server!')
      .setThumbnail(
        'https://cdn.discordapp.com/attachments/841881726946377738/855647445777645618/33022.png'
      )
      .addFields(
        {
          name: 'Report Issues',
          value: '[Click Here](https://github.com/Shinudesu/RALMBot/issues)',
          inline: true,
        },
        {
          name: 'Source',
          value: '[Click Here](https://github.com/Shinudesu/RALMBot)',
          inline: true,
        }
      )
      .setTimestamp()
      .setFooter(`developed by ${owner.tag}`, `${owner.avatarURL() as string}`);

    try {
      await interaction.reply({ embeds: [botInfo] });
    } catch ({ message, stack }) {
      await this.displayError(
        oneLine`Failed to send message. ${message as string}`,
        stack,
        interaction
      );
    }
  }
}
