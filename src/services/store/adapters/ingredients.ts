import { createEntityAdapter } from '@reduxjs/toolkit';

import type { TIngredient } from '@shared/types/entities.ts';

export const ingredientsAdapter = createEntityAdapter<TIngredient, string>({
  selectId: (ingredient: TIngredient) => ingredient._id,
});
