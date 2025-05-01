import { Controller, Get, Param } from '@nestjs/common';
import { StreaksService } from './streaks.service';
import { Streak } from '../interfaces/streak.interface';

@Controller('streaks')
export class StreaksController {
  constructor(private readonly streaksService: StreaksService) {}

  @Get()
  getStreaks(): Streak[] {
    return this.streaksService.getStreaks();
  }

  @Get(':streakCase')
  getStreak(@Param('streakCase') streakCase: number): Streak {
    return this.streaksService.getStreak(+streakCase);
  }
}
