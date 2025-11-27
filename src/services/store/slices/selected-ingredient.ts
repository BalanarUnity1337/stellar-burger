import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TIngredient } from '@shared/types/entities.ts';

type SelectedIngredientState = {
  value: TIngredient | null;
};

const initialState: SelectedIngredientState = {
  value: null,
};

const selectedIngredientSlice = createSlice({
  name: 'selectedIngredient',
  initialState,
  reducers: {
    setSelectedIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.value = action.payload;
    },
    resetSelectedIngredient: (state) => {
      state.value = null;
    },
  },
  selectors: {
    selectSelectedIngredient: (state) => state.value,
  },
});

export const { setSelectedIngredient, resetSelectedIngredient } =
  selectedIngredientSlice.actions;

export const { selectSelectedIngredient } = selectedIngredientSlice.selectors;

export default selectedIngredientSlice;
