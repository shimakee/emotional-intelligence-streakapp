import { Test, TestingModule } from '@nestjs/testing';
import { StreaksController } from './streaks.controller';
import { StreaksService } from './streaks.service';

describe('StreaksController', () => {
  let controller: StreaksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StreaksController],
      providers: [
        {
          provide: StreaksService,
          useValue: {
            getStreaks: jest.fn(() => [
              { date: '2024-02-23', activities: 0, state: 'INCOMPLETE' },
            ]),
            getStreak: jest.fn((streakCase: number) => ({
              id: `${streakCase}`,
              activitiesToday: 0,
              total: 0,
              days: [
                { date: '2024-02-23', activities: 0, state: 'INCOMPLETE' }
              ]
            })),
          }
        }
      ]
    }).compile();

    controller = module.get<StreaksController>(StreaksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should to call streaks service', () => {
    const result = controller.getStreaks();
    expect(result).toBeDefined();
  });

  // did not add anymore test here since it's mostly covered in service.
});
