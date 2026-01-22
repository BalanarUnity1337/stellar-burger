import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { WEBSOCKET_URL } from '@shared/constants.ts';
import { getAccessToken } from '@shared/utils';

import { baseApi } from '@services/store/api/index.ts';

import type { RootState } from '@services/store';
import type {
  TCreateOrderApiRequestParams,
  TCreateOrderApiResponse,
  TGetOrderByNumberApiResponse,
  TGetFeedOrdersApiResponse,
  TGetFeedOrdersWithWSLoading,
  TGetUserOrdersApiResponse,
  TGetUserOrdersWithWSLoading,
} from '@shared/types/api.ts';
import type { TOrderDetails } from '@shared/types/entities.ts';

// @TODO: rename allOrdersAdapter
const feedOrdersAdapter = createEntityAdapter<TOrderDetails, number>({
  selectId: (order: TOrderDetails) => order.number,
});

const userOrdersAdapter = createEntityAdapter<TOrderDetails, number>({
  selectId: (order: TOrderDetails) => order.number,
  sortComparer: (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
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

    getFeedOrders: build.query<TGetFeedOrdersWithWSLoading, void>({
      queryFn: () => ({
        data: {
          orders: feedOrdersAdapter.getInitialState(),
          total: 0,
          totalToday: 0,
          success: true,
          isWSLoading: true,
        } satisfies TGetFeedOrdersWithWSLoading,
      }),

      onCacheEntryAdded: async (
        _,
        // eslint-disable-next-line @typescript-eslint/unbound-method
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) => {
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
                const data = JSON.parse(event.data) as TGetFeedOrdersApiResponse;

                updateCachedData((draft) => {
                  const { orders, ...fields } = data;
                  Object.assign(draft, fields);

                  feedOrdersAdapter.setAll(draft.orders, orders);

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

          (ws as unknown as WebSocket)?.close();
        }
      },
    }),

    getUserOrders: build.query<TGetUserOrdersWithWSLoading, void>({
      queryFn: () => ({
        data: {
          orders: userOrdersAdapter.getInitialState(),
          total: 0,
          totalToday: 0,
          success: true,
          isWSLoading: true,
        } as TGetUserOrdersWithWSLoading,
      }),

      onCacheEntryAdded: async (
        _,
        // eslint-disable-next-line @typescript-eslint/unbound-method
        { cacheDataLoaded, updateCachedData, cacheEntryRemoved }
      ) => {
        let ws: WebSocket | null = null;

        const connect = (): void => {
          const accessToken = getAccessToken();

          ws = new WebSocket(`${WEBSOCKET_URL}/orders?token=${accessToken}`);

          if (ws != null) {
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
                  const data = JSON.parse(event.data) as TGetUserOrdersApiResponse;

                  updateCachedData((draft) => {
                    const { orders, ...fields } = data;
                    Object.assign(draft, fields);

                    userOrdersAdapter.setAll(draft.orders, orders);

                    updateCachedData((draft) => {
                      draft.isWSLoading = false;
                    });
                  });
                }
              } catch (e) {
                console.error('Ошибка при чтении данных из WebSocket', e);

                updateCachedData((draft) => {
                  draft.isWSLoading = false;
                });
              }
            });
          }
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

          (ws as unknown as WebSocket)?.close();
        }
      },
    }),
  }),
});

// @TODO: Вынести в отдельные файлы, м.б.
const selectFeedOrdersResult = ordersApi.endpoints.getFeedOrders.select();

const selectFeedOrdersData = createSelector(
  selectFeedOrdersResult,
  (result) => result.data?.orders ?? feedOrdersAdapter.getInitialState()
);

// @TODO: Вынести в отдельные файлы, м.б.
const selectUserOrdersResult = ordersApi.endpoints.getUserOrders.select();

const selectUserOrdersData = createSelector(
  selectUserOrdersResult,
  (result) => result.data?.orders ?? userOrdersAdapter.getInitialState()
);

export const feedOrdersSelectors =
  feedOrdersAdapter.getSelectors<RootState>(selectFeedOrdersData);

export const userOrdersSelectors =
  userOrdersAdapter.getSelectors<RootState>(selectUserOrdersData);

export const {
  useCreateOrderMutation,
  useGetFeedOrdersQuery,
  useGetOrderByNumberQuery,
  useGetUserOrdersQuery,
} = ordersApi;
