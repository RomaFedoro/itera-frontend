import { FieldPath, RegisterOptions } from "react-hook-form";

export type TField<T extends Record<string, unknown>> = {
  name: keyof T;
  placeholder?: string;
  type?: string;
  label?: string;
  options?: RegisterOptions<T, FieldPath<T>>;
};
