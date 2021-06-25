/* eslint-disable no-continue */
import { CronJob } from '@structures/modules/cronjob';
import moment from 'moment-timezone';
import { Collection, MessageEmbed, Snowflake, TextChannel } from 'discord.js';

import json from '@json/reminders.json';
import { JSONDeclaration, Schedule, Day } from '@typings/reminders';
import { EmbedColorCoding } from '@constants';

export default class ReminderJob extends CronJob {
  reminders: Collection<string, Schedule>;

  channels: Collection<Snowflake, TextChannel>;

  public constructor() {
    super('reminder-job', {
      schedule: '0 0 */1 * * *', // Cron job runs at the start of every hour
      timezone: 'Asia/Tokyo',
    });

    this.reminders = new Collection<string, Schedule>();
    this.channels = new Collection<Snowflake, TextChannel>();
  }

  async init() {
    // Get data from JSON file
    const schedule: JSONDeclaration = [...json] as JSONDeclaration;
    for (const sched of schedule) {
      this.reminders.set(sched.name, sched);
    }

    // Get channels
    const cache = this.client.channels.cache.filter(
      (ch) => ch.deleted === false && ch.type === 'text'
    ) as Collection<Snowflake, TextChannel>;

    this.channels = cache.filter((ch) => ch.name === 'general');

    await Promise.all(cache);
  }

  async exec() {
    try {
      const sendMessage = [];
      for (const [, data] of this.reminders) {
        const currentTime = moment.tz(moment(), 'Asia/Tokyo');

        // Check if reminder has days set
        if (data.time.days && data.time.days.length > 0) {
          // Checks if the day doesn't include today, if not skip this reminder
          if (!data.time.days?.includes(currentTime.day())) continue;
        }

        // Check if reminder has day of week set
        if (data.time.daysOfWeek && data.time.daysOfWeek?.length > 0) {
          if (
            !data.time.daysOfWeek.includes(
              currentTime.format('dddd').toLowerCase() as Day
            )
          )
            continue;
        }

        // Check if current hour for the reminder
        if (data.time.hours.includes(currentTime.hour())) {
          const messageEmbed = new MessageEmbed()
            .setColor(EmbedColorCoding.primary)
            .setTitle(data.content.title)
            .setImage(data.content.image ? data.content.image : '')
            .setDescription(data.content.message ? data.content.message : '')
            .setThumbnail(data.content.thumbnail ? data.content.thumbnail : '')
            .setFooter('Duck Reminder')
            .setTimestamp();

          if (data.content.fields && data.content.fields.length > 0) {
            for (const field of data.content.fields)
              messageEmbed.addField(field.name, field.value, field.inline);
          }

          for (const [, channel] of this.channels) {
            sendMessage.push(channel.send({ embeds: [messageEmbed] }));
          }
        }
      }

      await Promise.all(sendMessage);
    } catch ({ stack }) {
      this.logger.error(`ReminderJob: ${stack as string}`);
    }
  }
}
