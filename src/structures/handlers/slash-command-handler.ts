import { CommandInteraction, Snowflake } from 'discord.js';
import {
  AkairoClient,
  AkairoHandler,
  AkairoHandlerOptions,
} from 'discord-akairo';
import logger from '@lib/logger';
import { SlashCommand } from '@structures/modules/slash-command';
import { promisify } from 'util';
import { ClientConfig } from '@config';

const wait = promisify(setTimeout);

export default class SlashCommandHandler extends AkairoHandler {
  public constructor(client: AkairoClient, options?: AkairoHandlerOptions) {
    super(client, {
      directory: options?.directory,
      classToHandle: SlashCommand,
    });

    this.setup();
  }

  setup() {
    this.client.on('interaction', (interaction) => {
      this.handleCommand(interaction as CommandInteraction);
    });

    this.client.on('ready', async () => {
      await wait(3000); // Wait for 3 seconds before registering slash commands
      await this.registerSlashCommands();
      // await wait(1000);
      // await this.deleteGuildCommands();
    });
  }

  // TODO: Add permission validation
  async registerSlashCommands() {
    try {
      logger.info(
        'Adding/Updating slash commands to global scope(New commands will take at most 1 hour to update global commands list)'
      );

      const cmds = [];
      const guildsDev: Snowflake[] = [ClientConfig.guildDev as Snowflake];

      for (const [, data] of this.modules) {
        const slash = data as SlashCommand;
        const commandData = slash.getApplicationCommndData();

        // Add commands to dev guilds
        if (guildsDev.length !== 0 && !slash.options.delete) {
          for (const guildId of guildsDev) {
            if (this.client.guilds.cache.get(guildId)) {
              cmds.push(
                this.client.guilds.cache
                  .get(guildId)
                  ?.commands.create(commandData)
              );
            }
          }
        }

        if (ClientConfig.environment === 'production') {
          if (!slash.options.devOnly && !slash.options.delete) {
            logger.debug(
              `Adding command '${commandData.name}' to global commands list.`
            );
            cmds.push(this.client.application?.commands.create(commandData));
          }
        }
      }

      await Promise.all(cmds);
    } catch ({ stack }) {
      logger.error(`Failed to add commands to guild. ${stack as string}`);
    }
  }

  async deleteGuildCommands() {
    // Finds all registered commands and check if it is loded in modules
    // If not loaded in modules, delete the command
    logger.info('Deleting invalid guild commands.');

    const resolve = [];
    const guildDevList: Snowflake[] = [ClientConfig.guildDev as Snowflake];
    for (const guildId of guildDevList) {
      const guild = this.client.guilds.cache.get(guildId);

      if (guild) {
        for (const [, command] of guild.commands.cache) {
          const commandModule = this.modules.has(command.name);
          // Check if undefined
          if (!commandModule) {
            logger.info(
              `Deleting command ${command.name} from guild command list.`
            );
            resolve.push(guild.commands.delete(command));
          }
        }
      }
    }

    await Promise.all(resolve);
  }

  // TODO: Add morme validation
  // TODO: Add cooldown
  // TODO: Add permission checks
  handleCommand(interaction: CommandInteraction) {
    if (!interaction.isCommand()) return;

    // Get command and execute
    const module = this.findCommand(interaction.commandName) as SlashCommand;
    if (!module) {
      throw new Error(`Command not found!`);
      return;
    }

    module
      .exec(interaction)
      .catch(({ message, stack }) =>
        this.emit(
          'slashError',
          module.constructor.name,
          message,
          stack,
          interaction
        )
      );
  }

  findCommand(name: string) {
    return this.modules.get(name);
  }
}
