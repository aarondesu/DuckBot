import {} from 'discord.js';
import { AkairoModule, AkairoModuleOptions } from 'discord-akairo';

type TwitterStreamRule = {
  tag: string;
  value: string;
};

export interface TwitterStreamModuleOptions extends AkairoModuleOptions {
  rules: TwitterStreamRule[];
}

export default class TwitterStreamModule extends AkairoModule {
  options: TwitterStreamModuleOptions;

  constructor(id: string, options: TwitterStreamModuleOptions) {
    super(id, options);

    this.options = options;
  }

  async getInfoDisplay(): Promise<string | undefined> {
    throw new Error(
      `${this.constructor.name} has not yet implemented 'getInfo' function`
    );

    return undefined;
  }
}
