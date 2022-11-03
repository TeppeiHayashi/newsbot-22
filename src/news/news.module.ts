import { Global, Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { HttpModule } from '@nestjs/axios';
import { LinebotModule } from './linebot/linebot.module';

@Global()
@Module({
  imports: [HttpModule, LinebotModule],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}
