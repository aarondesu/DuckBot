import { CommandInteraction } from 'discord.js';
import { SlashCommand } from '@structures/modules/slash-command';
// import { EmbedBuilderUtil } from '@lib/utils';
import { getWeeb } from '@lib/anime-api';
import { EmbedBuilderUtil } from '@lib/utils';
import { COLOR_PRIMARY } from '@constants';

export default class AnimeCommand extends SlashCommand {
  public constructor() {
    super('weeb', {
      description: `Gets anime images depending on type`,
    });
  }

  async exec(interaction: CommandInteraction) {
    try {
      await interaction.defer();

      const wallpaper = await getWeeb();
      const embed = EmbedBuilderUtil({
        color: COLOR_PRIMARY,
        title: wallpaper.title,
        url: `https://reddit.com${wallpaper.permalink}`,
        image: wallpaper.imgUrl,
        description: `By u/${wallpaper.author}']`,
        footer: `r/${wallpaper.subredditName}`,
        timestamp: true,
      });

      await interaction.editReply({ embeds: [embed] });
    } catch ({ message, stack }) {
      await this.emitError(message, stack, interaction);
    }
  }
}
