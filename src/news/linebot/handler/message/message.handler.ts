import { Injectable } from '@nestjs/common';
import { MessageEvent, EventMessage } from '@line/bot-sdk';
import { TextHandler } from './types/text.handler';

@Injectable()
export class MessageHandler {
  private readonly messageTypes: {
    [key in EventMessage['type']]?: any;
  };

  constructor(private readonly textHandler: TextHandler) {
    this.messageTypes = {
      text: this.textHandler,
    };
  }

  async handleByEvent(event: MessageEvent): Promise<any> {
    return this.messageTypes[event.message.type].handleByMessageType(event);
  }
}
