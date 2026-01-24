import { createEntityAdapter } from '@reduxjs/toolkit';

import type { TOrderDetails } from '@shared/types/entities.ts';

export const userOrdersAdapter = createEntityAdapter<TOrderDetails, number>({
  selectId: (order: TOrderDetails) => order.number,
  sortComparer: (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
});
