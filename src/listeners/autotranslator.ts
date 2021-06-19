import { Listener } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import Detectlanguage from 'detectlanguage';
import axios, { AxiosRequestConfig } from 'axios';
import logger from 'lib/logger';
import { oneLine } from 'common-tags';

type DeepLTranslate = {
  data: {
    translations: {
      translatedText: string;
    };
  };
};

// TODO: better implementation for handling requests
// TODO: better filtering
export default class AutoTranslator extends Listener {
  // #region Variables
  languageApi: Detectlanguage;
  // #endregion

  public constructor() {
    super('translator', {
      emitter: 'client',
      event: 'message',
    });

    // Setup detectlanguage api
    this.languageApi = new Detectlanguage(
      process.env.DETECTLANGUAGE_API_KEY as string
    );
  }

  private async detectLanguage(content: string) {
    try {
      logger.info('Getting language of text...');
      const result = await this.languageApi.detect(content);
      const language = result.pop()?.language as string;

      return [language, null];
    } catch (error) {
      return [null, error as string];
    }
  }

  private static async translateText(language: string, toTranslate: string) {
    try {
      // Axios config
      const option: AxiosRequestConfig = {
        method: 'POST',
        url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-key': process.env.RAPID_API_KEY as string,
          'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
        },
        data: {
          q: toTranslate,
          source: language.toUpperCase(),
          target: 'EN',
        },
      };

      logger.info('Requesting data from RAPID API/deepL... ');
      // Request data
      const response = await axios.request<DeepLTranslate>(option);
      logger.info('Request reecieved from RAPID API/DeepL!');

      return [response.data.data.translations.translatedText, null];
    } catch (error) {
      return [null, error as string];
    }
  }

  private static async displayError(errorMessage: string, message: Message) {
    const embed = new MessageEmbed()
      .setTitle('An error occurred.')
      .setDescription(errorMessage);

    logger.error(errorMessage);

    // await message.channel.send(embed);
  }

  // TODO: stop intercepting messages when confronted with a command requiring additional info
  public async exec(message: Message) {
    // Check if message is not bot message, not a command, and is only from a server
    if (message.author.bot || !message.guild || message.content[0] === '?')
      return;

    // Detect language
    const [language, langError] = await this.detectLanguage(message.content);
    if (langError !== null) {
      const strErr = oneLine`
        Unable to process DetectLanguage request.
        Reason: ${langError}
      `;

      await AutoTranslator.displayError(strErr, message);
    }

    // Check if language is not EN
    if (language !== 'EN') {
      // Request translated text
      const [translatedText, transError] = await AutoTranslator.translateText(
        language as string,
        message.content
      );

      if (transError !== null) {
        const strErr = oneLine`
        Unable to process DeepL request.
        Reason: ${langError}
        `;

        await AutoTranslator.displayError(strErr, message);
      }

      // Create embed
      const translatedEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Autotranslated text')
        .setDescription(`${translatedText as string}`);

      // Send translated message back to channel
      // await message.channel.send(translatedEmbed);
    }
  }
}
