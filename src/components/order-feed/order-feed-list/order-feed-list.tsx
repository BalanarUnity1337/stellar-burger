import { createFeedOrderPageRoute } from '@/router/paths.ts';
import { useLocation, useNavigate } from 'react-router';

import { OrderFeedCard } from '@components/order-feed/order-feed-card/order-feed-card.tsx';

import type { TOrderItem } from '@shared/types/entities.ts';

import styles from './order-feed-list.module.css';

type TOrderFeedListProps = {
  orders: TOrderItem[];
};

export const OrderFeedList = ({ orders }: TOrderFeedListProps): React.JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleOrderClick = (order: TOrderItem): void => {
    void navigate(createFeedOrderPageRoute(order.number), {
      state: { background: location },
    });
  };

  return (
    <section className={`${styles.wrapper}`}>
      <ul className={`${styles.list}`}>
        {orders.map((order) => (
          <li key={order._id}>
            <OrderFeedCard order={order} onClick={handleOrderClick} />
          </li>
        ))}
      </ul>
    </section>
  );
};
