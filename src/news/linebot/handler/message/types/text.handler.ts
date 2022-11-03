import { Injectable } from '@nestjs/common';
import { MessageAPIResponseBase } from '@line/bot-sdk';
import { TextMessageEvent } from 'src/news/linebot/interfaces';
import { BaseContextHandler } from './text-content/base';
import { CategoryContextHandler } from './text-content/category.handler';
import { OthersContextHandler } from './text-content/others.handler';
import { LinebotService } from 'src/news/linebot/linebot.service';

@Injectable()
export class TextHandler {
  private readonly messageContextList: BaseContextHandler<string>[];
  constructor(
    private readonly linebotService: LinebotService,
    private readonly categoryContextHandler: CategoryContextHandler,
    private readonly othersContextHandler: OthersContextHandler,
  ) {
    // ContextHandlerを登録, 上から判定される
    this.messageContextList = [
      this.categoryContextHandler,
      this.othersContextHandler,
    ];
  }

  async handleByMessageType(
    messageEvent: TextMessageEvent,
  ): Promise<MessageAPIResponseBase> {
    // マッチするか判定
    for (let i = 0; i < this.messageContextList.length; i++) {
      try {
        return await this.messageContextList[i].handleByMessageContext(
          messageEvent,
        );
      } catch (e) {
        // マッチしない場合
        continue;
      }
    }
    // すべてにマッチしない場合
    return this.replyDefaultMessage(messageEvent);
  }

  private async replyDefaultMessage(
    messageEvent: TextMessageEvent,
  ): Promise<MessageAPIResponseBase> {
    const { replyToken } = messageEvent;

    return this.linebotService.createLinebotClient().replyMessage(replyToken, {
      type: 'text',
      text: '選択したカテゴリに応じてニュースをお届けします。\n画面下部のメニューからカテゴリを選択してください。',
    });
  }
}
