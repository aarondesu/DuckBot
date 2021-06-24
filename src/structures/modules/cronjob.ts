import {} from 'discord.js';
import { AkairoModule, AkairoModuleOptions } from 'discord-akairo';
import { Logger } from 'winston';
import logger from '@lib/logger';
import { Timezone } from 'tz-offset';
import { ScheduledTask } from 'node-cron';

export interface CronJobOptions extends AkairoModuleOptions {
  schedule: string;
  timezone?: Timezone | undefined;
}

export class CronJob extends AkairoModule {
  options: CronJobOptions;

  logger: Logger;

  task: ScheduledTask | undefined;

  public constructor(id: string, options: CronJobOptions) {
    super(id, options);

    this.options = options;
    this.logger = logger;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async init(): Promise<void> {}

  async exec() {
    throw new Error(
      `CronJob ${this.constructor.name} initialize is not yet implemented.`
    );
  }
}
