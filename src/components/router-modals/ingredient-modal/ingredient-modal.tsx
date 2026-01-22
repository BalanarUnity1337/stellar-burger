import { useNavigate, useParams } from 'react-router';

import { IngredientDetails } from '@components/burger-ingredients/ingredient-details/ingredient-details.tsx';
import { Modal } from '@components/modal/modal.tsx';
import { ingredientsSelectors, useGetIngredientsQuery } from '@services/store/api';
import { useAppSelector } from '@services/store/hooks.ts';

export const IngredientModal = (): React.JSX.Element | null => {
  const navigate = useNavigate();
  const { id } = useParams();

  useGetIngredientsQuery();

  const ingredient = useAppSelector((state) =>
    ingredientsSelectors.selectById(state, id!)
  );

  return (
    ingredient && (
      <Modal title="Детали ингредиента" onClose={() => void navigate(-1)}>
        <IngredientDetails ingredient={ingredient} />
      </Modal>
    )
  );
};
