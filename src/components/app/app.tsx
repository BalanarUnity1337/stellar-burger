import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor.tsx';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.tsx';
import { INGREDIENTS_API_URL } from '@utils/api.ts';

import type { TApiResponse, TIngredient } from '@utils/types.ts';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const [state, setState] = useState({
    ingredients: [] as TIngredient[],
    isFetching: false,
    isError: false,
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, isFetching: true, isError: false }));

    fetch(INGREDIENTS_API_URL)
      .then((response): Promise<TApiResponse<TIngredient[]>> => {
        if (!response.ok) {
          return Promise.reject(new Error(`Ошибка ${response.status}`));
        }

        return response.json();
      })
      .then((result) => {
        if (!result.success) {
          return Promise.reject(
            new Error(`API method result status: ${result.success}`)
          );
        }

        setState((prev) => ({ ...prev, isFetching: false, ingredients: result.data }));
      })
      .catch((_e) => {
        setState((prev) => ({ ...prev, isFetching: false, isError: true }));
      });
  }, []);

  const { ingredients, isFetching, isError } = state;

  return (
    <div className={styles.app}>
      <AppHeader />

      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>

      <main className={`${styles.main} pl-5 pr-5`}>
        {isFetching ? (
          <Preloader />
        ) : ingredients.length ? (
          <>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients} />
          </>
        ) : isError ? (
          <p className={`text text_type_main-large mt-20`}>
            Произошла ошибка при загрузке данных
          </p>
        ) : null}
      </main>
    </div>
  );
};

export default App;
