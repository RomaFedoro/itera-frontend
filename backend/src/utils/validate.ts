import {addMethod, array, ArraySchema, Schema, ValidationError} from 'yup';

// TODO: fix types

declare module 'yup' {
  // @ts-ignore
  interface ArraySchema<T> {
    unique(
      message: string,
      mapper?: (value: T, index?: number, list?: T[]) => T[]
    ): ArraySchema<T>;
  }
}

addMethod(array, 'unique', function (
  message,
  mapper = (val: unknown) => val
) {
  return this.test(
    'unique',
    message,
    (list = []) => list.length === new Set(list.map(mapper)).size
  );
});

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

export const validate = <T extends Schema, K>(schema: T, data: K) => {
  return schema.validate(data).then(ok).catch(err);
}
