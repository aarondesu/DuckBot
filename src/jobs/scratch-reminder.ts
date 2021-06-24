import { EmbedColorCoding } from '@constants';
import { CronJob } from '@structures/modules/cronjob';
import { Collection, MessageEmbed, Snowflake, TextChannel } from 'discord.js';
import moment from 'moment-timezone';

export default class ScratchReminder extends CronJob {
  channels: Collection<Snowflake, TextChannel>;

  embed: MessageEmbed;

  public constructor() {
    super('scratch-reminder-job', {
      // schedule: '* * 12,18,22,23 * * *',
      schedule: '*/20 * * * * *',
      timezone: 'Asia/Tokyo',
    });

    this.channels = new Collection<Snowflake, TextChannel>();
    this.embed = new MessageEmbed()
      .setColor(EmbedColorCoding.primary)
      .setTitle('Scratch Reminder')
      .setThumbnail('https://i.postimg.cc/ZnWfgXxy/item02.png')
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
      // Check time if before 23:00 JST
      if (moment().isBefore(moment.tz('10:40:00', 'HH:mm:ss', 'Asia/Tokyo'))) {
        this.embed.setDescription(
          'Reminder to use up your free daily sg scratch before the reset'
        );
      } else {
        this.embed.setDescription('Daily free sg scrach has been reset!');
      }

      const sendMsg = [];
      for (const [, channel] of this.channels) {
        sendMsg.push(channel.send({ embeds: [this.embed] }));
      }

      await Promise.all(sendMsg);
    } catch ({ message, stack }) {
      this.logger.error(
        `Error sending scratch reminder: ${message as string}: ${
          stack as string
        }`
      );
    }
  }
}
