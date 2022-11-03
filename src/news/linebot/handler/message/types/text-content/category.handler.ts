import { MessageAPIResponseBase } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';
import { CategoryType } from 'src/news/const/nifty';
import { BaseContextHandler } from './base';
import { TextMessageEvent } from 'src/news/linebot/interfaces';
import { LinebotService } from 'src/news/linebot/linebot.service';

@Injectable()
export class CategoryContextHandler extends BaseContextHandler<CategoryType> {
  constructor(private readonly linebotService: LinebotService) {
    super([
      'トピックス',
      '国内',
      '経済',
      'スポーツ',
      '芸能・エンタメ',
      'IT',
      '国際',
      'トレンド',
    ]);
  }

  async createMessageAPIResponse(
    messageEvent: TextMessageEvent,
  ): Promise<MessageAPIResponseBase> {
    const {
      message: { text },
    } = messageEvent;

    const message = await this.linebotService.getNewsMessageByCategory(
      text as CategoryType,
    );

    return this.linebotService
      .createLinebotClient()
      .replyMessage(messageEvent.replyToken, message);
  }
}
