import { useCallback, useState } from 'react';

type TUseFormReturnType<State> = {
  formState: State;
  onFormInputChange: (e: React.SyntheticEvent) => void;
};

export const useForm = <State>(initialState: State): TUseFormReturnType<State> => {
  const [formState, setFormState] = useState<State>(initialState);

  const onFormInputChange = useCallback((e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    setFormState((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  }, []);

  return {
    formState,
    onFormInputChange,
  };
};
