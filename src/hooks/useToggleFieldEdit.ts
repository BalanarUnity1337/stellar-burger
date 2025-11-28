import { useCallback, useEffect, useRef } from 'react';

import { useToggle } from '@hooks/useToggle.ts';

type TUseToggleFieldEditReturnType = {
  isEdit: boolean;
  toggleFieldEdit: () => void;
  ref: React.RefObject<HTMLInputElement | null>;
};

export const useToggleFieldEdit = (
  initialValue: boolean
): TUseToggleFieldEditReturnType => {
  const [isEdit, toggle] = useToggle(initialValue);

  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEdit && ref.current != null) {
      ref.current.focus();
    }
  }, [isEdit]);

  const toggleFieldEdit = useCallback((): void => {
    toggle();
  }, [toggle]);

  return {
    isEdit,
    toggleFieldEdit,
    ref,
  };
};
