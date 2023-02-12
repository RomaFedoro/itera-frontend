import {InferType, object, string} from 'yup';

export const registerUserRequest = object({
  name: string().trim().required(),
  email: string().trim().email().required(),
  password: string().trim().min(6).required(),
});
export type RegisterUserRequestType = InferType<typeof registerUserRequest>;

export const loginUserRequest = object({
  email: string().trim().email().required(),
  password: string().trim().min(6).required(),
});
export type LoginUserRequestType = InferType<typeof loginUserRequest>;
