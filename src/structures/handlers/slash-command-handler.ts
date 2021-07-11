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
    this.client.on('interaction', async (interaction) => {
      await this.handleCommand(interaction as CommandInteraction);
    });

    this.client.on('ready', async () => {
      await wait(3000); // Wait for 3 seconds before registering slash commands
      await this.registerSlashCommands();
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
        if (guildsDev.length !== 0) {
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

        // Push to global
        if (!slash.options.devOnly)
          logger.debug(
            `Adding command '${commandData.name}' to global commands list.`
          );
        cmds.push(this.client.application?.commands.create(commandData));
      }

      await Promise.all(cmds);
    } catch ({ stack }) {
      logger.error(`Failed to add commands to guild. ${stack as string}`);
    }
  }

  // TODO: Add morme validation
  // TODO: Add cooldown
  // TODO: Add permission checks
  async handleCommand(interaction: CommandInteraction) {
    if (!interaction.isCommand()) return;

    // Get command and execute
    const module = this.findCommand(interaction.commandName) as SlashCommand;
    if (!module) {
      throw new Error(`Command not found!`);
      return;
    }

    await module.exec(interaction);
  }

  findCommand(name: string) {
    return this.modules.get(name);
  }
}
