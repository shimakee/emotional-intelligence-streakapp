import { StreakState } from '../constants/state.constant';

export interface Day {
  date: string;
  activities: number;
  state: StreakState; // INCOMPLETE | SAVED | AT_RISK | COMPLETED
}
