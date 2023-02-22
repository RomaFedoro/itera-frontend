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
    reset,
    formState: { isDirty, isValid, errors, touchedFields },
  } = useForm<T>({
    mode: 'onChange',
    resetOptions: {
      keepDirtyValues: true,
      keepIsValid: true,
    },
    ...formOptions,
  });

  console.log(isDirty, isValid, errors, touchedFields);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const onSubmit = handleSubmit((body) => {
    reset(body);
    mutate(body);
  });

  return {
    register,
    onSubmit,
    control,
    errors,
    isValidForm: isDirty && isValid,
    isTouched: Object.keys(touchedFields).length > 0,
    hasMounted,
  };
};

export default useMutationForm;
