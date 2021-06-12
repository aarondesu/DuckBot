import { AkairoClient } from 'discord-akairo';

export default class DiscordBot extends AkairoClient {
  public constructor() {
    super(
      {
        // Akario settings
      },
      {
        // Discord settings
      }
    );
  }

  pre_initialize(): void {
    // TODO: Implement
  }

  post_initialize(): void {
    // TODO: Implement
  }

  start(token: string): void {
    this.pre_initialize();
    //this.login(token);
    this.post_initialize();
  }
}
