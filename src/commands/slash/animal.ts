import { CommandInteraction } from 'discord.js';
import { SlashCommand } from '@structures/modules/slash-command';
import * as animals from '@lib/random-animals';

export default class AnimalCommand extends SlashCommand {
  public constructor() {
    super('animal', {
      description: `Generates a random image`,
      options: [
        {
          name: 'type',
          description: 'Animal to search for',
          type: 'STRING',
          required: true,
          choices: [
            {
              name: 'Cat',
              value: 'cat',
            },
            {
              name: 'Dog',
              value: 'dog',
            },
            {
              name: 'Bunny',
              value: 'bunny',
            },
            {
              name: 'Fox',
              value: 'fox',
            },
            {
              name: 'Panda',
              value: 'panda',
            },
            {
              name: 'Duck',
              value: 'duck',
            },
          ],
        },
      ],
    });
  }

  async exec(interaction: CommandInteraction) {
    try {
      const animal = interaction.options.get('type')?.value as string;
      let result: string | undefined;

      await interaction.defer();

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

      if (!result) throw new Error('Unable to get random animal.');
      else await interaction.editReply({ content: result });
    } catch ({ message, stack }) {
      await this.emitError(message, stack, interaction);
    }
  }
}
