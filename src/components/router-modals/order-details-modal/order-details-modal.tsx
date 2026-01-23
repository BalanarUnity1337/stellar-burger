import { useNavigate, useParams } from 'react-router';

import { Modal } from '@components/modal/modal.tsx';
import { OrderDetails } from '@components/order-feed/order-details/order-details.tsx';
import { useAppSelector } from '@services/store/hooks.ts';
import { feedOrdersSelectors, userOrdersSelectors } from '@services/store/selectors';

export const OrderDetailsModal = (): React.JSX.Element | null => {
  const navigate = useNavigate();
  const { id: orderNumber } = useParams<{ id: string }>();

  const feedOrder = useAppSelector((state) =>
    feedOrdersSelectors.selectById(state, Number(orderNumber))
  );

  const userOrder = useAppSelector((state) =>
    userOrdersSelectors.selectById(state, Number(orderNumber))
  );

  const order = feedOrder || userOrder;

  return (
    order && (
      <Modal title={`Заказ #${order.number}`} onClose={() => void navigate(-1)}>
        <OrderDetails order={order} showOrderNumber={false} />
      </Modal>
    )
  );
};
