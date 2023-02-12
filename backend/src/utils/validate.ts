import {Schema, ValidationError} from 'yup';

const err = (error: ValidationError) => ({
  valid: false as false,
  details: {
    field: error.path,
    message: error.message
  },
});

const ok = <T>(data: T) => ({
  valid: true as true,
  data,
});

export const validate = <T extends Schema, K>(schema:T, data: K) => {
  return schema.validate(data).then(ok).catch(err);
}
