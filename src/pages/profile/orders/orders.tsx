import { createProfileOrderPageRoute } from '@/router';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useLocation, useNavigate } from 'react-router';

import { OrderFeedList } from '@components/order-feed/order-feed-list/order-feed-list.tsx';
import { Text } from '@components/ui/text/text.tsx';
import { useGetIngredientsQuery, useGetUserOrdersQuery } from '@services/store/api';
import { useAppSelector } from '@services/store/hooks.ts';
import { userOrdersSelectors } from '@services/store/selectors';

import type { TOrderDetails } from '@shared/types/entities.ts';

export const ProfileOrdersPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isSuccess: isIngredientsSuccess, isLoading: isIngredientsLoading } =
    useGetIngredientsQuery();

  const { data: ordersData, isSuccess: isOrdersSuccess } = useGetUserOrdersQuery();
  const orders = useAppSelector(userOrdersSelectors.selectAll);

  const onOrderClick = (order: TOrderDetails): void => {
    void navigate(createProfileOrderPageRoute(order.number), {
      state: { background: location },
    });
  };

  const isLoading = isIngredientsLoading || Boolean(ordersData?.isWSLoading);

  if (isLoading) {
    return (
      <div className={`content-preloader`}>
        <Preloader />
      </div>
    );
  }

  const isSuccess =
    isIngredientsSuccess && isOrdersSuccess && ordersData.success && orders.length > 0;

  if (isSuccess) {
    return (
      <OrderFeedList
        orders={orders}
        orderCardProps={{ onClick: onOrderClick, showStatus: true }}
      />
    );
  }

  return <Text size="large">Не удалось получить данные</Text>;
};
