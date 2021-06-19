import { CommandInteraction } from 'discord.js';
import {} from 'discord-akairo';
import { SlashCommand } from 'modules/slash_command';

export default class AddCommand extends SlashCommand {
  public constructor() {
    super('add', {
      description: `Add  numbers!!`,
      options: [
        {
          name: 'a',
          type: 'INTEGER',
          description: 'First number',
          required: true,
        },
        {
          name: 'b',
          type: 'INTEGER',
          description: 'Second number',
          required: true,
          choices: [
            {
              name: 'Choice 1',
              value: 5,
            },
            {
              name: 'Choice 2',
              value: 10,
            },
          ],
        },
      ],
    });
  }

  async exec(interaction: CommandInteraction) {
    const a = interaction.options.get('a')?.value as number;
    const b = interaction.options.get('b')?.value as number;

    await interaction.reply(`${a} + ${b} = ${a + b}`);
  }
}
