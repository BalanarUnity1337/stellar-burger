import { createSelector, createSlice } from '@reduxjs/toolkit';
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
    selectTotalCost: createSelector(
      [
        (state: TBurgerConstructorState): TConstructorIngredient | null => state.bun,
        (state: TBurgerConstructorState): TConstructorIngredient[] => state.ingredients,
      ],
      (bun, ingredients) => {
        const bunPrice = bun?.price ?? 0;
        const ingredientsPrice = ingredients.reduce(
          (acc, ingredient) => acc + ingredient.price,
          0
        );

        return bunPrice * 2 + ingredientsPrice;
      }
    ),
    selectIngredientsQtyMap: createSelector(
      [
        (state: TBurgerConstructorState): TConstructorIngredient | null => state.bun,
        (state: TBurgerConstructorState): TConstructorIngredient[] => state.ingredients,
      ],
      (bun, ingredients) => {
        const result: Record<string, number> = {};

        if (bun != null) {
          result[bun._id] = 2;
        }

        ingredients.forEach((ingredient) => {
          result[ingredient._id] = (result[ingredient._id] ?? 0) + 1;
        });

        return result;
      }
    ),
  },
});

export const { setBun, addBurgerIngredient, deleteBurgerIngredient } =
  burgerConstructorSlice.actions;

export const {
  selectBun,
  selectBurgerIngredients,
  selectTotalCost,
  selectIngredientsQtyMap,
} = burgerConstructorSlice.selectors;

export default burgerConstructorSlice;
