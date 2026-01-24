import { OrderFeedCard } from '@components/order-feed/order-feed-card/order-feed-card.tsx';

import type { TOrderDetails } from '@shared/types/entities.ts';

import styles from './order-feed-list.module.css';

type TOrderFeedListProps = {
  orders: TOrderDetails[];
  orderCardProps?: {
    onClick?: (order: TOrderDetails) => void;
    showStatus?: boolean;
  };
};

export const OrderFeedList = ({
  orders,
  orderCardProps,
}: TOrderFeedListProps): React.JSX.Element => {
  return (
    <section className={`${styles.wrapper}`}>
      <ul className={`${styles.list}`}>
        {orders.map((order) => (
          <li key={order._id}>
            <OrderFeedCard
              order={order}
              onClick={orderCardProps?.onClick}
              showStatus={orderCardProps?.showStatus}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
