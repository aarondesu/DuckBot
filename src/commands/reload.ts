import {} from 'discord.js';
import {} from 'discord-akairo';
import { SlashCommand } from 'structures/modules/slash_command';

export default class ReloadCommand extends SlashCommand {
  public constructor() {
    super('reload', {
      description: `Reloads selected module`,
      options: [
        {
          name: 'module',
          type: 'STRING',
          description: 'The module type to be reloaded',
          required: true,
          choices: [
            {
              name: 'Command',
              value: 'command',
            },
            {
              name: 'Listener',
              value: 'listener',
            },
          ],
        },
        {
          name: 'name',
          type: 'STRING',
          description: 'The name of the module to be reloaded',
          required: true,
        },
      ],
    });
  }
}
