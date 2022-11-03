import { Injectable } from '@nestjs/common';
import * as Parser from 'rss-parser';
import { categoryRssMap, CategoryType } from './const/nifty';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import * as iconv from 'iconv-lite';

@Injectable()
export class NewsService {
  constructor(private httpService: HttpService) {}
  async getByCategory(category: CategoryType) {
    const parser = new Parser({
      customFields: {
        item: ['description', 'imagePath', 'link', 'pubDate'],
      },
    });
    // RSSを取得
    const xmlString = await lastValueFrom(
      this.httpService
        .get(this.getRssUrl(category), {
          responseType: 'arraybuffer',
          transformResponse: (data: string) => {
            // SJISでデコード
            const sjis = Buffer.from(data, 'binary');
            const utf8 = iconv.decode(sjis, 'SHIFT_JIS');
            return utf8;
          },
        })
        .pipe(map((response) => response.data)),
    );
    // XMLをObjectに変換
    const feed = await parser.parseString(xmlString);
    return feed.items.map(
      ({ title, description, link, pubDate, imagePath }) => ({
        title,
        description,
        link,
        pubDate,
        imagePath,
      }),
    );
  }

  getRssUrl(category: CategoryType) {
    return `https://news.nifty.com/rss/topics_${categoryRssMap[category]}.xml`;
  }
}
