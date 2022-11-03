import { Message, FlexBubble, ClientConfig, Client } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';
import { CategoryType } from '../const/nifty';
import { NewsService } from '../news.service';
import { format } from 'date-fns';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LinebotService {
  constructor(
    private readonly newsService: NewsService,
    private readonly nestConfigService: ConfigService,
  ) {}

  createLinebotClient() {
    const clientConfig: ClientConfig = {
      channelAccessToken: this.nestConfigService.get(
        'LINE_CHANNEL_ACCESS_TOKEN',
      ),
      channelSecret: this.nestConfigService.get('LINE_CHANNEL_SECRET'),
    };
    return new Client(clientConfig);
  }

  async getNewsMessageByCategory(
    category: CategoryType,
    altText?: string,
  ): Promise<Message> {
    const newsList = await this.newsService.getByCategory(category);
    const contents: FlexBubble[] = newsList.map((item) => {
      return {
        type: 'bubble',
        styles: {
          header: {
            backgroundColor: '#f5f5f5',
          },
        },
        hero: {
          type: 'image',
          size: 'full',
          aspectRatio: '20:13',
          aspectMode: 'cover',
          url:
            item.imagePath.length > 0
              ? `https://news.nifty.com/${item.imagePath}`
              : this.nestConfigService.get('NO_IMAGE_URL'),
        },
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: item.title,
              wrap: true,
              weight: 'bold',
              size: 'lg',
            },
            {
              type: 'text',
              text: `\n${format(
                new Date(Date.parse(item.pubDate)),
                'M.d (E) HH:mm',
              )}`,
              wrap: true,
              weight: 'bold',
              flex: 0,
              size: 'sm',
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
              action: {
                type: 'uri',
                label: 'Go to Article',
                uri: item.link,
              },
            },
          ],
        },
      };
    });
    return {
      type: 'flex',
      altText: altText ?? `${category}ニュース一覧です`,
      contents: {
        type: 'carousel',
        contents: contents.slice(0, 10),
      },
    };
  }
}
