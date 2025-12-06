import { baseApi } from '@services/store/api/index.ts';

import type {
  TCreateOrderApiRequestParams,
  TCreateOrderApiResponse,
} from '@shared/types/api.ts';

const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation<TCreateOrderApiResponse, TCreateOrderApiRequestParams>({
      query: (body) => ({
        url: 'orders',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
