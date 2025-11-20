import { baseApi } from '@services/store/api/index.ts';

import type { TApiResponse, TIngredient } from '@shared/types.ts';

const ingredientsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getIngredients: build.query<TIngredient[], void>({
      query: () => ({ url: 'ingredients' }),
      providesTags: ['Ingredients'],
      transformResponse: (response: TApiResponse<TIngredient[]>) => response.data,
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;
