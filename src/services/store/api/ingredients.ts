import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';

import { baseApi } from '@services/store/api/index.ts';

import type { EntityState } from '@reduxjs/toolkit';
import type { RootState } from '@services/store';
import type { TApiCommonResponse } from '@shared/types/api.ts';
import type { TIngredient } from '@shared/types/entities.ts';

const ingredientsAdapter = createEntityAdapter({
  selectId: (ingredient: TIngredient) => ingredient._id,
});

const ingredientsApi = baseApi.injectEndpoints({
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

const selectIngredientsResult = ingredientsApi.endpoints.getIngredients.select();

const selectIngredientsData = createSelector(
  selectIngredientsResult,
  (result) => result.data ?? ingredientsAdapter.getInitialState()
);

export const ingredientsSelectors =
  ingredientsAdapter.getSelectors<RootState>(selectIngredientsData);

export const { useGetIngredientsQuery } = ingredientsApi;
