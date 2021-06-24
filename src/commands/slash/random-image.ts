import { CommandInteraction } from 'discord.js';
import { SlashCommand } from '@structures/modules/slash-command';
import search from 'random-animals-api';

export default class RandomImage extends SlashCommand {
  public constructor() {
    super('random-image', {
      description: `Generates a random image`,
    });
  }

  async exec(interaction: CommandInteraction) {
    try {
      await interaction.defer();

      const animal = await search.dog();
      await interaction.reply({ content: `${animal}` });
    } catch ({ message, stack }) {
      await this.displayError(
        `Random Image failed to process command: ${message as string}`,
        stack,
        interaction
      );
    }
  }
}
