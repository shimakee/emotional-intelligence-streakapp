import { Injectable } from '@nestjs/common';
// import { activitiesData } from './activity.data';
import { Streak } from '../interfaces/streak.interface';
import { activitiesData } from './activity.data';
import { Day } from '../interfaces/day.interface';
import { StreakState } from '../constants/state.constant';

@Injectable()
export class StreaksService {
  // while this service gets everyting from sample data,
  // the assumption here is everything will be taken from database.
  getStreaks(): Streak[] {
    return activitiesData;
  }

  // use the sample data as structure.
  // used the cases to create activity data
  getStreak(streakCase: number): Streak {
    const activities = this.generateActivityDays(streakCase);
    const evaluatedActivities = this.EvaluateStreakState([...activities]);
    const total = this.getTotal(evaluatedActivities);

    const finalActivityDays = this.AddFutureDays(
      this.TrimNoStreakDay(evaluatedActivities),
    );

    return {
      id: `${streakCase}`,
      activitiesToday: activities[0].activities,
      total,
      days: finalActivityDays,
    };
  }

  // The response total counter, counts the current streak length and the streak can be built by activity data which is read from a JSON file
  // it can be build by activitiy data but doesn't mention what counts as a streak.
  // so I'll go with assumption below based on data given
  // COMPLETED, SAVED adn AT_RISK -> counted in streak total (example clearly shows this to be the case)
  // INCOMPLETE -> don't count as streak
  private getTotal(days: Day[]): number {
    let total = 0;
    for (const day of days) {
      if (day.state === StreakState.INCOMPLETE) continue;
      total++;
    }
    return total;
  }

  // we are just generating days here based on case
  // but assumption is we get this from DB -> i could also have just hardcoded this as JSON file
  private generateActivityDays(streakcase: number): Day[] {
    const today = new Date(Date.now());

    const activities: Day[] = [];

    // to cover 7 day window. -> future dates will be added depending on streak length
    for (let i = 0; i < 7; i++) {
      const activity = {
        date: new Date(new Date().setDate(today.getDate() - i))
          .toISOString()
          .split('T')[0],
        activities: 0,
        state: StreakState.INCOMPLETE,
      };

      // adding activity to the streak based on cases given
      switch (+streakcase) {
        case 1:
          if (i === 0) {
            activity.activities = 3;
          } else if (i === 3) {
            activity.activities = 1;
          }
          break;
        case 2:
          if (i === 0 || i === 3 || i === 4) {
            activity.activities = 1;
          }
          break;
        case 3:
          if (i === 1) {
            activity.activities = 3;
          } else if (i === 4) {
            activity.activities = 1;
          }
          break;
        default:
          break;
      }

      activities.push(activity);
    }

    return activities;
  }

  // on evaluation the streak is measured different from total
  // COMPLETED -> counts as streak
  // SAVED -> vague, but seems to not count as streak
  // AT_RISK -> does not, since it's mentioned as inactivity
  private EvaluateStreakState(days: Day[]): Day[] {
    // assumption is that we get this in order form DB ascending from current to past
    // first element = today.

    for (let i = days.length - 1; i >= 0; i--) {
      const activity = days[i];

      let hasStreakYesterday = false;
      let hasStreakOtherday = false;
      const yesterday = i + 1;
      const otherday = i + 2;

      // we're using activities here since state is not yet set on past days
      if (days.length > yesterday) {
        hasStreakYesterday = days[yesterday].activities > 0;

        // check saved
        if (!hasStreakYesterday && activity.activities >= 2) {
          days[yesterday].state = StreakState.SAVED;
        }
      }
      if (days.length > otherday) {
        hasStreakOtherday = days[otherday].activities > 0;

        // check saved
        if (
          !hasStreakYesterday &&
          !hasStreakOtherday &&
          activity.activities >= 3
        ) {
          days[otherday].state = StreakState.SAVED;
        }
      }

      // check at risk
      if (hasStreakYesterday && activity.activities === 0) {
        activity.state = StreakState.AT_RISK;
      }

      if (hasStreakOtherday && activity.activities === 0) {
        activity.state = StreakState.AT_RISK;
      }

      // check completed
      if (activity.activities > 0) {
        activity.state = StreakState.COMPLETED;
      }

      // no need to set state to INCOMPLETE since it's default
    }
    return days;
  }

  // remove past days that have no activity
  // this is done to make sure we don't have empty days in the streak
  private TrimNoStreakDay(days: Day[]): Day[] {
    let indexToRemove = days.length - 1;
    for (let i = days.length - 1; i >= 0; i--) {
      const activity = days[i];

      if (activity.activities > 0) break;

      indexToRemove = i;
    }

    const totalToRemove = days.length - indexToRemove;

    days.splice(indexToRemove, totalToRemove);
    return days;
  }

  // add future days to the streak
  // this is done to make sure we have a full week of streak
  private AddFutureDays(days: Day[]): Day[] {
    const totalItemsToAdd = 7 - days.length;
    const today = new Date(Date.now());
    const futureDays: Day[] = [...days];

    for (let i = 1; i <= totalItemsToAdd; i++) {
      const activity = {
        date: new Date(new Date().setDate(today.getDate() + i))
          .toISOString()
          .split('T')[0],
        activities: 0,
        state: StreakState.INCOMPLETE,
      };

      futureDays.unshift(activity);
    }

    return futureDays;
  }
}
