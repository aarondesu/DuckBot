/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ApplicationCommandData,
  ApplicationCommandOptionData,
  CommandInteraction,
} from 'discord.js';
import { AkairoModule, AkairoModuleOptions } from 'discord-akairo';

import { logger } from '@duckbot/common';

export interface SlashCommandOptions extends AkairoModuleOptions {
  description: string;
  options?: ApplicationCommandOptionData[];
  disabled?: boolean;
  ownerOnly?: boolean;
  cooldown?: number;
  devOnly?: boolean;
  delete?: boolean;
}

export class SlashCommand extends AkairoModule {
  options: SlashCommandOptions;

  logger = logger;

  public constructor(id: string, options: SlashCommandOptions) {
    super(id, options);

    this.options = options;
  }

  async init() {
    throw new Error(`Execute function not yet implemented.`);
  }

  async exec(_interaction: CommandInteraction) {
    throw new Error(`Execute function not yet implemented.`);
  }

  getApplicationCommndData(): ApplicationCommandData {
    return {
      name: this.id,
      description: this.options.description,
      options: this.options.options,
      defaultPermission: !this.options.disabled,
    };
  }
}
