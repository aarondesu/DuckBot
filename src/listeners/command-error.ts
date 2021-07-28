import { Listener } from 'discord-akairo';
import { CommandInteraction } from 'discord.js';
import logger from '@lib/logger';
import { EmbedBuilderUtil } from '@lib/utils';
import { COLOR_ERROR } from '@constants';

export default class CommandError extends Listener {
  public constructor() {
    super('commandError', {
      emitter: 'slashCommandHandler',
      event: 'slashError',
    });
  }

  async exec(
    commandName: string,
    errorMessage: string,
    errorStack: string,
    interaction: CommandInteraction
  ) {
    try {
      logger.error(errorStack);
      const embed = EmbedBuilderUtil({
        color: COLOR_ERROR,
        footer: 'Command Error',
        title: 'A Problem has occured',
        description: `${commandName}: ${errorMessage}`,
        timestamp: true,
      });

      if (interaction.deferred) {
        await interaction.editReply({ embeds: [embed] });
      } else {
        await interaction.reply({ embeds: [embed] });
      }
    } catch ({ stack }) {
      logger.error(stack);
    }
  }
}
