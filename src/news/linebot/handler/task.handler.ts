import { Injectable } from '@nestjs/common';
import { LinebotService } from '../linebot.service';

@Injectable()
export class LineTaskHandler {
  constructor(private readonly linebotService: LinebotService) {}

  async doTask1() {
    const message = await this.linebotService.getNewsMessageByCategory(
      'トピックス',
    );
    return this.linebotService.createLinebotClient().broadcast(message);
  }

  async doTask2() {
    return this.linebotService.createLinebotClient().broadcast({
      type: 'flex',
      altText: '本日のニュースを確認しましょう。',
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
                  text: "Today's News",
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
                  text: '本日のニュースを確認しましょう',
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
                    label: '国内',
                    text: '国内',
                  },
                },
                {
                  type: 'button',
                  flex: 1,
                  gravity: 'center',
                  action: {
                    type: 'message',
                    label: '経済',
                    text: '経済',
                  },
                },
                {
                  type: 'button',
                  flex: 1,
                  gravity: 'center',
                  action: {
                    type: 'message',
                    label: 'スポーツ',
                    text: 'スポーツ',
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
