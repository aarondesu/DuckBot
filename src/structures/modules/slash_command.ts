/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApplicationCommandOptionData, CommandInteraction } from 'discord.js';
import { AkairoError, AkairoModule, AkairoModuleOptions } from 'discord-akairo';

export interface SlashCommandOptions extends AkairoModuleOptions {
  description: string;
  options?: ApplicationCommandOptionData[];
}

export class SlashCommand extends AkairoModule {
  options: SlashCommandOptions;

  public constructor(id: string, options: SlashCommandOptions) {
    super(id, options);

    this.options = options;
  }

  exec(interaction: CommandInteraction) {
    throw new Error(
      `Command ${this.constructor.name} execute not yet implemented.`
    );
  }
}
