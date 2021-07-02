/* eslint-disable no-continue */
import { CronJob } from '@structures/modules/cron-job';
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

  init() {
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
  }

  async exec() {
    try {
      const sendMessage = [];
      for (const [, schedule] of this.reminders) {
        const currentTime = moment.tz(moment(), 'Asia/Tokyo');

        // Check if reminder has days set
        if (schedule.time.days && schedule.time.days.length > 0) {
          // Checks if the day doesn't include today, if not skip this reminder
          if (!schedule.time.days?.includes(Number(currentTime.format('DD'))))
            continue;
        }

        // Check if reminder has day of week set
        if (schedule.time.daysOfWeek && schedule.time.daysOfWeek?.length > 0) {
          if (
            !schedule.time.daysOfWeek.includes(
              currentTime.format('dddd').toLowerCase() as Day
            )
          )
            continue;
        }

        // Check if current hour for the reminder
        if (schedule.time.hours.includes(Number(currentTime.format('HH')))) {
          const messageEmbed = new MessageEmbed()
            .setColor(EmbedColorCoding.primary)
            .setTitle(schedule.content.title || '')
            .setDescription(schedule.content.message || '')
            .setThumbnail(schedule.content.thumbnail || '')
            .setImage(schedule.content.image || '')
            .setFooter('Duck Reminder')
            .setTimestamp();

          if (schedule.content.fields && schedule.content.fields.length > 0) {
            for (const field of schedule.content.fields)
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
