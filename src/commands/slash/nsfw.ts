import {
  CommandInteraction,
  Message,
  MessageActionRow,
  MessageSelectMenu,
  TextChannel,
} from 'discord.js';
import { SlashCommand } from '@structures/modules/slash-command';
import { getNsfw } from '@lib/anime-api';
import { EmbedBuilderUtil } from '@lib/utils';

export default class AnimeCommand extends SlashCommand {
  public constructor() {
    super('nsfw', {
      description: `Gets anime images depending on type`,
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
        // Display select menu to see which nsfw type would be chosen
        const selectMenu = new MessageSelectMenu()
          .setCustomID('nsfw-type')
          .addOptions(
            {
              label: 'Waifu',
              value: 'waifu',
            },
            {
              label: 'Neko',
              value: 'neko',
            },
            {
              label: 'Futa(trap)',
              value: 'trap',
            }
          );

        const message = (await interaction.editReply({
          content: 'Which one would you like?',
          components: [new MessageActionRow().addComponents(selectMenu)],
        })) as Message;

        const collector = message.createMessageComponentInteractionCollector({
          max: 1,
          time: 3000,
        });

        collector.on('collect', async (i) => {
          if (!i.isSelectMenu()) return;

          const type = i.values?.toString() as string;
          const result = (await getNsfw(type)) as string;

          await interaction.editReply({ content: result, components: [] });
        });

        collector.on('end', async () => {
          if (collector.ended && collector.collected.size === 0) {
            await message.delete();
          }
        });
      }
    } catch ({ message, stack }) {
      await this.emitError(message, stack, interaction);
    }
  }
}
