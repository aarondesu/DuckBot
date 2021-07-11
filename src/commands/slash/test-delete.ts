import { SlashCommand } from '@structures/modules/slash-command';

export default class DeleteTest extends SlashCommand {
  public constructor() {
    super('delete', {
      description: `Go ping!`,
      devOnly: true,
    });
  }
}
