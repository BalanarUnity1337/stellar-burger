import { createSelector } from '@reduxjs/toolkit';

import { userOrdersAdapter } from '@services/store/adapters';
import { ordersApi } from '@services/store/api';

const selectUserOrdersResult = ordersApi.endpoints.getUserOrders.select();

const selectUserOrders = createSelector(
  selectUserOrdersResult,
  (result) => result.data?.orders ?? userOrdersAdapter.getInitialState()
);

export const userOrdersSelectors = userOrdersAdapter.getSelectors(selectUserOrders);
