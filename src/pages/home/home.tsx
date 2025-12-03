import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BurgerConstructor } from '@components/burger-constructor/burger-constructor.tsx';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.tsx';
import { PageTitle } from '@components/ui/page-title/page-title.tsx';

import styles from './home.module.css';

export const HomePage = (): React.JSX.Element => {
  return (
    <section className={`${styles.page}`}>
      <PageTitle>Соберите бургер</PageTitle>

      <div className={`${styles.content}`}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>
    </section>
  );
};
