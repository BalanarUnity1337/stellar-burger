import { useCallback, useState } from 'react';

type TUseToggleReturnType = [boolean, () => void];

export const useToggle = (initialValue: boolean): TUseToggleReturnType => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, toggle];
};
