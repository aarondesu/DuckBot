import {} from 'discord.js';
import { AkairoModule, AkairoModuleOptions } from 'discord-akairo';

export interface CronJobOptions extends AkairoModuleOptions {
  schedule: string;
}

export class CronJob extends AkairoModule {
  options: CronJobOptions;

  public constructor(id: string, options: CronJobOptions) {
    super(id, options);

    this.options = options;
  }

  async exec() {
    throw new Error(
      `CronJob ${this.constructor.name} initialize is not yet implemented.`
    );
  }
}
