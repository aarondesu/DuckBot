import {} from 'discord.js';
import { Listener } from 'discord-akairo';

export default class GuildJoined extends Listener {
  constructor() {
    super('guildLeave', {
      emitter: 'client',
      event: 'guildDelete',
    });
  }
}
