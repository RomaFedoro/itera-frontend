export type THistoryRecord = {
  id: number | string;
  habitId: number | string;
  date: string;
  totalSteps: number;
  completedSteps: number;
};

export type TTodayHistory = THistoryRecord & {
  habit: {
    name: string;
  };
};

export type TTodayHabitResponse = { data: TTodayHistory[] };
export type THistoryRecordResponse = { data: THistoryRecord[] };

export type TCompletedSteps = {
  completedSteps: number;
};

export type TCompletedStepsRequest = {
  id: number | string;
  habitId: number | string;
} & TCompletedSteps;
