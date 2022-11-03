import { WebhookRequestBody, WebhookEvent } from '@line/bot-sdk/dist/types';
import { Controller, Post, Get, Body } from '@nestjs/common';
import { LineEventHandler } from './handler/event.handler';
import { LineTaskHandler } from './handler/task.handler';

@Controller('linebot')
export class LinebotController {
  constructor(
    private readonly lineTaskHandler: LineTaskHandler,
    private readonly lineEventHandler: LineEventHandler,
  ) {}

  @Get('task1')
  async task1() {
    return this.lineTaskHandler.doTask1();
  }

  @Get('task2')
  async task2() {
    return this.lineTaskHandler.doTask2();
  }

  @Post()
  async webhook(@Body() req: WebhookRequestBody) {
    const events: WebhookEvent[] = req.events;
    return this.lineEventHandler.handler(events);
  }
}
