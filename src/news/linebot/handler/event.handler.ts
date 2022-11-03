import { WebhookEvent } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';
import { MessageHandler } from './message/message.handler';

@Injectable()
export class LineEventHandler {
  private readonly lineEvents: {
    [key in WebhookEvent['type']]?: any;
  };

  constructor(private readonly messageHandler: MessageHandler) {
    this.lineEvents = {
      message: this.messageHandler,
    };
  }

  handler(events: WebhookEvent[]) {
    return events.map((event) =>
      this.lineEvents[event.type].handleByEvent(event),
    );
  }
}
