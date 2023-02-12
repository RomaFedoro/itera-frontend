import {array, InferType, number, object, string} from 'yup';

export const storeHabitRequest = object({
  name: string().trim().required(),
  description: string().trim(),
  totalSteps: number().min(1).required(),
  days: array().of(number().min(1).max(7)).max(7).unique().required(),
});
export type StoreHabitRequestType = InferType<typeof storeHabitRequest>;

export const updateHabitRequest = object({
  name: string().trim(),
  description: string().trim(),
  totalSteps: number().min(1),
  days: array().of(number().min(1).max(7)).max(7).unique(),
});
export type UpdateHabitRequestType = InferType<typeof updateHabitRequest>;
