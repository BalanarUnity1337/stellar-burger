import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useParams } from 'react-router';

import { OrderDetails } from '@components/order-feed/order-details/order-details.tsx';
import { Text } from '@components/ui/text/text.tsx';
import { useGetOrderByNumberQuery } from '@services/store/api';

import styles from './_id.module.css';

export const FeedOrderPage = (): React.JSX.Element | null => {
  const { id: orderNumber } = useParams<{ id: string }>();
  const { data, isLoading, isSuccess } = useGetOrderByNumberQuery(orderNumber!);

  if (isLoading) {
    return (
      <div className={`fullscreen-loader`}>
        <Preloader />;
      </div>
    );
  }

  return (
    <section className={`${styles.page}`}>
      {isSuccess && data != null ? (
        <OrderDetails order={data} />
      ) : (
        <Text size="large">Не удалось получить данные о заказе</Text>
      )}
    </section>
  );
};
