import { CommandInteraction } from 'discord.js';
import {} from 'discord-akairo';
import { SlashCommand } from '@structures/modules/slash-command';
import DetectLanguage from 'detectlanguage';
import axios, { AxiosRequestConfig } from 'axios';
import logger from '@lib/logger';
import { COLOR_PRIMARY } from '@constants';
import { EmbedBuilderUtil } from '@lib/utils';

type DeepLTranslate = {
  data: {
    translations: {
      translatedText: string;
    };
  };
};

export default class TranslateCommand extends SlashCommand {
  languageApi: DetectLanguage;

  public constructor() {
    super('translate', {
      description: `Translates text to a language selected`,
      options: [
        {
          name: 'language',
          description: 'Language to translate to',
          type: 'STRING',
          required: true,
          choices: [
            {
              name: 'English',
              value: 'EN',
            },
            {
              name: 'Japanese',
              value: 'JA',
            },
          ],
        },
        {
          name: 'text',
          description: 'Text to be translated',
          type: 'STRING',
          required: true,
        },
        {
          name: 'source',
          description: 'Source language of the provided text',
          type: 'STRING',
          choices: [
            {
              name: 'English',
              value: 'EN',
            },
            {
              name: 'Japanese',
              value: 'JA',
            },
          ],
        },
      ],
    });

    // Initialize the APIs
    this.languageApi = new DetectLanguage(
      process.env.DETECTLANGUAGE_API_KEY as string
    );
  }

  async detectLanguage(textToTranslate: string) {
    logger.http('Requesting language code from detectlanguage.com...');

    try {
      const result = await this.languageApi.detect(textToTranslate);
      const langSource = result.pop()?.language as string;

      logger.http(`Detected lanaguage as ${langSource}`);

      return langSource;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async translateText(
    sourceText: string,
    sourceLang: string,
    targetLang: string
  ) {
    logger.http(`Sending requesting to rapid_api/deepL...`);

    const requestConf: AxiosRequestConfig = {
      method: 'POST',
      url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-key': process.env.RAPID_API_KEY as string,
        'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
      },
      data: {
        q: sourceText,
        source: sourceLang,
        target: targetLang,
      },
    };

    try {
      const result = await axios.request<DeepLTranslate>(requestConf);
      logger.http('Successfully recieved data from deepL api!');

      return result.data.data.translations.translatedText;
    } catch (error) {
      throw new Error(error);
    }
  }

  async exec(interaction: CommandInteraction) {
    const targetLang = interaction.options.get('language')?.value as string;
    const sourceText = interaction.options.get('text')?.value as string;
    const sourceLang = interaction.options.get('source')?.value as string;

    await interaction.defer();

    if (!sourceLang) {
      try {
        const detectLang = await this.detectLanguage(sourceText);
        const translatedText = await TranslateCommand.translateText(
          sourceText,
          detectLang.toUpperCase(),
          targetLang.toUpperCase()
        );

        await interaction.editReply({
          embeds: [
            EmbedBuilderUtil({
              color: COLOR_PRIMARY,
              timestamp: true,
              description: translatedText,
              footer: 'Translated using DeepL',
            }),
          ],
        });
      } catch ({ message, stack }) {
        await this.emitError(message, stack, interaction);
      }
    } else {
      try {
        const translatedText = await TranslateCommand.translateText(
          sourceText,
          sourceLang.toUpperCase(),
          targetLang.toUpperCase()
        );

        await interaction.editReply({
          embeds: [
            EmbedBuilderUtil({
              color: COLOR_PRIMARY,
              timestamp: true,
              description: translatedText,
              footer: 'Translated using DeepL',
            }),
          ],
        });
      } catch ({ message, stack }) {
        await this.emitError(message, stack, interaction);
      }
    }
  }
}
