import {
  AkairoModule,
  Argument,
  Command,
  Inhibitor,
  Listener,
} from 'discord-akairo';
import { oneLine, stripIndent } from 'common-tags';
import { Message } from 'discord.js';
import logger from 'lib/logger';

interface CmdArgs {
  module: AkairoModule | Command | Listener | Inhibitor;
}

export default class ReloadCommand extends Command {
  public constructor() {
    super('reload', {
      aliases: ['reload-command', 'reload-inhibitor', 'reload-listener'],
      ownerOnly: true,
      description: 'Reloads a command',
      args: [
        {
          id: 'module',
          type: Argument.union(
            'commandAlias',
            'listener',
            'inhibitor',
            'command'
          ),
          prompt: {
            start: 'Which module to reload?',
            retry: 'Invalid module provided.',
          },
        },
      ],
    });
  }

  public async exec(message: Message, args: CmdArgs) {
    logger.info('Reload called.');
    let reloaded;

    try {
      reloaded = args.module.reload();
      let type = 'module';

      if (reloaded instanceof Command) {
        type = 'command';
      } else if (reloaded instanceof Inhibitor) {
        type = 'inhibitor';
      } else if (reloaded instanceof Listener) {
        type = 'listener';
      }

      return await message.util?.send(
        oneLine`
            Reloaded \`${type} ${reloaded.id}\`
          `
      );
    } catch (error) {
      return await message.util?.send(
        stripIndent`
                An error occured while reloading.
                \`\`\`bash
                ${error}
                \`\`\`
            `
      );
    }
  }
}
