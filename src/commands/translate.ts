import { CommandInteraction, MessageEmbed } from 'discord.js';
import {} from 'discord-akairo';
import { SlashCommand } from 'structures/modules/slash_command';
import DetectLanguage from 'detectlanguage';
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

export default class TranslateCommand extends SlashCommand {
  languageApi: DetectLanguage;

  requestConfig: AxiosRequestConfig;

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
      ],
    });

    // Initialize the APIs
    this.languageApi = new DetectLanguage(
      process.env.DETECTLANGUAGE_API_KEY as string
    );

    this.requestConfig = {
      method: 'POST',
      url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-key': process.env.RAPID_API_KEY as string,
        'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
      },
    };
  }

  private static async displayError(
    errorMessage: string,
    interaction: CommandInteraction
  ) {
    logger.error(errorMessage);
    await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setColor('#FF0000')
          .setTitle('Translate command error')
          .setDescription(errorMessage),
      ],
    });
  }

  private async detectLanguage(content: string) {
    try {
      logger.http('Requesting language code from detectlanguage.com... ');
      const result = await this.languageApi.detect(content);
      const language = result.pop()?.language as string;

      return [language, null];
    } catch (error) {
      return [null, error as string];
    }
  }

  private async translateText(
    sourceLang: string,
    targetLang: string,
    toTranslate: string
  ) {
    try {
      // Configure request data
      this.requestConfig.data = {
        q: toTranslate,
        source: sourceLang.toUpperCase(),
        target: targetLang,
      };

      // Request from API
      logger.http('Requesting from rapid_api/deepL...');
      const response = await axios.request<DeepLTranslate>(this.requestConfig);
      logger.http('Request recieved!');

      return [response.data.data.translations.translatedText, null];
    } catch (error) {
      return [null, error as string];
    }
  }

  async exec(interaction: CommandInteraction) {
    const targetLang = interaction.options.get('language')?.value as string;
    const text = interaction.options.get('text')?.value as string;

    await interaction.defer();

    // Detect the language
    const [sourceLang, langError] = await this.detectLanguage(text);
    if (langError != null) {
      const strErr = oneLine`
        Unable to process DetectLanguage requst.
        ${langError}
      `;

      await TranslateCommand.displayError(strErr, interaction);
    }

    // Check if language not equal to selected language to translate
    if (sourceLang !== targetLang.toUpperCase()) {
      // Request translated text
      const [translatedText, transError] = await this.translateText(
        sourceLang as string,
        targetLang,
        text
      );

      if (transError) {
        const strErr = oneLine`
          Unable to process DeepL request.
          ${transError}
        `;

        await TranslateCommand.displayError(strErr, interaction);
      }

      // Display info back to user
      await interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('❯ Translated text')
            .setDescription(translatedText as string),
        ],
      });
    } else {
      await interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor('#FF000')
            .setTitle('❯ Translator error')
            .setDescription('Target language is the same as source text!'),
        ],
      });
    }
  }
}
