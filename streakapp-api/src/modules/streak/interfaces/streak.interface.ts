import { Day } from './day.interface';

export interface Streak {
  id: string;
  activitiesToday: number; // 2024-02-26 is today
  total: number;
  days: Day[];
}
