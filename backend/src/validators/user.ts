import {InferType, object, string} from 'yup';

export const registerUserRequest = object().shape({
  name: string().trim().required(),
  email: string().trim().email().required(),
  password: string().trim().min(6).required(),
}).noUnknown(true);;
export type RegisterUserRequestType = InferType<typeof registerUserRequest>;

export const loginUserRequest = object({
  email: string().trim().email().required(),
  password: string().trim().min(6).required(),
}).noUnknown(true);;
export type LoginUserRequestType = InferType<typeof loginUserRequest>;
