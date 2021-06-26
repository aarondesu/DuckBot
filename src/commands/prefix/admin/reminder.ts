import { Message, MessageEmbed } from 'discord.js';
import { Command } from 'discord-akairo';
import Mustache from 'mustache';
import moment from 'moment-timezone';

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
      const currentTime = moment.tz(moment(), 'Asia/Tokyo');
      const sched = result[0];

      const templateVars = {
        currentdate: {
          sec: currentTime.second(),
          minute: currentTime.minute(),
          hour: currentTime.hour(),
          day: currentTime.day(),
          month: currentTime.month(),
          nextHour: currentTime.add(1, 'hour').startOf('hour'),
        },
      };

      const messageEmbed = new MessageEmbed()
        .setColor(EmbedColorCoding.primary)
        .setTitle(
          Mustache.render(
            sched.content.title ? sched.content.title : '',
            templateVars
          )
        )
        .setDescription(Mustache.render(sched.content.message, templateVars))
        .setThumbnail(sched.content.thumbnail ? sched.content.thumbnail : '')
        .setImage(sched.content.image ? sched.content.image : '')
        .setFooter('Duck Reminder')
        .setTimestamp();

      if (sched.content.fields && sched.content.fields.length > 0) {
        for (const field of sched.content.fields)
          messageEmbed.addField(
            Mustache.render(field.name, templateVars),
            Mustache.render(field.value, templateVars),
            field.inline
          );
      }

      await message.reply({ embeds: [messageEmbed] });
    } else {
      await message.util?.reply(`No such reminder name as ${name}`);
    }
  }
}
