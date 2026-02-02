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
} from '@services/store/slices/burger-constructor.ts';

import type { TBurgerConstructorState } from '@services/store/slices/burger-constructor.ts';
import type { TConstructorIngredient, TIngredient } from '@shared/types/entities.ts';

type TMockIngredient = Pick<TIngredient, '_id' | 'type' | 'price'>;
type TMockConstructorIngredient = Pick<TConstructorIngredient, '_id' | 'type' | 'price'>;

describe('burger-constructor slice', () => {
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

  describe('reducers', () => {
    test('should return initial state', () => {
      expect(burgerConstructorSlice.getInitialState()).toEqual({
        bun: null,
        ingredients: [],
      } satisfies TBurgerConstructorState);
    });

    describe('setBun', () => {
      const state = burgerConstructorSlice.reducer(
        undefined,
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
      let state = burgerConstructorSlice.reducer(
        undefined,
        addBurgerIngredient(mockIngredient as unknown as TIngredient)
      );

      test('should add ingredient', () => {
        const expected = [
          {
            _id: mockIngredient._id,
            type: mockIngredient.type,
            price: mockIngredient.price,
          },
        ] satisfies TMockConstructorIngredient[];

        expect(state.ingredients).toMatchObject(expected);
        expect(state.ingredients).toHaveLength(1);
      });

      test('ingredient has property [uid]', () => {
        expect(state.ingredients[0]).toHaveProperty('uid');
      });

      test('when new ingredient is added, array is not overwritten', () => {
        state = burgerConstructorSlice.reducer(
          state,
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

        expect(state.ingredients).toMatchObject(expected);
        expect(state.ingredients).toHaveLength(2);
      });
    });

    describe('deleteBurgerIngredient', () => {
      const initialState = {
        bun: null,
        ingredients: [
          { ...mockIngredient, uid: 'uid-1' },
          { ...mockIngredient, uid: 'uid-2' },
        ],
      } as TBurgerConstructorState;

      test('should delete ingredient by uid', () => {
        const state = burgerConstructorSlice.reducer(
          initialState,
          deleteBurgerIngredient('uid-1')
        );

        expect(state.ingredients).toHaveLength(1);
        expect(state).toEqual({
          bun: null,
          ingredients: [{ ...mockIngredient, uid: 'uid-2' }],
        } as TBurgerConstructorState);
      });
    });

    describe('clearBurgerConstructor', () => {
      const initialState = {
        bun: mockBun,
        ingredients: [mockIngredient],
      } as TBurgerConstructorState;

      test('should set state to initial state', () => {
        const state = burgerConstructorSlice.reducer(
          initialState,
          clearBurgerConstructor()
        );

        expect(state).toEqual({
          bun: null,
          ingredients: [],
        } satisfies TBurgerConstructorState);
      });
    });

    describe('moveIngredient', () => {
      const ingredient1 = { ...mockIngredient, uid: 'uid-1' };
      const ingredient2 = { ...mockIngredient, uid: 'uid-2' };
      const ingredient3 = { ...mockIngredient, uid: 'uid-3' };
      const ingredient4 = { ...mockIngredient, uid: 'uid-4' };

      const initialState = {
        bun: null,
        ingredients: [ingredient1, ingredient2, ingredient3, ingredient4],
      } as TBurgerConstructorState;

      test('should move ingredient to target index', () => {
        const state = burgerConstructorSlice.reducer(
          initialState,
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
      const initialState = {
        bun: mockBun,
        ingredients: [],
      } as unknown as TBurgerConstructorState;

      test('should return bun, reference has not changed', () => {
        const result = selectBun({ burgerConstructor: initialState });

        expect(result).toEqual(initialState.bun);
        expect(result).toBe(initialState.bun);
      });
    });

    describe('selectBurgerIngredients', () => {
      const initialState = {
        bun: null,
        ingredients: [mockIngredient, mockIngredient],
      } as TBurgerConstructorState;

      test('should return ingredients, reference has not changed', () => {
        const result = selectBurgerIngredients({ burgerConstructor: initialState });

        expect(result).toEqual(initialState.ingredients);
        expect(result).toBe(initialState.ingredients);
        expect(result).toHaveLength(2);
      });
    });

    describe('selectTotalCost', () => {
      test('should return total burger cost with bun', () => {
        const initialState = {
          bun: mockBun,
          ingredients: [mockIngredient, mockIngredient],
        } as TBurgerConstructorState;

        const result = selectTotalCost({ burgerConstructor: initialState });

        expect(result).toBe(1337 * 2 + 550 * 2);
      });

      test('should return total burger cost without bun', () => {
        const initialState = {
          bun: null,
          ingredients: [mockIngredient, mockIngredient],
        } as TBurgerConstructorState;

        const result = selectTotalCost({ burgerConstructor: initialState });

        expect(result).toBe(550 * 2);
      });

      test('should return total burger cost is 0', () => {
        const initialState = {
          bun: null,
          ingredients: [],
        } as TBurgerConstructorState;

        const result = selectTotalCost({ burgerConstructor: initialState });

        expect(result).toBe(0);
      });
    });

    describe('selectIngredientsQtyById', () => {
      const initialState = {
        bun: mockBun,
        ingredients: [
          { ...mockIngredient, _id: 'ingredient-1' },
          { ...mockIngredient, _id: 'ingredient-2' },
          { ...mockIngredient, _id: 'ingredient-1' },
        ],
      } as TBurgerConstructorState;

      const result = selectIngredientsQtyById({ burgerConstructor: initialState });
      const sameResult = selectIngredientsQtyById({
        burgerConstructor: initialState,
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
