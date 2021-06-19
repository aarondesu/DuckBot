import { CommandInteraction } from 'discord.js';
import {} from 'discord-akairo';
import { SlashCommand } from 'modules/slash_command';
export default class PingCommand extends SlashCommand {
  public constructor() {
    super('ping', {
      description: `Go ping!`,
    });
  }

  async exec(interaction: CommandInteraction) {
    await interaction.reply('Pong!');
  }
}
