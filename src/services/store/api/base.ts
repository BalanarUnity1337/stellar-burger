import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from '@shared/utils';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Ingredients', 'User'],
  endpoints: () => ({}),
});
