/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommandInteraction,
  Message,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
} from 'discord.js';
import { SlashCommand } from '@structures/modules/slash-command';

export default class PingCommand extends SlashCommand {
  public constructor() {
    super('select-test', {
      description: `Testing command for select menus`,
      disabled: true,
      delete: true,
    });
  }

  async exec(interaction: CommandInteraction) {
    try {
      const row1 = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomID('select-test')
          .setPlaceholder('More')
          .addOptions({
            label: 'Item1',
            value: '1',
          })
          .addOptions({
            label: 'item2',
            value: '2',
          })
          .addOptions({
            label: 'item3',
            value: '3',
          })
          .addOptions({
            label: 'item4',
            value: '4',
          })
      );

      const row2 = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomID('button1')
          .setLabel('Yes')
          .setStyle('PRIMARY'),
        new MessageButton()
          .setCustomID('button2')
          .setLabel('No')
          .setStyle('DANGER'),
        new MessageButton()
          .setLabel('URL')
          .setStyle('LINK')
          .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
      );

      const message = (await interaction.reply({
        content: 'Hello WOlrd!',
        components: [row1, row2],
        fetchReply: true,
      })) as Message;

      const collector = message.createMessageComponentInteractionCollector({});

      collector.on('collect', async (i) => {
        if (i.isSelectMenu()) {
          await i.defer();
          await i.editReply({
            content: `${i.values?.toString() as string}`,
          });
        }
      });

      collector.on('end', (collected) => {
        this.logger.info(`Collected: ${collected.size} items`);
      });
    } catch ({ message, stack }) {
      await this.emitError(message, stack, interaction);
    }
  }
}
