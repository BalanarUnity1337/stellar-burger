import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from '@shared/constants.ts';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_API_URL });

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Ingredients'],
  endpoints: () => ({}),
});
