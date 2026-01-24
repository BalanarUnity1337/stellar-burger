import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useParams } from 'react-router';

import { IngredientDetails } from '@components/burger-ingredients/ingredient-details/ingredient-details.tsx';
import { Text } from '@components/ui/text/text.tsx';
import { useGetIngredientsQuery } from '@services/store/api';
import { useAppSelector } from '@services/store/hooks.ts';
import { ingredientsSelectors } from '@services/store/selectors';

import styles from './_id.module.css';

export const IngredientPage = (): React.JSX.Element | null => {
  const { isLoading, isSuccess, isError } = useGetIngredientsQuery();
  const { id } = useParams<{ id: string }>();

  const ingredient = useAppSelector((state) =>
    ingredientsSelectors.selectById(state, id!)
  );

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
