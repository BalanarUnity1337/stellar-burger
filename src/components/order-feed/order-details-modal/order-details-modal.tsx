import { useNavigate, useParams } from 'react-router';

import { Modal } from '@components/modal/modal.tsx';
import { OrderDetails } from '@components/order-feed/order-details/order-details.tsx';
import { useGetOrdersQuery } from '@services/store/api';

export const OrderDetailsModal = (): React.JSX.Element | null => {
  const navigate = useNavigate();
  const { id: orderNumber } = useParams<{ id: string }>();

  const { data } = useGetOrdersQuery();

  const order =
    data?.orders.find((order) => String(order.number) === orderNumber) ?? null;

  return (
    order && (
      <Modal title={`Заказ #${order.number}`} onClose={() => void navigate(-1)}>
        <OrderDetails order={order} showOrderNumber={false} />
      </Modal>
    )
  );
};
