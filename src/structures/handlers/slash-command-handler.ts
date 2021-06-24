import { CommandInteraction, MessageEmbed } from 'discord.js';
import {
  AkairoClient,
  AkairoHandler,
  AkairoHandlerOptions,
} from 'discord-akairo';
import logger from '@lib/logger';
import { SlashCommand } from '@structures/modules/slash-command';
import { EmbedColorCoding } from '@constants';

export default class SlashCommandHandler extends AkairoHandler {
  public constructor(client: AkairoClient, options?: AkairoHandlerOptions) {
    super(client, {
      directory: options?.directory,
      classToHandle: SlashCommand,
    });

    this.setup();
  }

  setup() {
    this.client.on('interaction', async (interaction) => {
      await this.handleCommand(interaction as CommandInteraction);
    });

    this.client.on('ready', async () => {
      await this.initializeCommands();
    });
  }

  // TODO: Add permission validation
  async initializeCommands() {
    // Get all joined guilds
    const guilds = this.client.guilds.cache.map((guild) => guild.id);

    // Add commands to joined server
    logger.info('Adding slash commands to joined servers.');

    try {
      const cmds = [];
      for (const id of guilds) {
        // Clear all commands from server
        this.client.guilds.cache.get(id)?.commands.set([]);

        // Add the commands
        for (const [, data] of this.modules) {
          const slash = data as SlashCommand;

          // Check to see if it is disabled, if disabled skip adding this command
          if (!slash.options.disabled !== undefined && slash.options.disabled)
            // eslint-disable-next-line no-continue
            continue;

          cmds.push(
            this.client.guilds.cache.get(id)?.commands.create({
              name: slash.id,
              description: slash.options.description,
              options: slash.options.options,
            })
          );
        }
      }

      await Promise.all(cmds);
    } catch ({ message, stack }) {
      logger.error(`Failed to add commands to guild. ${stack as string}`);
    }
  }

  // TODO: Add morme validation
  // TODO: Add cooldown
  // TODO: Add permission checks
  async handleCommand(interaction: CommandInteraction) {
    if (!interaction.isCommand()) return;

    try {
      // Get command and execute
      const module = this.findCommand(interaction.commandName) as SlashCommand;
      if (!module) {
        throw new Error(`Command not found!`);
        return;
      }

      await module.exec(interaction);
    } catch ({ message, stack }) {
      const strErr = ` Error occured while processing command. ${
        stack as string
      }`;

      logger.error(strErr, stack);
      await interaction.reply({
        ephemeral: true,
        embeds: [
          new MessageEmbed()
            .setColor(EmbedColorCoding.error)
            .setFooter('Command Failed')
            .setDescription(strErr),
        ],
      });
    }
  }

  findCommand(name: string) {
    return this.modules.get(name);
  }
}
