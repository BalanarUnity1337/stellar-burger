import { WEBSOCKET_URL } from '@shared/constants.ts';

import { baseApi } from '@services/store/api/index.ts';

import type {
  TCreateOrderApiRequestParams,
  TCreateOrderApiResponse,
  TGetOrderByNumberApiResponse,
  TGetOrdersApiResponse,
  TGetOrdersWithWSLoading,
} from '@shared/types/api.ts';
import type { TOrderItem } from '@shared/types/entities.ts';

const ordersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation<TCreateOrderApiResponse, TCreateOrderApiRequestParams>({
      query: (body) => ({
        url: 'orders',
        method: 'POST',
        body,
      }),
    }),

    getOrderByNumber: build.query<TOrderItem | null, number | string>({
      query: (orderNumber) => ({ url: `orders/${orderNumber}` }),
      transformResponse: (response: TGetOrderByNumberApiResponse) =>
        response.orders[0] ?? null,
    }),

    getOrders: build.query<TGetOrdersWithWSLoading, void>({
      queryFn: () => ({
        data: {
          orders: [],
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
        const ws = new WebSocket(`${WEBSOCKET_URL}/orders/all`);

        try {
          await cacheDataLoaded;

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
                  Object.assign(draft, data);
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
        } catch (e) {
          console.error('Ошибка WebSocket', e);

          updateCachedData((draft) => {
            draft.isWSLoading = false;
          });
        } finally {
          await cacheEntryRemoved;

          ws.close();
        }
      },
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrdersQuery, useGetOrderByNumberQuery } =
  ordersApi;
