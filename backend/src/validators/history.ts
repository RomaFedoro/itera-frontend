import {date, InferType, number, object} from 'yup';

export const historyRequestQuery = object({
  startDate: date().transform(parseDateString),
  endDate: date().transform(parseDateString),
});

export const updateHistoryRequest = object({
  completedSteps: number().integer().min(0).required(),
});
export type UpdateHistoryRequestType = InferType<typeof updateHistoryRequest>;
