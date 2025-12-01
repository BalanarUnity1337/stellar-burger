import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useParams } from 'react-router';

import { IngredientDetails } from '@components/burger-ingredients/ingredient-details/ingredient-details.tsx';
import { Text } from '@components/ui/text/text.tsx';
import { useGetIngredientsQuery } from '@services/store/api/ingredients.ts';

import styles from './_id.module.css';

export const IngredientPage = (): React.JSX.Element | null => {
  const { data: ingredients, isLoading, isSuccess, isError } = useGetIngredientsQuery();
  const { id } = useParams();

  const ingredient = ingredients?.find((ingredient) => ingredient._id === id) ?? null;

  if (isLoading) {
    return <Preloader />;
  }

  if (isSuccess) {
    if (ingredient != null) {
      return (
        <section className={`${styles.page}`}>
          <IngredientDetails ingredient={ingredient} />
        </section>
      );
    }

    return (
      <section className={`${styles.page}`}>
        <Text size="large">Ингредиент не найден</Text>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={`${styles.page}`}>
        <Text size="large">Произошла ошибка при загрузке данных</Text>
      </section>
    );
  }

  return null;
};
