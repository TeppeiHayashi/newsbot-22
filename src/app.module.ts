import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    NewsModule,
  ],
  controllers: [],
  exports: [],
})
export class AppModule {}
