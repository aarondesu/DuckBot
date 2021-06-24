import { CronJob } from '@structures/modules/cronjob';
import { Collection, MessageEmbed, Snowflake, TextChannel } from 'discord.js';
import {} from 'discord-akairo';
import { EmbedColorCoding } from '@constants';

export default class WeeklyReminder extends CronJob {
  channels: Collection<Snowflake, TextChannel>;

  embed: MessageEmbed;

  public constructor() {
    super('weekly-reminder-job', {
      schedule: ' * * 17 * Wed', // Display info every 4:00 JST
      timezone: 'Asia/Tokyo',
    });

    this.channels = new Collection<Snowflake, TextChannel>();
    this.embed = new MessageEmbed()
      .setColor(EmbedColorCoding.primary)
      .setTitle('Weeklies Reset!!')
      .setDescription('Weekies have been rest!')
      .setThumbnail('https://i.postimg.cc/CLjbdZWZ/unknown.png')
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
        `Error sending weekly reminder: ${message as string}: ${
          stack as string
        }`
      );
    }
  }
}
