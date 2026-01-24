import { createFeedOrderPageRoute } from '@/router';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useLocation, useNavigate } from 'react-router';

import { OrderFeedDashboard } from '@components/order-feed/order-feed-dashboard/order-feed-dashboard.tsx';
import { OrderFeedList } from '@components/order-feed/order-feed-list/order-feed-list.tsx';
import { PageTitle } from '@components/ui/page-title/page-title.tsx';
import { Text } from '@components/ui/text/text.tsx';
import { useGetIngredientsQuery, useGetFeedOrdersQuery } from '@services/store/api';
import { useAppSelector } from '@services/store/hooks.ts';
import { feedOrdersSelectors } from '@services/store/selectors';

import type { TOrderDetails } from '@shared/types/entities.ts';

import styles from './feed.module.css';

export const FeedPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isSuccess: isIngredientsSuccess, isLoading: isIngredientsLoading } =
    useGetIngredientsQuery();

  const { data: ordersData, isSuccess: isOrdersSuccess } = useGetFeedOrdersQuery();
  const orders = useAppSelector(feedOrdersSelectors.selectAll);

  const isLoading = isIngredientsLoading || Boolean(ordersData?.isWSLoading);
  const isSuccess =
    isIngredientsSuccess && isOrdersSuccess && ordersData.success && orders.length > 0;

  const onOrderClick = (order: TOrderDetails): void => {
    void navigate(createFeedOrderPageRoute(order.number), {
      state: { background: location },
    });
  };

  return (
    <section className={styles.page}>
      <PageTitle>Лента заказов</PageTitle>

      {isLoading ? (
        <div className={`content-preloader`}>
          <Preloader />
        </div>
      ) : isSuccess ? (
        <div className={`${styles.content}`}>
          <OrderFeedList orders={orders} orderCardProps={{ onClick: onOrderClick }} />
          <OrderFeedDashboard
            orders={orders}
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
