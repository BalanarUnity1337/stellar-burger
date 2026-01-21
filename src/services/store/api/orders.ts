import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { WEBSOCKET_URL } from '@shared/constants.ts';

import { baseApi } from '@services/store/api/index.ts';

import type { RootState } from '@services/store';
import type {
  TCreateOrderApiRequestParams,
  TCreateOrderApiResponse,
  TGetOrderByNumberApiResponse,
  TGetOrdersApiResponse,
  TGetOrdersWithWSLoading,
} from '@shared/types/api.ts';
import type { TOrderDetails } from '@shared/types/entities.ts';

const ordersAdapter = createEntityAdapter<TOrderDetails, number>({
  selectId: (order: TOrderDetails) => order.number,
});

const ordersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation<TCreateOrderApiResponse, TCreateOrderApiRequestParams>({
      query: (body) => ({
        url: 'orders',
        method: 'POST',
        body,
      }),
    }),

    getOrderByNumber: build.query<TOrderDetails | null, number | string>({
      query: (orderNumber) => ({ url: `orders/${orderNumber}` }),
      transformResponse: (response: TGetOrderByNumberApiResponse) =>
        response.orders[0] ?? null,
    }),

    getOrders: build.query<TGetOrdersWithWSLoading, void>({
      queryFn: () => ({
        data: {
          orders: ordersAdapter.getInitialState(),
          total: 0,
          success: true,
          totalToday: 0,
          isWSLoading: true,
        } satisfies TGetOrdersWithWSLoading,
      }),

      async onCacheEntryAdded(
        _,
        // eslint-disable-next-line @typescript-eslint/unbound-method
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        let ws: WebSocket | null = null;

        const connect = (): void => {
          ws = new WebSocket(`${WEBSOCKET_URL}/orders/all`);

          ws.addEventListener('open', () => {
            updateCachedData((draft) => {
              draft.isWSLoading = true;
            });
          });

          ws.addEventListener('close', () => {
            updateCachedData((draft) => {
              draft.isWSLoading = false;
            });
          });

          ws.addEventListener('message', (event: MessageEvent) => {
            try {
              if (typeof event.data === 'string') {
                const data = JSON.parse(event.data) as TGetOrdersApiResponse;

                updateCachedData((draft) => {
                  const { orders, ...fields } = data;
                  Object.assign(draft, fields);

                  ordersAdapter.setAll(draft.orders, orders);

                  draft.isWSLoading = false;
                });
              }
            } catch (e) {
              console.error('Ошибка при чтении данных из WebSocket', e);

              updateCachedData((draft) => {
                draft.isWSLoading = false;
              });
            }
          });
        };

        try {
          connect();

          await cacheDataLoaded;
        } catch (e) {
          console.error('Ошибка при подключении к WebSocket', e);

          updateCachedData((draft) => {
            draft.isWSLoading = false;
          });
        } finally {
          await cacheEntryRemoved;
        }

        (ws as unknown as WebSocket)?.close();
      },
    }),
  }),
});

const selectOrdersResult = ordersApi.endpoints.getOrders.select();

const selectOrdersData = createSelector(
  selectOrdersResult,
  (result) => result.data?.orders ?? ordersAdapter.getInitialState()
);

export const ordersSelectors = ordersAdapter.getSelectors<RootState>(selectOrdersData);

export const { useCreateOrderMutation, useGetOrdersQuery, useGetOrderByNumberQuery } =
  ordersApi;
