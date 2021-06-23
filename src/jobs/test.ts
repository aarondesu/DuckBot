import {} from 'discord.js';
import {} from 'discord-akairo';
import { CronJob } from '@structures/modules/cronjob';
import logger from '@lib/logger';

export default class TestJob extends CronJob {
  public constructor() {
    super('test-job', {
      schedule: '10 * * * * *',
    });
  }

  async exec() {
    logger.debug('Cron job success!');
  }
}
