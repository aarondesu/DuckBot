import { CommandInteraction } from 'discord.js';
import { SlashCommand } from '@structures/modules/slash-command';
import { EmbedBuilderUtil } from '@lib/utils';

export default class AnimeCommand extends SlashCommand {
  public constructor() {
    super('anime', {
      description: `Gets anime images depending on type`,
      disabled: true,
      options: [
        {
          name: 'wallpaper',
          description: 'Gets wallapaper images from reddit',
          type: 'SUB_COMMAND',
        },
      ],
    });
  }

  async exec(interaction: CommandInteraction) {
    const wallpaper = interaction.options.get('wallpaper');

    try {
      await interaction.defer();

      if (wallpaper) {
        await interaction.editReply({
          embeds: [
            EmbedBuilderUtil({
              description: 'Feature not yet iplemented',
            }),
          ],
        });
      }
    } catch ({ message, stack }) {
      await this.emitError(message, stack, interaction);
    }
  }
}
