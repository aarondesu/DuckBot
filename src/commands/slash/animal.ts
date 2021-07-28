import {
  CommandInteraction,
  Interaction,
  Message,
  MessageActionRow,
  MessageSelectMenu,
} from 'discord.js';
import { SlashCommand } from '@structures/modules/slash-command';
import * as animals from '@lib/animal-api';

export default class AnimalCommand extends SlashCommand {
  public constructor() {
    super('animal', {
      description: `Generates a random image depending on the animal selected.`,
    });
  }

  async exec(interaction: CommandInteraction) {
    try {
      await interaction.defer();

      const selectMenu = new MessageSelectMenu()
        .setCustomID('animal')
        .addOptions(
          {
            label: 'Cat',
            value: 'cat',
          },
          {
            label: 'Dog',
            value: 'dog',
          },
          {
            label: 'Bunny',
            value: 'bunny',
          },
          {
            label: 'Fox',
            value: 'fox',
          },
          {
            label: 'Panda',
            value: 'panda',
          },
          {
            label: 'Duck',
            value: 'duck',
          }
        );

      const message = (await interaction.editReply({
        content: 'Which animal?',
        components: [new MessageActionRow().addComponents(selectMenu)],
      })) as Message;

      const interactionUser = interaction.user.id;
      const filter = (i: Interaction) => i.user.id === interactionUser;

      const collector = message.createMessageComponentInteractionCollector({
        filter,
        max: 1,
        time: 15000,
      });

      collector.on('collect', async (i) => {
        if (!i.isSelectMenu()) return;

        const animal = i.values?.toString();
        let result: string | undefined;

        // Get animal image from api
        switch (animal) {
          case 'cat':
            result = await animals.cat();
            break;
          case 'dog':
            result = await animals.dog();
            break;
          case 'bunny':
            result = await animals.bunny();
            break;
          case 'fox':
            result = await animals.fox();
            break;

          case 'panda':
            result = await animals.panda();
            break;
          case 'duck':
            result = await animals.duck();
            break;
          default:
            result = undefined;
            break;
        }

        // Reply to the user
        await interaction.editReply({ content: result, components: [] });
        collector.stop();
      });

      collector.on('end', async () => {
        if (collector.ended && collector.collected.size === 0) {
          await interaction.deleteReply();
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
