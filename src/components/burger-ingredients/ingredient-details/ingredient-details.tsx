import type { TIngredient } from '@shared/types/entities.ts';

import styles from './ingredient-details.module.css';

type TIngredientDetailsProps = {
  ingredient: TIngredient;
};

export const IngredientDetails = ({
  ingredient,
}: TIngredientDetailsProps): React.JSX.Element => {
  const details = [
    ['Калории, ккал', ingredient.calories],
    ['Белки, г', ingredient.proteins],
    ['Жиры, г', ingredient.fat],
    ['Углеводы, г', ingredient.carbohydrates],
  ];

  return (
    <article
      className={`${styles.card}`}
      data-cy={`ingredient-details-${ingredient._id}`}
    >
      <figure className={`${styles.photo_wrapper}`}>
        <img
          className={`${styles.photo}`}
          src={ingredient.image_large}
          alt={ingredient.name}
          width={480}
          height={240}
        />
        <figcaption className={`text text_type_main-medium`}>
          {ingredient.name}
        </figcaption>
      </figure>

      <dl className={` ${styles.details}`}>
        {details.map(([name, value]) => (
          <div key={name}>
            <dt className={`text text_type_main-default`}>{name}</dt>
            <dd className={`text text_type_digits-default`}>{value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
};
