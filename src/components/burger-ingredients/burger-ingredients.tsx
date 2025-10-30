import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState, useCallback } from 'react';

import { BurgerIngredient } from '@components/burger-ingredients/burger-ingredient/burger-ingredient';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  console.log(ingredients);
  const [activeTab, setActiveTab] = useState<TIngredient['type']>('bun');

  const isTabActive = (tabName: TIngredient['type']): boolean => activeTab === tabName;

  const handleTabClick = useCallback((tabName: TIngredient['type']): void => {
    setActiveTab(tabName);
  }, []);

  const [buns, sauces, mains] = ingredients.reduce(
    (acc: [TIngredient[], TIngredient[], TIngredient[]], ingredient) => {
      switch (ingredient.type) {
        case 'bun': {
          return [[...acc[0], ingredient], acc[1], acc[2]];
        }

        case 'sauce': {
          return [acc[0], [...acc[1], ingredient], acc[2]];
        }

        case 'main': {
          return [acc[0], acc[1], [...acc[2], ingredient]];
        }

        default: {
          return acc;
        }
      }
    },
    [[], [], []]
  );

  const sections: Record<TIngredient['type'], { title: string; items: TIngredient[] }> =
    {
      bun: {
        title: 'Булки',
        items: buns,
      },
      sauce: {
        title: 'Соусы',
        items: sauces,
      },
      main: {
        title: 'Начинки',
        items: mains,
      },
    };

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          {(Object.keys(sections) as TIngredient['type'][]).map((tabName) => (
            <li key={tabName}>
              <Tab
                key={tabName}
                value={tabName}
                active={isTabActive(tabName)}
                onClick={handleTabClick as (value: string) => void}
              >
                {sections[tabName].title}
              </Tab>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`mt-10 custom-scroll ${styles.sections}`}>
        {Object.values(sections).map((section) => (
          <div key={section.title}>
            <h2 className={`text text_type_main-medium`}>{section.title}</h2>

            <ul className={`${styles.list}`}>
              {section.items.map((ingredient: TIngredient) => (
                <li key={ingredient._id}>
                  <BurgerIngredient ingredient={ingredient} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
