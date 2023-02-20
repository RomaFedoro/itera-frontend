import { UseMutateFunction } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FieldValues, useForm, UseFormProps } from 'react-hook-form';

const useMutationForm = <T extends FieldValues, K extends unknown = unknown>(
  mutate: UseMutateFunction<K, unknown, T, unknown>,
  formOptions: UseFormProps<T, unknown> = {}
) => {
  const [hasMounted, setHasMounted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { isDirty, isValid, errors },
  } = useForm<T>({
    mode: 'onTouched',
    ...formOptions,
  });

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const onSubmit = handleSubmit((body) => {
    console.log(body);
    mutate(body);
  });
  const isValidForm = isDirty && isValid;

  return {
    register,
    onSubmit,
    control,
    errors,
    isValidForm,
    hasMounted,
  };
};

export default useMutationForm;
