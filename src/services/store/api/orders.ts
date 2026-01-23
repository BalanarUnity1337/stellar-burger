import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { WEBSOCKET_URL } from '@shared/constants.ts';
import { connectWebSocket, getAccessToken, updateAuthTokens } from '@shared/utils';

import { baseApi } from '@services/store/api/index.ts';

import type { RootState } from '@services/store';
import type {
  TCreateOrderApiRequestParams,
  TCreateOrderApiResponse,
  TGetOrderByNumberApiResponse,
  TGetFeedOrdersApiResponse,
  TGetFeedOrdersWithWSLoading,
  TGetUserOrdersWithWSLoading,
  TGetUserOrdersApiResponse,
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

      keepUnusedDataFor: 10,

      onCacheEntryAdded: async (
        _,
        // eslint-disable-next-line @typescript-eslint/unbound-method
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) => {
        const { closeWS } = connectWebSocket(`${WEBSOCKET_URL}/orders/all`, {
          enablePing: true,
          reconnectOnClose: true,
          onOpen: () => {
            updateCachedData((draft) => {
              draft.isWSLoading = true;
            });
          },
          onClose: () => {
            updateCachedData((draft) => {
              draft.isWSLoading = false;
            });
          },
          onMessage: (event: MessageEvent) => {
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
          },
        });

        try {
          await cacheDataLoaded;
        } catch {
          updateCachedData((draft) => {
            draft.isWSLoading = false;
          });
        } finally {
          await cacheEntryRemoved;

          closeWS();
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

      keepUnusedDataFor: 10,

      onCacheEntryAdded: async (
        _,
        // eslint-disable-next-line @typescript-eslint/unbound-method
        { cacheDataLoaded, updateCachedData, cacheEntryRemoved }
      ) => {
        const { closeWS, reconnectWS } = connectWebSocket(
          `${WEBSOCKET_URL}/orders?token=${getAccessToken()}`,
          {
            enablePing: true,
            reconnectOnClose: true,
            onOpen: () => {
              updateCachedData((draft) => {
                draft.isWSLoading = true;
              });
            },
            onClose: () => {
              updateCachedData((draft) => {
                draft.isWSLoading = false;
              });
            },
            onMessage: (event: MessageEvent) => {
              const listener = async (): Promise<void> => {
                try {
                  if (typeof event.data === 'string') {
                    const data = JSON.parse(event.data) as TGetUserOrdersApiResponse;

                    if (!data.success && data.message === 'Invalid or missing token') {
                      closeWS();

                      const tokens = await updateAuthTokens();

                      if (tokens.success) {
                        reconnectWS(`${WEBSOCKET_URL}/orders?token=${getAccessToken()}`);
                      }
                    } else if (data.success) {
                      updateCachedData((draft) => {
                        const { orders, ...fields } = data;
                        Object.assign(draft, fields);

                        userOrdersAdapter.setAll(draft.orders, orders);
                        draft.isWSLoading = false;
                      });
                    }
                  }
                } catch (e) {
                  console.error('Ошибка при чтении данных из WebSocket ->', e);

                  updateCachedData((draft) => {
                    draft.isWSLoading = false;
                  });
                }
              };

              void listener();
            },
          }
        );

        try {
          await cacheDataLoaded;
        } catch {
          updateCachedData((draft) => {
            draft.isWSLoading = false;
          });
        } finally {
          await cacheEntryRemoved;

          closeWS();
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
