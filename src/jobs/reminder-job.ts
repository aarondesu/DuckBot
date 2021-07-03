/* eslint-disable no-continue */
import { CronJob } from '@structures/modules/cron-job';
import moment from 'moment-timezone';
import { Collection, Snowflake, TextChannel } from 'discord.js';

import json from '@json/reminders.json';
import { JSONDeclaration, Schedule, Day } from '@typings/reminders';
import { COLOR_PRIMARY } from '@constants';
import { EmbedUtil } from '@lib/utils';

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
          const embed = EmbedUtil({
            color: COLOR_PRIMARY,
            title: schedule.content.title,
            description: schedule.content.message,
            thumbnail: schedule.content.thumbnail,
            image: schedule.content.image,
            footer: 'Daily reminder',
            timestamp: true,
            fields: schedule.content.fields,
          });

          for (const [, channel] of this.channels) {
            sendMessage.push(channel.send({ embeds: [embed] }));
          }
        }
      }

      await Promise.all(sendMessage);
    } catch ({ stack }) {
      this.logger.error(`ReminderJob: ${stack as string}`);
    }
  }
}
