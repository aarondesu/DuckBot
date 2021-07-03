/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApplicationCommandOptionData, CommandInteraction } from 'discord.js';
import { AkairoModule, AkairoModuleOptions } from 'discord-akairo';
import logger from '@lib/logger';
import { COLOR_ERROR } from '@constants';
import { EmbedBuilderUtil } from '@lib/utils';

export interface SlashCommandOptions extends AkairoModuleOptions {
  description: string;
  options?: ApplicationCommandOptionData[];
  disabled?: boolean;
  ownerOnly?: boolean;
  cooldown?: number;
}

export class SlashCommand extends AkairoModule {
  options: SlashCommandOptions;

  logger = logger;

  public constructor(id: string, options: SlashCommandOptions) {
    super(id, options);

    this.options = options;
  }

  async emitError(
    message: string,
    stack: string,
    interaction: CommandInteraction
  ) {
    try {
      this.logger.error(stack);
      const embed = EmbedBuilderUtil({
        color: COLOR_ERROR,
        footer: 'Error Handling command',
        timestamp: true,
        description: `${this.constructor.name}: ${message}`,
      });

      if (interaction.deferred)
        await interaction.editReply({ embeds: [embed] });
      else await interaction.reply({ embeds: [embed] });
    } catch ({ errMsg, errStack }) {
      this.logger.error(`Failed to ${errStack as string}`);
    }
  }

  async init() {
    throw new Error(
      `Command ${this.constructor.name} execute function not yet implemented.`
    );
  }

  async exec(_interaction: CommandInteraction) {
    throw new Error(
      `Command ${this.constructor.name} execute function not yet implemented.`
    );
  }
}
