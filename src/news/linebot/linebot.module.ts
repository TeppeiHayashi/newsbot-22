import { Module } from '@nestjs/common';
import { LinebotController } from './linebot.controller';
import { LinebotService } from './linebot.service';
import { LineEventHandler } from './handler/event.handler';
import { MessageHandler } from './handler/message/message.handler';
import { TextHandler } from './handler/message/types/text.handler';
import { CategoryContextHandler } from './handler/message/types/text-content/category.handler';
import { LineTaskHandler } from './handler/task.handler';
import { OthersContextHandler } from './handler/message/types/text-content/others.handler';

@Module({
  controllers: [LinebotController],
  providers: [
    LinebotService,
    LineEventHandler,
    LineTaskHandler,
    MessageHandler,
    TextHandler,
    CategoryContextHandler,
    OthersContextHandler,
  ],
})
export class LinebotModule {}
