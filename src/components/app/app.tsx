import { AppHeader } from '@components/app-header/app-header';
// import { BurgerConstructor } from '@components/burger-constructor/burger-constructor.tsx';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.tsx';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  return (
    <div className={styles.app}>
      <AppHeader />

      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>

      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
      </main>
    </div>
  );
};

export default App;
