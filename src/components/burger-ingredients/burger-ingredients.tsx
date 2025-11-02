import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState, useCallback, useMemo } from 'react';

import { BurgerIngredientsSection } from '@components/burger-ingredients/burger-ingredients-section/burger-ingredients-section.tsx';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

type TSections = Record<TIngredient['type'], TIngredient[]>;

const sectionTitles: Record<TIngredient['type'], string> = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки',
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const [activeTab, setActiveTab] = useState<TIngredient['type']>('bun');

  const handleTabClick = useCallback((tabName: TIngredient['type']): void => {
    setActiveTab(tabName);
  }, []);

  const isTabActive = (tabName: TIngredient['type']): boolean => activeTab === tabName;

  const sections: TSections = useMemo(
    () =>
      ingredients.reduce((acc, ingredient) => {
        acc[ingredient.type] = [...(acc[ingredient.type] ?? []), ingredient];

        return acc;
      }, {} as TSections),
    [ingredients]
  );

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          {(Object.keys(sectionTitles) as TIngredient['type'][]).map((key) => (
            <li key={key}>
              <Tab
                key={key}
                value={key}
                active={isTabActive(key)}
                onClick={handleTabClick as (value: string) => void}
              >
                {sectionTitles[key]}
              </Tab>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`mt-10 custom-scroll ${styles.sections}`}>
        {(Object.keys(sections) as TIngredient['type'][]).map((key) => (
          <BurgerIngredientsSection
            key={key}
            title={sectionTitles[key]}
            items={sections[key]}
          />
        ))}
      </div>
    </section>
  );
};
