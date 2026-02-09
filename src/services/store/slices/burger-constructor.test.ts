import { describe, expect, test } from 'vitest';

import burgerConstructorSlice, {
  addBurgerIngredient,
  clearBurgerConstructor,
  deleteBurgerIngredient,
  moveIngredient,
  selectBun,
  selectBurgerIngredients,
  selectIngredientsQtyById,
  selectTotalCost,
  setBun,
  initialState,
} from '@services/store/slices/burger-constructor.ts';

import type { TBurgerConstructorState } from '@services/store/slices/burger-constructor.ts';
import type { TConstructorIngredient, TIngredient } from '@shared/types/entities.ts';

type TMockIngredient = Pick<TIngredient, '_id' | 'type' | 'price'>;
type TMockConstructorIngredient = Pick<TConstructorIngredient, '_id' | 'type' | 'price'>;

const mockBun = {
  _id: 'bun',
  type: 'bun',
  price: 1337,
} satisfies TMockIngredient;

const mockIngredient = {
  _id: 'ingredient',
  type: 'main',
  price: 550,
} satisfies TMockIngredient;

describe('burger-constructor slice', () => {
  describe('reducers', () => {
    describe('unknown action', () => {
      test('should return initial state', () => {
        const state = burgerConstructorSlice.reducer(undefined, { type: 'unknown' });

        expect(state).toEqual(initialState);
      });
    });

    describe('setBun', () => {
      const state = burgerConstructorSlice.reducer(
        initialState,
        setBun(mockBun as unknown as TIngredient)
      );

      test('should set bun', () => {
        const expected = {
          _id: mockBun._id,
          type: mockBun.type,
          price: mockBun.price,
        } satisfies TMockConstructorIngredient;

        expect(state.bun).toMatchObject(expected);
      });

      test('bun has property [uid]', () => {
        expect(state.bun).toHaveProperty('uid');
      });
    });

    describe('addBurgerIngredient', () => {
      test('should add ingredient', () => {
        const state = burgerConstructorSlice.reducer(
          initialState,
          addBurgerIngredient(mockIngredient as unknown as TIngredient)
        );

        const expected = [
          {
            _id: mockIngredient._id,
            type: mockIngredient.type,
            price: mockIngredient.price,
          },
        ] satisfies TMockConstructorIngredient[];

        expect(state.ingredients).toHaveLength(1);
        expect(state.ingredients).toMatchObject(expected);
      });

      test('ingredient has property [uid]', () => {
        const state = burgerConstructorSlice.reducer(
          initialState,
          addBurgerIngredient(mockIngredient as unknown as TIngredient)
        );

        expect(state.ingredients).toHaveLength(1);
        expect(state.ingredients[0]).toHaveProperty('uid');
      });

      test('when new ingredient is added, array is not overwritten', () => {
        const prevState = burgerConstructorSlice.reducer(
          initialState,
          addBurgerIngredient(mockIngredient as unknown as TIngredient)
        );

        const state = burgerConstructorSlice.reducer(
          prevState,
          addBurgerIngredient(mockIngredient as unknown as TIngredient)
        );

        const expected = [
          {
            _id: mockIngredient._id,
            type: mockIngredient.type,
            price: mockIngredient.price,
          },
          {
            _id: mockIngredient._id,
            type: mockIngredient.type,
            price: mockIngredient.price,
          },
        ] satisfies TMockConstructorIngredient[];

        expect(state.ingredients).toHaveLength(2);
        expect(state.ingredients).toMatchObject(expected);
      });
    });

    describe('deleteBurgerIngredient', () => {
      test('should delete ingredient by uid', () => {
        const state = burgerConstructorSlice.reducer(
          {
            ...initialState,
            ingredients: [
              { ...mockIngredient, uid: 'uid-1' },
              { ...mockIngredient, uid: 'uid-2' },
            ] as TConstructorIngredient[],
          },
          deleteBurgerIngredient('uid-1')
        );

        expect(state.ingredients).toHaveLength(1);
        expect(state).toEqual({
          ...initialState,
          ingredients: [{ ...mockIngredient, uid: 'uid-2' } as TConstructorIngredient],
        });
      });
    });

    describe('clearBurgerConstructor', () => {
      test('should set state to initial state', () => {
        const state = burgerConstructorSlice.reducer(
          { ...initialState, ingredients: [mockIngredient as TConstructorIngredient] },
          clearBurgerConstructor()
        );

        expect(state).toEqual(initialState);
      });
    });

    describe('moveIngredient', () => {
      const ingredient1 = { ...mockIngredient, uid: 'uid-1' };
      const ingredient2 = { ...mockIngredient, uid: 'uid-2' };
      const ingredient3 = { ...mockIngredient, uid: 'uid-3' };
      const ingredient4 = { ...mockIngredient, uid: 'uid-4' };

      test('should move ingredient to target index', () => {
        const state = burgerConstructorSlice.reducer(
          {
            ...initialState,
            ingredients: [
              ingredient1,
              ingredient2,
              ingredient3,
              ingredient4,
            ] as TConstructorIngredient[],
          },
          moveIngredient({ dragItemId: 'uid-2', targetIndex: 3 })
        );

        expect(state.ingredients).toEqual([
          ingredient1,
          ingredient3,
          ingredient4,
          ingredient2,
        ]);
      });
    });
  });

  describe('selectors', () => {
    describe('selectBun', () => {
      test('should return bun, reference has not changed', () => {
        const preparedState = {
          ...initialState,
          bun: mockBun,
        } as TBurgerConstructorState;

        const result = selectBun({
          burgerConstructor: { ...preparedState },
        });

        expect(result).toEqual(preparedState.bun);
        expect(result).toBe(preparedState.bun);
      });
    });

    describe('selectBurgerIngredients', () => {
      test('should return ingredients, reference has not changed', () => {
        const preparedState = {
          ...initialState,
          ingredients: [mockIngredient, mockIngredient],
        } as TBurgerConstructorState;

        const result = selectBurgerIngredients({
          burgerConstructor: { ...preparedState },
        });

        expect(result).toHaveLength(2);
        expect(result).toEqual(preparedState.ingredients);
        expect(result).toBe(preparedState.ingredients);
      });
    });

    describe('selectTotalCost', () => {
      test('should return total burger cost with bun', () => {
        const preparedState = {
          ...initialState,
          bun: mockBun,
          ingredients: [mockIngredient, mockIngredient],
        } as TBurgerConstructorState;

        const result = selectTotalCost({ burgerConstructor: { ...preparedState } });

        expect(result).toBe(1337 * 2 + 550 * 2);
      });

      test('should return total burger cost without bun', () => {
        const preparedState = {
          ...initialState,
          bun: null,
          ingredients: [mockIngredient, mockIngredient],
        } as TBurgerConstructorState;

        const result = selectTotalCost({ burgerConstructor: { ...preparedState } });

        expect(result).toBe(550 * 2);
      });

      test('should return total burger cost is 0', () => {
        const preparedState = {
          ...initialState,
          bun: null,
          ingredients: [],
        } as TBurgerConstructorState;

        const result = selectTotalCost({ burgerConstructor: { ...preparedState } });

        expect(result).toBe(0);
      });
    });

    describe('selectIngredientsQtyById', () => {
      const preparedState = {
        ...initialState,
        bun: mockBun,
        ingredients: [
          { ...mockIngredient, _id: 'ingredient-1' },
          { ...mockIngredient, _id: 'ingredient-2' },
          { ...mockIngredient, _id: 'ingredient-1' },
        ],
      } as TBurgerConstructorState;

      const result = selectIngredientsQtyById({
        burgerConstructor: { ...preparedState },
      });

      const sameResult = selectIngredientsQtyById({
        burgerConstructor: { ...preparedState },
      });

      test('should return ingredients quantity by id', () => {
        const expected = {
          bun: 2,
          'ingredient-1': 2,
          'ingredient-2': 1,
        };

        expect(result).toEqual(expected);
      });

      test('should return same reference', () => {
        expect(result).toBe(sameResult);
      });
    });
  });
});
