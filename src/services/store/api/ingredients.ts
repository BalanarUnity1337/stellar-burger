import { ingredientsAdapter } from '@services/store/adapters';
import { baseApi } from '@services/store/api/index.ts';

import type { EntityState } from '@reduxjs/toolkit';
import type { TApiCommonResponse } from '@shared/types/api.ts';
import type { TIngredient } from '@shared/types/entities.ts';

export const ingredientsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getIngredients: build.query<EntityState<TIngredient, string>, void>({
      query: () => ({ url: 'ingredients' }),
      providesTags: ['Ingredients'],
      keepUnusedDataFor: 300,
      transformResponse: (response: TApiCommonResponse<TIngredient[]>) => {
        return ingredientsAdapter.setAll(
          ingredientsAdapter.getInitialState(),
          response.data
        );
      },
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;
