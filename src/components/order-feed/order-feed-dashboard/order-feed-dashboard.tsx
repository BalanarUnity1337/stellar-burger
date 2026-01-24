import { OrderFeedDashboardStatus } from '@components/order-feed/order-feed-dashboard/order-feed-dashboard-status/order-feed-dashboard-status.tsx';
import { OrderFeedDashboardToday } from '@components/order-feed/order-feed-dashboard/order-feed-dashboard-today/order-feed-dashboard-today.tsx';
import { OrderFeedDashboardTotal } from '@components/order-feed/order-feed-dashboard/order-feed-dashboard-total/order-feed-dashboard-total.tsx';

import type { TOrderDetails } from '@shared/types/entities.ts';

import styles from './order-feed-dashboard.module.css';

type TOrderFeedDashboardProps = {
  orders: TOrderDetails[];
  total: number;
  totalToday: number;
};

export const OrderFeedDashboard = ({
  orders,
  total,
  totalToday,
}: TOrderFeedDashboardProps): React.JSX.Element => {
  return (
    <section className={`${styles.dashboard}`}>
      <OrderFeedDashboardStatus orders={orders} />

      <OrderFeedDashboardTotal count={total} />

      <OrderFeedDashboardToday count={totalToday} />
    </section>
  );
};
