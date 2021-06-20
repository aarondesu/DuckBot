import { Interaction, MessageEmbed } from 'discord.js';
import {
  AkairoClient,
  AkairoHandler,
  AkairoHandlerOptions,
} from 'discord-akairo';
import logger from 'lib/logger';
import { oneLine } from 'common-tags';
import { SlashCommand } from '../modules/slash_command';

export default class SlashCommandHandler extends AkairoHandler {
  public constructor(client: AkairoClient, options?: AkairoHandlerOptions) {
    super(client, {
      directory: options?.directory,
      classToHandle: SlashCommand,
    });

    this.client.on('interaction', async (interaction) => {
      await this.handleCommand(interaction);
    });

    this.client.on('ready', async () => {
      await this.initializeCommands();
    });
  }

  async initializeCommands() {
    // Get all joined guilds
    const guilds = this.client.guilds.cache.map((guild) => guild.id);

    // Add commands to joined server
    logger.info('Adding commands to joined servers.');
    for (const id of guilds) {
      // Clear all commands from server
      this.client.guilds.cache.get(id)?.commands.set([]);

      try {
        // Add the commands
        for (const [, data] of this.modules) {
          const slash = data as SlashCommand;

          // eslint-disable-next-line no-await-in-loop
          await this.client.guilds.cache.get(id)?.commands.create({
            name: slash.id,
            description: slash.options.description,
            options: slash.options.options,
          });
        }
      } catch (error) {
        logger.error(`Failed to add commands to guild. ${error as string}`);
      }
    }
  }

  async handleCommand(interaction: Interaction) {
    if (!interaction.isCommand()) return;
    try {
      const module = this.findCommand(interaction.commandName) as SlashCommand;
      module.exec(interaction);
    } catch (error) {
      const strErr = oneLine`
        Error occured while processing command.
        ${error}
      `;

      logger.error(strErr);
      await interaction.reply({
        embeds: [
          new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Command Failed')
            .setDescription(strErr),
        ],
      });
    }
  }

  findCommand(name: string) {
    return this.modules.get(name);
  }
}
