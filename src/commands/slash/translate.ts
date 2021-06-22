import { CommandInteraction, MessageEmbed } from 'discord.js';
import {} from 'discord-akairo';
import { SlashCommand } from '@structures/modules/slash_command';
import DetectLanguage, { DetectionResult } from 'detectlanguage';
import axios, { AxiosRequestConfig } from 'axios';
import logger from '@lib/logger';
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
  }

  private static async displayError(
    errorMessage: string,
    interaction: CommandInteraction
  ) {
    logger.error(errorMessage);
    await interaction.editReply({
      embeds: [
        new MessageEmbed()
          .setColor('#FF0000')
          .setDescription(errorMessage)
          .setFooter('Error')
          .setTimestamp(),
      ],
    });
  }

  private static handleDetectLanguage(
    result: DetectionResult[],
    targetLang: string,
    sourceText: string
  ) {
    const sourceLang = result.pop()?.language as string;
    logger.http(`Detected language as ${sourceLang}!`);

    // Check if same language
    if (sourceLang.toUpperCase() === targetLang)
      throw new Error('Source language is the same as the targeted language!');

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
        source: sourceLang.toUpperCase(),
        target: targetLang,
      },
    };

    return requestConf;
  }

  async exec(interaction: CommandInteraction) {
    const targetLang = interaction.options.get('language')?.value as string;
    const sourceText = interaction.options.get('text')?.value as string;

    await interaction.defer();

    logger.http('Requesting language code from detectlanguage.com...');
    this.languageApi
      .detect(sourceText)
      .then((result) => {
        return TranslateCommand.handleDetectLanguage(
          result,
          targetLang,
          sourceText
        );
      })
      .then((request) => {
        logger.http(`Sending requesting to rapid_api/deepL...`);
        return axios.request<DeepLTranslate>(request);
      })
      .then((response) => {
        // TODO: request translate
        const { translatedText } = response.data.data.translations;
        return interaction.editReply({
          embeds: [
            new MessageEmbed()
              .setColor('#0099ff')
              .setDescription(`${translatedText}`)
              .setFooter('Translated using DeepL')
              .setTimestamp(),
          ],
        });
      })
      .catch((error) => {
        const strErr = oneLine`
          Error requesting data. 
          ${error}
        `;

        TranslateCommand.displayError(strErr, interaction).catch(
          (interactErr) =>
            logger.error(
              `interaction.editReply() failed. ${interactErr as string}`
            )
        );
      });
  }
}
