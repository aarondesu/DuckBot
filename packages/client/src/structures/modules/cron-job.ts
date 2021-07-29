import {} from 'discord.js';
import { AkairoModule, AkairoModuleOptions } from 'discord-akairo';
import { Logger } from 'winston';
import { Timezone } from 'tz-offset';
import { ScheduledTask } from 'node-cron';

import { logger } from '@duckbot/common/dist';

export interface CronJobOptions extends AkairoModuleOptions {
  schedule: string;
  timezone?: Timezone | undefined;
}

export class CronJob extends AkairoModule {
  options: CronJobOptions;

  task: ScheduledTask | undefined;

  logger: Logger;

  public constructor(id: string, options: CronJobOptions) {
    super(id, options);

    this.options = options;
    this.logger = logger;
  }

  init() {
    throw new Error(
      `CronJob ${this.constructor.name} initialize is not yet implemented.`
    );
  }

  exec() {
    throw new Error(
      `CronJob ${this.constructor.name} initialize is not yet implemented.`
    );
  }
}
