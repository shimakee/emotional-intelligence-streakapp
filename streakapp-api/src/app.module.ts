import { Module } from '@nestjs/common';
import { AppController } from './modules/sample/app.controller';
import { AppService } from './modules/sample/app.service';
import { StreaksModule } from './modules/streak/streaks/streaks.module';

@Module({
  imports: [StreaksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
