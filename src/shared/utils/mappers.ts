import { nanoid } from '@reduxjs/toolkit';

import type { TConstructorIngredient, TIngredient } from '@shared/types/entities.ts';

export const mapIngredientToConstructorIngredient = (
  ingredient: TIngredient
): TConstructorIngredient => {
  const { _id, name, type, image, price } = ingredient;

  return {
    uid: nanoid(),
    _id,
    name,
    type,
    image,
    price,
  };
};
