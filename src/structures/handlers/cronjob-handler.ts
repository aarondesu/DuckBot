import {} from 'discord.js';
import {
  AkairoClient,
  AkairoHandler,
  AkairoHandlerOptions,
} from 'discord-akairo';
import { CronJob } from '@structures/modules/cronjob';
import cron from 'node-cron';
import logger from '@lib/logger';

export default class CronJobHandler extends AkairoHandler {
  public constructor(client: AkairoClient, options: AkairoHandlerOptions) {
    super(client, {
      directory: options.directory,
      classToHandle: CronJob,
    });

    // TEMP
    this.client.on('ready', async () => {
      await this.initializeJobs();
    });
  }

  async initializeJobs() {
    try {
      // Get all chrone jobs
      for (const [, data] of this.modules) {
        const cronJob = data as CronJob;

        // Validate the schedule
        const valid = cron.validate(cronJob.options.schedule);
        if (valid) {
          // Schedule the cron
          const task = cron.schedule(cronJob.options.schedule, async () =>
            cronJob.exec()
          );

          task.start(); // Start the job
        } else {
          throw new Error(
            `Invalid cron job schedule. Please check https://www.npmjs.com/package/node-cron`
          );
        }
      }
    } catch ({ message, stack }) {
      logger.error(
        `Error loading cron jobs ${message as string}: ${stack as string}`
      );
    }
  }
}
