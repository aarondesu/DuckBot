import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import Detectlanguage from 'detectlanguage';
import axios, { AxiosRequestConfig } from 'axios';
import logger from 'lib/logger';
import { oneLine } from 'common-tags';

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

  // TODO: stop intercepting messages when confronted with a command requiring additional info
  public async exec(message: Message) {
    // Check if message is not bot message, not a command, and is only from a server
    if (message.author.bot || !message.guild || message.content[0] === '?')
      return;

    // Check language
    this.languageApi
      .detect(message.content)
      .then((result) => {
        // Get language code
        const endResult = result.pop();
        const language = endResult?.language as string;

        // Check if language isn't EN
        if (language?.toUpperCase() !== 'EN') {
          // API request config
          const option: AxiosRequestConfig = {
            method: 'POST',
            url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
            headers: {
              'content-type': 'application/json',
              'x-rapidapi-key': process.env.RAPID_API_KEY as string,
              'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
            },
            data: {
              q: message.content,
              source: language.toUpperCase(),
              target: 'en',
            },
          };

          // Get API(deepL) response
          logger.info('Sending data to RAPID API/deepL...');
          axios
            .request(option)
            .then((response) => {
              logger.info('Recieved response from RAPID API/DeepL');

              const data: string = response.data as string;
              // const parsed: unknown = JSON.parse(data);

              // TODO: Parse Request and display proper info
              return message.channel.send(data);
            })
            .catch((err) => {
              logger.error(err as string);
              return message.channel.send(
                oneLine`
                  Unable to process DeepL request.
                  Reason: ${err as string}
                `
              );
            });
        }
      })
      .catch((err) => {
        logger.error(err as string);
        return message.channel.send(
          oneLine`
                  Unable to process DetectLanguage request.
                  Reason: ${err as string}
                `
        );
      });
  }
}
