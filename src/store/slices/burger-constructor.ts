import { createSlice } from '@reduxjs/toolkit';
import { mapIngredientToConstructorIngredient } from '@shared/utils.ts';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TConstructorIngredient, TIngredient } from '@shared/types.ts';

type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: [],
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.bun = action.payload;
      },
      prepare: (ingredient: TIngredient) => ({
        payload: mapIngredientToConstructorIngredient(ingredient),
      }),
    },
    addBurgerIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: mapIngredientToConstructorIngredient(ingredient),
      }),
    },
    deleteBurgerIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.uid !== action.payload
      );
    },
  },
  selectors: {
    selectBun: (state) => state.bun,
    selectBurgerIngredients: (state) => state.ingredients,
    selectTotalCost: (state) =>
      (state.bun?.price ?? 0) * 2 +
      state.ingredients.reduce((acc, item) => acc + item.price, 0),
  },
});

export const { setBun, addBurgerIngredient, deleteBurgerIngredient } =
  burgerConstructorSlice.actions;

export const { selectBun, selectBurgerIngredients, selectTotalCost } =
  burgerConstructorSlice.selectors;

export default burgerConstructorSlice;
