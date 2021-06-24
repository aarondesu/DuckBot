import { CommandInteraction } from 'discord.js';
import { SlashCommand } from '@structures/modules/slash-command';
import axios from 'axios';

export default class RandomAnimal extends SlashCommand {
  public constructor() {
    super('random-animal', {
      description: `Generates a random image`,
      options: [
        {
          name: 'animal',
          description: 'Animal to search for',
          type: 'STRING',
          required: true,
          choices: [
            {
              name: 'Cat',
              value: 'cat',
            },
            {
              name: 'Dog',
              value: 'dog',
            },
            {
              name: 'Bunny',
              value: 'bunny',
            },
            {
              name: 'Fox',
              value: 'fox',
            },
            {
              name: 'Shiba',
              value: 'shiba',
            },
            {
              name: 'Panda',
              value: 'panda',
            },
          ],
        },
      ],
    });
  }

  static async requestDog() {
    try {
      type dogRes = {
        message: string;
      };

      const result = await axios.request<dogRes>({
        url: 'https://dog.ceo/api/breeds/image/random',
      });

      return result.data.message;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async requestCat() {
    try {
      type catRes = {
        file: string;
      };

      const result = await axios.request<catRes>({
        url: 'https://aws.random.cat/meow',
      });
      return result.data.file;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async requestBunny() {
    try {
      type bunnyRes = {
        media: {
          poster: string;
        };
      };

      const result = await axios.request<bunnyRes>({
        url: 'https://api.bunnies.io/v2/loop/random/?media=gif,png',
      });

      return result.data.media.poster;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async requestFox() {
    try {
      type foxRes = {
        image: string;
      };

      const result = await axios.request<foxRes>({
        url: 'https://randomfox.ca/floof/',
      });

      return result.data.image;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async requestShiba() {
    try {
      const result = await axios.request({
        url: 'http://shibe.online/api/shibes',
      });

      return result.data as string;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async requestPanda() {
    try {
      type pandaRes = {
        link: string;
      };

      const result = await axios.request<pandaRes>({
        url: 'https://some-random-api.ml/img/panda',
      });

      return result.data.link;
    } catch (error) {
      throw new Error(error);
    }
  }

  async exec(interaction: CommandInteraction) {
    try {
      const animal = interaction.options.get('animal')?.value as string;
      let result: string | undefined;

      await interaction.defer();

      switch (animal) {
        case 'cat':
          result = await RandomAnimal.requestCat();
          break;
        case 'dog':
          result = await RandomAnimal.requestDog();
          break;
        case 'bunny':
          result = await RandomAnimal.requestBunny();
          break;
        case 'fox':
          result = await RandomAnimal.requestFox();
          break;
        case 'shiba':
          result = await RandomAnimal.requestShiba();
          break;
        case 'panda':
          result = await RandomAnimal.requestPanda();
          break;
        default:
          result = undefined;
          break;
      }

      if (!result) throw new Error('Unable to get random animal.');
      else await interaction.reply({ content: result });
    } catch ({ message, stack }) {
      await this.displayError(
        `Random animal failed to process command: ${message as string}`,
        stack,
        interaction
      );
    }
  }
}
