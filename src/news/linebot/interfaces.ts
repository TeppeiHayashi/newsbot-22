import { MessageEvent, TextEventMessage } from '@line/bot-sdk';

export interface TextMessageEvent extends MessageEvent {
  message: TextEventMessage;
}
