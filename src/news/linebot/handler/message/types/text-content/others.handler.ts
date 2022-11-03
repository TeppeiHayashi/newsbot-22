import { MessageAPIResponseBase } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';
import { BaseContextHandler } from './base';
import { TextMessageEvent } from 'src/news/linebot/interfaces';
import { LinebotService } from 'src/news/linebot/linebot.service';

@Injectable()
export class OthersContextHandler extends BaseContextHandler<'その他'> {
  constructor(private readonly linebotService: LinebotService) {
    super(['その他']);
  }

  async createMessageAPIResponse(
    messageEvent: TextMessageEvent,
  ): Promise<MessageAPIResponseBase> {
    return this.linebotService
      .createLinebotClient()
      .replyMessage(messageEvent.replyToken, {
        type: 'flex',
        altText: 'その他のニュースカテゴリです',
        contents: {
          type: 'carousel',
          contents: [
            {
              type: 'bubble',
              header: {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: 'Others',
                    wrap: true,
                    weight: 'bold',
                    size: 'lg',
                  },
                ],
              },
              body: {
                type: 'box',
                layout: 'vertical',
                spacing: 'sm',
                contents: [
                  {
                    type: 'text',
                    text: 'ニュースカテゴリを選択してください。',
                    weight: 'bold',
                    wrap: true,
                  },
                ],
              },
              footer: {
                type: 'box',
                layout: 'vertical',
                spacing: 'sm',
                contents: [
                  {
                    type: 'button',
                    flex: 1,
                    gravity: 'center',
                    action: {
                      type: 'message',
                      label: 'トレンド',
                      text: 'トレンド',
                    },
                  },
                  {
                    type: 'button',
                    flex: 1,
                    gravity: 'center',
                    action: {
                      type: 'message',
                      label: '国際',
                      text: '国際',
                    },
                  },
                  {
                    type: 'button',
                    flex: 1,
                    gravity: 'center',
                    action: {
                      type: 'message',
                      label: 'IT',
                      text: 'IT',
                    },
                  },
                ],
              },
            },
          ],
        },
      });
  }
}
