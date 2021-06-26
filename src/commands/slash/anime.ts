import { CommandInteraction, MessageEmbed, TextChannel } from 'discord.js';
import { SlashCommand } from '@structures/modules/slash-command';
import { nsfwImage } from '@lib/anime-api';

export default class AnimeCommand extends SlashCommand {
  public constructor() {
    super('anime', {
      description: `Gets anime images depending on type`,
      options: [
        {
          name: 'nsfw',
          description: 'Gets NSFW anime images',
          type: 'SUB_COMMAND',
          options: [
            {
              name: 'type',
              description: 'The type of NSFW to search, default will be waifu',
              type: 'STRING',
              required: true,
              choices: [
                {
                  name: 'waifu',
                  value: 'waifu',
                },
                {
                  name: 'neko',
                  value: 'neko',
                },
              ],
            },
          ],
        },
        {
          name: 'wallpaper',
          description: 'Gets wallapaper images from reddit',
          type: 'SUB_COMMAND',
        },
      ],
    });
  }

  async exec(interaction: CommandInteraction) {
    const channel = interaction.channel as TextChannel;

    const nsfw = interaction.options.get('nsfw');
    const wallpaper = interaction.options.get('wallpaper');

    try {
      await interaction.defer();

      if (nsfw) {
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
          const type = nsfw?.options?.get('type')?.value as string;
          const result = (await nsfwImage(type)) as string;

          await interaction.editReply({ content: result });
        }
      } else if (wallpaper) {
        await interaction.editReply({
          embeds: [
            new MessageEmbed()
              .setDescription('Feature not yet implemented.')
              .setTimestamp(),
          ],
        });
      }
    } catch ({ message, stack }) {
      await this.emitError(message, stack, interaction);
    }
  }
}
