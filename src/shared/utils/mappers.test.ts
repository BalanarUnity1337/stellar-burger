import { mapIngredientToConstructorIngredient } from '@shared/utils/mappers.ts';
import { describe, expect, test } from 'vitest';

import type { TConstructorIngredient, TIngredient } from '@shared/types/entities.ts';

describe('mappers', () => {
  describe('mapIngredientToConstructorIngredient', () => {
    test('should map ingredient object to new object with unique id field', () => {
      const mockIngredient = {
        _id: 'ingredient-1',
        type: 'main',
        image: '/path/to/image.png',
        name: 'Начинка',
        price: 300,
      } as Pick<TIngredient, '_id' | 'type' | 'name' | 'image' | 'price'>;

      const result = mapIngredientToConstructorIngredient(mockIngredient as TIngredient);

      const expected = {
        _id: mockIngredient._id,
        type: mockIngredient.type,
        image: mockIngredient.image,
        name: mockIngredient.name,
        price: mockIngredient.price,
        uid: expect.any(String) as string,
      } satisfies TConstructorIngredient;

      expect(result).toEqual(expected);
    });
  });
});
