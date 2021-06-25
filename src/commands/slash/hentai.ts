import { CommandInteraction, MessageEmbed, TextChannel } from 'discord.js';
import { SlashCommand } from '@structures/modules/slash-command';
import { waifu } from '@lib/hentai';

export default class HentaiCommand extends SlashCommand {
  public constructor() {
    super('hentai', {
      description: `( ͡° ͜ʖ ͡°)`,
    });
  }

  async exec(interaction: CommandInteraction) {
    const channel = interaction.channel as TextChannel;

    try {
      await interaction.defer();

      // Check if channel is nsfw
      if (!channel.nsfw) {
        await interaction.editReply({
          embeds: [
            new MessageEmbed()
              .setImage(
                'https://media1.tenor.com/images/99c6105e9bf7a3f814f9d23db6ae601a/tenor.gif?itemid=12434221'
              )
              .setFooter('Must be NSFW channel')
              .setTimestamp(),
          ],
        });
      } else {
        // Get hentai
        const result = await waifu();
        await interaction.editReply({ content: `${result}` });
      }
    } catch ({ message, stack }) {
      await this.emitError(message, stack, interaction);
    }
  }
}
