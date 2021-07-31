import {} from 'discord.js';
import {
  AkairoClient,
  AkairoHandler,
  AkairoHandlerOptions,
} from 'discord-akairo';
import cron from 'node-cron';
import moment from 'moment-timezone';

import { logger } from '@duckbot/common';
import { CronJob } from '../modules/cron-job';

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

  // TODO: Rework job initialization
  async initializeJobs() {
    try {
      // Get all chrone jobs
      for (const [, data] of this.modules) {
        const cronJob = data as CronJob;
        cronJob.init();

        // Validate the schedule
        const valid = cron.validate(cronJob.options.schedule);
        const tz = cronJob.options.timezone;

        // Validate the time zone
        if (tz && !!moment.tz.zone(tz as string) === false)
          throw new Error(
            'Invalid timezone! Please refer to https://momentjs.com/timezone/ for valid timezones.'
          );

        if (valid) {
          // Schedule the cron
          cronJob.task = cron.schedule(
            cronJob.options.schedule,
            () => cronJob.exec(),
            {
              scheduled: true,
              timezone: cronJob.options.timezone,
            }
          );

          cronJob.task.start();
        } else {
          throw new Error(
            `Invalid cron job schedule. Please check https://www.npmjs.com/package/node-cron`
          );
        }
      }
    } catch ({ message, stack }) {
      logger.error(`Error loading cron jobs ${stack as string}`);
    }
  }
}
