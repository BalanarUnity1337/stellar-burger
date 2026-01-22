import { useNavigate, useParams } from 'react-router';

import { Modal } from '@components/modal/modal.tsx';
import { OrderDetails } from '@components/order-feed/order-details/order-details.tsx';
import { ordersSelectors, userOrdersSelectors } from '@services/store/api';
import { useAppSelector } from '@services/store/hooks.ts';

export const OrderDetailsModal = (): React.JSX.Element | null => {
  const navigate = useNavigate();
  const { id: orderNumber } = useParams<{ id: string }>();

  const order = useAppSelector((state) =>
    ordersSelectors.selectById(state, Number(orderNumber))
  );

  const userOrder = useAppSelector((state) =>
    userOrdersSelectors.selectById(state, Number(orderNumber))
  );

  const foundOrder = order || userOrder;

  return (
    foundOrder && (
      <Modal title={`Заказ #${foundOrder.number}`} onClose={() => void navigate(-1)}>
        <OrderDetails order={foundOrder} showOrderNumber={false} />
      </Modal>
    )
  );
};
