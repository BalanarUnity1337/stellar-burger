import { baseApi } from '@services/store/api/index.ts';

import type { TApiCommonResponse } from '@shared/types/api.ts';
import type { TIngredient } from '@shared/types/entities.ts';

const ingredientsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getIngredients: build.query<TIngredient[], void>({
      query: () => ({ url: 'ingredients' }),
      providesTags: ['Ingredients'],
      transformResponse: (response: TApiCommonResponse<TIngredient[]>) => response.data,
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;
