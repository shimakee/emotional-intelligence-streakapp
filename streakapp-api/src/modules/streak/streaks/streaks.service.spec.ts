import { Test, TestingModule } from '@nestjs/testing';
import { StreaksService } from './streaks.service';
import { StreakState } from '../constants/state.constant';

describe('StreaksService', () => {
  let service: StreaksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StreaksService],
    }).compile();

    service = module.get<StreaksService>(StreaksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should return incomplete.", () => {
    const sampleData =[
      { date: "2024-02-23", activities: 0, state: StreakState.INCOMPLETE }
    ]
    const result = service.EvaluateStreakState(sampleData);
    expect(result[0].state).toEqual(StreakState.INCOMPLETE);
  });

  it("should return complete.", () => {
    const sampleData =[
      { date: "2024-02-23", activities: 1, state: StreakState.INCOMPLETE }
    ]

    const result = service.EvaluateStreakState(sampleData);
    expect(result[0].state).toEqual(StreakState.COMPLETED);
  });

  it("should return item 2 as saved.", () => {
    const sampleData =[
      { date: "2024-02-1", activities: 2, state: StreakState.INCOMPLETE },
      { date: "2024-02-2", activities: 0, state: StreakState.INCOMPLETE },
      { date: "2024-02-3", activities: 1, state: StreakState.INCOMPLETE }
    ]

    const result = service.EvaluateStreakState(sampleData);
    expect(result[0].state).toEqual(StreakState.COMPLETED);
    expect(result[1].state).toEqual(StreakState.SAVED);
    expect(result[2].state).toEqual(StreakState.COMPLETED);
  });

  it("should return item 2 and 3 as at saved.", () => {
    const sampleData =[
      { date: "2024-02-1", activities: 3, state: StreakState.INCOMPLETE },
      { date: "2024-02-2", activities: 0, state: StreakState.INCOMPLETE },
      { date: "2024-02-2", activities: 0, state: StreakState.INCOMPLETE },
      { date: "2024-02-3", activities: 1, state: StreakState.INCOMPLETE }
    ]

    const result = service.EvaluateStreakState(sampleData);
    expect(result[0].state).toEqual(StreakState.COMPLETED);
    expect(result[1].state).toEqual(StreakState.SAVED);
    expect(result[2].state).toEqual(StreakState.SAVED);
    expect(result[3].state).toEqual(StreakState.COMPLETED);
  });

  it("should return item 2 as saved and 3 as at risk.", () => {
    const sampleData =[
      { date: "2024-02-1", activities: 2, state: StreakState.INCOMPLETE },
      { date: "2024-02-2", activities: 0, state: StreakState.INCOMPLETE },
      { date: "2024-02-2", activities: 0, state: StreakState.INCOMPLETE },
      { date: "2024-02-3", activities: 1, state: StreakState.INCOMPLETE }
    ]

    const result = service.EvaluateStreakState(sampleData);
    expect(result[0].state).toEqual(StreakState.COMPLETED);
    expect(result[1].state).toEqual(StreakState.SAVED);
    expect(result[2].state).toEqual(StreakState.AT_RISK);
    expect(result[3].state).toEqual(StreakState.COMPLETED);
  });

  it("should return item 1 and 2 as at riks.", () => {
    const sampleData =[
      { date: "2024-02-1", activities: 0, state: StreakState.INCOMPLETE },
      { date: "2024-02-2", activities: 0, state: StreakState.INCOMPLETE },
      { date: "2024-02-3", activities: 1, state: StreakState.INCOMPLETE }
    ]

    const result = service.EvaluateStreakState(sampleData);
    expect(result[0].state).toEqual(StreakState.AT_RISK);
    expect(result[1].state).toEqual(StreakState.AT_RISK);
    expect(result[2].state).toEqual(StreakState.COMPLETED);
  });
});
