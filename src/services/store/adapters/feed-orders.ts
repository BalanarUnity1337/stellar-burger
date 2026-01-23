import { createEntityAdapter } from '@reduxjs/toolkit';

import type { TOrderDetails } from '@shared/types/entities.ts';

export const feedOrdersAdapter = createEntityAdapter<TOrderDetails, number>({
  selectId: (order: TOrderDetails) => order.number,
});
