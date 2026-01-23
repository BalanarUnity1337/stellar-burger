import { createSelector } from '@reduxjs/toolkit';

import { feedOrdersAdapter } from '@services/store/adapters';
import { ordersApi } from '@services/store/api';

const selectFeedOrdersResult = ordersApi.endpoints.getFeedOrders.select();

const selectFeedOrdersData = createSelector(
  selectFeedOrdersResult,
  (result) => result.data?.orders ?? feedOrdersAdapter.getInitialState()
);

export const feedOrdersSelectors = feedOrdersAdapter.getSelectors(selectFeedOrdersData);
