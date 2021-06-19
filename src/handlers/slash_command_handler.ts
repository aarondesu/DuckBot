import { Collection, Interaction, MessageEmbed } from 'discord.js';
import {
  AkairoClient,
  AkairoHandler,
  AkairoHandlerOptions,
} from 'discord-akairo';
import { SlashCommand } from 'src/modules/slash_command';
import logger from 'lib/logger';
import { oneLine } from 'common-tags';

export default class SlashCommandHandler extends AkairoHandler {
  aliases: Collection<string, string> = new Collection();

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
    // const alias = this.aliases.get(name.toLowerCase()) as string;
    return this.modules.get(name);
  }
}
