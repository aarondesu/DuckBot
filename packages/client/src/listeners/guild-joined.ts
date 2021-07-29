import {} from 'discord.js';
import { Listener } from 'discord-akairo';

export default class GuildJoined extends Listener {
  constructor() {
    super('guildJoined', {
      emitter: 'client',
      event: 'guildCreate',
    });
  }
}
