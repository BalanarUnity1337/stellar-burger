import { createChunks } from '@shared/utils';

import { Digits } from '@components/ui/digits/digits.tsx';
import { Text } from '@components/ui/text/text.tsx';

import type { TOrderDetails } from '@shared/types/entities.ts';

import styles from './order-feed-dashboard-status.module.css';

type TOrderFeedDashboardStatusProps = {
  orders: TOrderDetails[];
};

export const OrderFeedDashboardStatus = ({
  orders,
}: TOrderFeedDashboardStatusProps): React.JSX.Element => {
  const readyOrders = orders
    .filter((order) => order.status === 'done')
    .slice(0, 14)
    .map((order) => order.number);

  const inProgressOrders = orders
    .filter((order) => order.status === 'pending')
    .slice(0, 14)
    .map((order) => order.number);

  const readyOrdersChunks = createChunks(readyOrders, 7);
  const inProgressOrdersChunks = createChunks(inProgressOrders, 7);

  return (
    <section className={`${styles.wrapper}`}>
      <div className={`${styles.statusColumn}`}>
        <Text as="h2" size="medium">
          Готовы:
        </Text>

        <div className={`${styles.statusColumns}`}>
          {readyOrdersChunks.map((ordersChunk, index) => (
            <ul key={index} className={`${styles.statusColumn_list}`}>
              {ordersChunk.map((order) => (
                <li key={order}>
                  <Digits color="success">{order}</Digits>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className={`${styles.statusColumn}`}>
        <Text as="h2" size="medium">
          В работе:
        </Text>

        <div className={`${styles.statusColumns}`}>
          {inProgressOrdersChunks.map((ordersChunk, index) => (
            <ul key={index} className={`${styles.statusColumn_list}`}>
              {ordersChunk.map((order) => (
                <li key={order}>
                  <Digits>{order}</Digits>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};
