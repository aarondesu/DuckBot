import { CommandInteraction, TextChannel } from 'discord.js';
import { SlashCommand } from '@bot/structures/modules/slash-command';
import { getNsfwWeeb, getRandomNsfwWeeb } from '@bot/lib/anime-api';
import { EmbedBuilderUtil } from '@bot/lib/utils';
import { COLOR_PRIMARY } from '@bot/constants';

const nsfwType = ['random', 'normal'];

export default class AnimeCommand extends SlashCommand {
  public constructor() {
    super('nsfw', {
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
            EmbedBuilderUtil({
              image:
                'https://media1.tenor.com/images/99c6105e9bf7a3f814f9d23db6ae601a/tenor.gif?itemid=12434221',
              footer: 'Must be NFSW channel',
            }),
          ],
        });
      } else {
        const type = nsfwType[Math.floor(Math.random() * nsfwType.length)];

        const nsfwResult =
          type === 'random' ? await getRandomNsfwWeeb() : await getNsfwWeeb();
        await interaction.editReply({
          embeds: [
            EmbedBuilderUtil({
              color: COLOR_PRIMARY,
              author: `${nsfwResult.subredditName as string}`,
              title: nsfwResult?.title,
              url: `https://reddit.com${nsfwResult?.permalink as string}`,
              image: nsfwResult.imgUrl,
              description: `By u/${nsfwResult.author as string}`,
            }),
          ],
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
