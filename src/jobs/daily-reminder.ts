import { CronJob } from '@structures/modules/cronjob';
import { Collection, MessageEmbed, Snowflake, TextChannel } from 'discord.js';
import {} from 'discord-akairo';
import { EmbedColorCoding } from '@constants';

export default class DailyReminder extends CronJob {
  channels: Collection<Snowflake, TextChannel>;

  embed: MessageEmbed;

  public constructor() {
    super('daily-reminder-job', {
      schedule: '* * 4 * * *', // Display info every 4:00 JST
      timezone: 'Asia/Tokyo',
    });

    this.channels = new Collection<Snowflake, TextChannel>();
    this.embed = new MessageEmbed()
      .setColor(EmbedColorCoding.primary)
      .setTitle('Daily Reset!!')
      .setDescription(
        'This is a reminder to remind that dailies have been reset!'
      )
      .setThumbnail('')
      .setTimestamp();
  }

  async init() {
    const test = this.client.channels.cache.filter(
      (ch) => ch.deleted === false && ch.type === 'text'
    ) as Collection<Snowflake, TextChannel>;

    this.channels = test.filter((ch) => ch.name === 'general');

    await Promise.all(test);
  }

  async exec() {
    try {
      const sendMsg = [];

      for (const [, channel] of this.channels) {
        sendMsg.push(channel.send({ embeds: [this.embed] }));
      }

      await Promise.all(sendMsg);
    } catch ({ message, stack }) {
      this.logger.error(
        `Error sending daily reminder: ${message as string}: ${stack as string}`
      );
    }
  }
}
