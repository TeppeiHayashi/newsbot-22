import { MessageAPIResponseBase } from '@line/bot-sdk';
import { TextMessageEvent } from 'src/news/linebot/interfaces';

export abstract class BaseContextHandler<T extends string> {
  /**
   * テキスト内容を配列で定義
   */
  private readonly contexts: T[];

  constructor(contexts: T[]) {
    this.contexts = contexts;
  }

  /**
   * 型ガード
   * @param text
   * @returns bool
   */
  private isContext(text: string): text is T {
    return this.contexts.some((v) => v === text);
  }

  /**
   * contextに合致した際の処理を記述
   * @param messageEvent
   */
  protected abstract createMessageAPIResponse(
    messageEvent: TextMessageEvent,
  ): Promise<MessageAPIResponseBase>;

  /**
   * 外部から呼び出す
   * isContext -> createMessageAPIResponse
   * @param messageEvent
   * @returns Promise<MessageAPIResponseBase>
   */
  async handleByMessageContext(
    messageEvent: TextMessageEvent,
  ): Promise<MessageAPIResponseBase> {
    const {
      message: { text },
    } = messageEvent;

    if (!this.isContext(text))
      return Promise.reject(new Error('Text not included in contexts'));

    return this.createMessageAPIResponse(messageEvent);
  }
}
