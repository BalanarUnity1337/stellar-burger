import { useNavigate, useParams } from 'react-router';

import { IngredientDetails } from '@components/burger-ingredients/ingredient-details/ingredient-details.tsx';
import { Modal } from '@components/modal/modal.tsx';
import { useGetIngredientsQuery } from '@services/store/api';

export const IngredientModal = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { data: ingredients } = useGetIngredientsQuery();
  const { id } = useParams();

  const ingredient = ingredients?.find((ingredient) => ingredient._id === id) ?? null;

  return (
    <>
      {ingredient && (
        <Modal onClose={() => void navigate(-1)}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </>
  );
};
