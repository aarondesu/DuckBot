import { CommandInteraction } from 'discord.js';
import { SlashCommand } from '@structures/modules/slash-command';
// import { EmbedBuilderUtil } from '@lib/utils';
import { getSfwWeeb } from '@lib/anime-api';
import { EmbedBuilderUtil } from '@lib/utils';
import { COLOR_PRIMARY } from '@constants';

export default class AnimeCommand extends SlashCommand {
  public constructor() {
    super('weeb', {
      description: `Gets random images from various subreddits.`,
    });
  }

  async exec(interaction: CommandInteraction) {
    try {
      await interaction.defer();

      const weebImage = await getSfwWeeb();
      const embed = EmbedBuilderUtil({
        color: COLOR_PRIMARY,
        author: `${weebImage.subredditName as string}`,
        title: weebImage.title,
        url: `https://reddit.com${weebImage.permalink as string}`,
        image: weebImage.imgUrl,
        description: `By u/${weebImage.author as string}`,
      });

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      throw new Error(error);
    }
  }
}
