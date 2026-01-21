import { useNavigate, useParams } from 'react-router';

import { Modal } from '@components/modal/modal.tsx';
import { OrderDetails } from '@components/order-feed/order-details/order-details.tsx';
import { ordersSelectors, useGetOrdersQuery } from '@services/store/api';
import { useAppSelector } from '@services/store/hooks.ts';

export const OrderDetailsModal = (): React.JSX.Element | null => {
  const navigate = useNavigate();
  const { id: orderNumber } = useParams<{ id: string }>();

  useGetOrdersQuery();
  const order = useAppSelector((state) =>
    ordersSelectors.selectById(state, Number(orderNumber))
  );

  return (
    order && (
      <Modal title={`Заказ #${order.number}`} onClose={() => void navigate(-1)}>
        <OrderDetails order={order} showOrderNumber={false} />
      </Modal>
    )
  );
};
