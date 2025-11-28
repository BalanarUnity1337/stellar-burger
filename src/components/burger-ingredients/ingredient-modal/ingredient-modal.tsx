import { RouterPaths } from '@/router';
import { useNavigate, useParams } from 'react-router';

import { IngredientDetails } from '@components/burger-ingredients/ingredient-details/ingredient-details.tsx';
import { Modal } from '@components/modal/modal.tsx';
import { useGetIngredientsQuery } from '@services/store/api/ingredients.ts';

export const IngredientModal = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { data: ingredients } = useGetIngredientsQuery();
  const { id } = useParams();

  const ingredient = ingredients?.find((ingredient) => ingredient._id === id) ?? null;

  const handleModalClose = (): void => {
    void navigate(RouterPaths.index, { replace: true });
  };

  return (
    <>
      {ingredient && (
        <Modal onClose={handleModalClose}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </>
  );
};
