import { Message } from 'discord.js';
import { Command } from 'discord-akairo';

import json from '../../../json/reminders.json';
import { JSONDeclaration, Schedule } from '../../../typings/reminders';
import { COLOR_PRIMARY } from '../../../constants';
import { EmbedBuilderUtil } from '../../../lib/utils';

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

      await message.reply({
        embeds: [
          EmbedBuilderUtil({
            color: COLOR_PRIMARY,
            title: sched.content.title,
            description: sched.content.message,
            thumbnail: sched.content.thumbnail,
            image: sched.content.image,
            footer: 'Duck reminder',
            timestamp: true,
            fields: sched.content.fields,
          }),
        ],
      });
    } else {
      await message.util?.reply(`No such reminder name as ${name}`);
    }
  }
}
