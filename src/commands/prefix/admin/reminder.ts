import { Message, MessageEmbed } from 'discord.js';
import { Command } from 'discord-akairo';

import json from '@json/reminders.json';
import { JSONDeclaration, Schedule } from '@typings/reminders';
import { EmbedColorCoding } from '@constants';

interface CmdArgs {
  name: string;
}

export default class CheckReminder extends Command {
  public constructor() {
    super('reminder-check', {
      aliases: ['reminder'],
      clientPermissions: ['MANAGE_ROLES', 'ADD_REACTIONS'],
      userPermissions: ['MANAGE_ROLES'],
      channel: 'guild',
      description: 'views the reminder from the JSON file',
      args: [
        {
          id: 'name',
          type: 'string',
        },
      ],
    });
  }

  async exec(message: Message, { name }: CmdArgs) {
    const reminders: JSONDeclaration = [...json] as Schedule[];
    const result = reminders.filter((sc) => sc.name === name);

    if (result.length === 1) {
      const sched = result[0];

      const messageEmbed = new MessageEmbed()
        .setColor(EmbedColorCoding.primary)
        .setTitle(sched.content.title)
        .setImage(sched.content.image ? sched.content.image : '')
        .setDescription(sched.content.message ? sched.content.message : '')
        .setThumbnail(sched.content.thumbnail ? sched.content.thumbnail : '')
        .setFooter('Duck Reminder')
        .setTimestamp();

      if (sched.content.fields && sched.content.fields.length > 0) {
        for (const field of sched.content.fields)
          messageEmbed.addField(field.name, field.value, field.inline);
      }

      await message.reply({ embeds: [messageEmbed] });
    } else {
      await message.util?.reply(`No such reminder name as ${name}`);
    }
  }
}
