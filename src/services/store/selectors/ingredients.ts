import { createSelector } from '@reduxjs/toolkit';

import { ingredientsAdapter } from '@services/store/adapters';
import { ingredientsApi } from '@services/store/api';

const selectIngredientsResult = ingredientsApi.endpoints.getIngredients.select();

const selectIngredientsData = createSelector(
  selectIngredientsResult,
  (result) => result.data ?? ingredientsAdapter.getInitialState()
);

export const ingredientsSelectors =
  ingredientsAdapter.getSelectors(selectIngredientsData);
