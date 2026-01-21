import { Preloader } from '@krgaa/react-developer-burger-ui-components';

import { OrderFeedDashboard } from '@components/order-feed/order-feed-dashboard/order-feed-dashboard.tsx';
import { OrderFeedList } from '@components/order-feed/order-feed-list/order-feed-list.tsx';
import { PageTitle } from '@components/ui/page-title/page-title.tsx';
import { Text } from '@components/ui/text/text.tsx';
import { useGetIngredientsQuery, useGetOrdersQuery } from '@services/store/api';

import styles from './feed.module.css';

export const FeedPage = (): React.JSX.Element => {
  const { isSuccess: isIngredientsSuccess, isLoading: isIngredientsLoading } =
    useGetIngredientsQuery();
  const { data: ordersData, isSuccess: isGetOrdersSuccess } = useGetOrdersQuery();

  const isLoading = isIngredientsLoading || Boolean(ordersData?.isWSLoading);

  return (
    <section className={styles.page}>
      <PageTitle>Лента заказов</PageTitle>

      {isLoading ? (
        <div className={`fullscreen-loader`}>
          <Preloader />
        </div>
      ) : isIngredientsSuccess && isGetOrdersSuccess && ordersData.success ? (
        <div className={`${styles.content}`}>
          <OrderFeedList orders={ordersData.orders} />
          <OrderFeedDashboard
            orders={ordersData.orders}
            total={ordersData.total}
            totalToday={ordersData.totalToday}
          />
        </div>
      ) : (
        <Text size="large" extraClass="mt-20">
          Не удалось получить данные
        </Text>
      )}
    </section>
  );
};
