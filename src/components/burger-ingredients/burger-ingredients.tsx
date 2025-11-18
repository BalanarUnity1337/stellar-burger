import { useGetIngredientsQuery } from '@/api/ingredients.ts';
import {
  resetSelectedIngredient,
  selectSelectedIngredient,
} from '@/store/slices/selected-ingredient.ts';
import { Tab, Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BurgerIngredientsSection } from '@components/burger-ingredients/burger-ingredients-section/burger-ingredients-section.tsx';
import { IngredientDetails } from '@components/burger-ingredients/ingredient-details/ingredient-details.tsx';
import { Modal } from '@components/modal/modal.tsx';

import type { TIngredient, TIngredientType } from '@shared/types.ts';

import styles from './burger-ingredients.module.css';

type TSections = Record<TIngredientType, TIngredient[]>;

const sectionTitles: Record<TIngredientType, string> = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки',
};

export const BurgerIngredients = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const selectedIngredient = useSelector(selectSelectedIngredient);

  const [activeTab, setActiveTab] = useState<TIngredientType>('bun');

  const { data: ingredients, isFetching, isSuccess, isError } = useGetIngredientsQuery();

  const handleTabClick = useCallback((tabName: TIngredientType): void => {
    setActiveTab(tabName);
  }, []);

  const sections: TSections = useMemo(
    () =>
      (ingredients ?? []).reduce((acc, ingredient) => {
        acc[ingredient.type] = [...(acc[ingredient.type] ?? []), ingredient];

        return acc;
      }, {} as TSections),
    [ingredients]
  );

  const content = useMemo(() => {
    if (isFetching) {
      return <Preloader />;
    }

    if (isError) {
      return (
        <p className={`text text_type_main-large mt-20`}>
          Произошла ошибка при загрузке ингредиентов
        </p>
      );
    }

    if (isSuccess && ingredients?.length > 0) {
      return (
        <>
          <nav>
            <ul className={styles.menu}>
              {(Object.keys(sectionTitles) as TIngredientType[]).map((tabName) => (
                <li key={tabName}>
                  <Tab
                    value={tabName}
                    active={tabName === activeTab}
                    onClick={handleTabClick as (value: string) => void}
                  >
                    {sectionTitles[tabName]}
                  </Tab>
                </li>
              ))}
            </ul>
          </nav>

          <div className={`mt-10 custom-scroll ${styles.sections}`}>
            {(Object.keys(sections) as TIngredientType[]).map((key) => (
              <BurgerIngredientsSection
                key={key}
                title={sectionTitles[key]}
                items={sections[key]}
              />
            ))}
          </div>
        </>
      );
    }
  }, [sections, isFetching, isSuccess, isError, activeTab]);

  return (
    <>
      <section className={styles.burger_ingredients}>{content}</section>

      {selectedIngredient && (
        <Modal onClose={() => dispatch(resetSelectedIngredient())}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </>
  );
};
