import { StreakState } from '../constants/state.constant';
import { Streak } from '../interfaces/streak.interface';

export const activitiesData: Streak[] = [
  {
    id: '1', // case 3
    activitiesToday: 3, // 2024-02-26 is today
    total: 4,
    days: [
      { date: '2024-02-29', activities: 0, state: StreakState.INCOMPLETE },
      { date: '2024-02-28', activities: 0, state: StreakState.INCOMPLETE },
      { date: '2024-02-27', activities: 0, state: StreakState.INCOMPLETE },
      { date: '2024-02-26', activities: 3, state: StreakState.COMPLETED },
      { date: '2024-02-25', activities: 0, state: StreakState.SAVED },
      { date: '2024-02-24', activities: 0, state: StreakState.SAVED },
      { date: '2024-02-23', activities: 2, state: StreakState.COMPLETED },
    ],
  },
  {
    id: '2', // case 2
    activitiesToday: 2, // 2024-02-26 is today
    total: 3,
    days: [
      { date: '2024-02-29', activities: 0, state: StreakState.INCOMPLETE },
      { date: '2024-02-28', activities: 0, state: StreakState.INCOMPLETE },
      { date: '2024-02-27', activities: 0, state: StreakState.INCOMPLETE },
      { date: '2024-02-26', activities: 2, state: StreakState.INCOMPLETE },
      { date: '2024-02-25', activities: 0, state: StreakState.SAVED },
      { date: '2024-02-24', activities: 0, state: StreakState.AT_RISK },
      { date: '2024-02-23', activities: 2, state: StreakState.COMPLETED },
    ],
  },
  // there was no data for case 3
];
