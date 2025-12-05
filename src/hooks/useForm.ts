import { useCallback, useMemo, useState } from 'react';

type TUseFormReturnType<State> = {
  formState: State;
  isFormDirty: boolean;
  onFormInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetForm: (state?: State) => void;
};

export const useForm = <State extends Record<string, string | number>>(
  initialState: State
): TUseFormReturnType<State> => {
  const [formState, setFormState] = useState<State>(initialState);

  const onFormInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;

    setFormState((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  }, []);

  const isFormDirty = useMemo(
    () => Object.entries(initialState).some(([key, value]) => value !== formState[key]),
    [initialState]
  );

  const resetForm = useCallback(
    (state?: State) => {
      setFormState(() => state ?? initialState);
    },
    [initialState]
  );

  return {
    formState,
    isFormDirty,
    onFormInputChange,
    resetForm,
  };
};
