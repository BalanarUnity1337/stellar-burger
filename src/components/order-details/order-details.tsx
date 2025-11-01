import { OrderCheck } from '@components/icons/order-check/order-check.tsx';

import styles from './order-details.module.css';

type TOrderDetailsProps = {
  orderId: string;
};

export const OrderDetails = ({ orderId }: TOrderDetailsProps): React.JSX.Element => {
  return (
    <section className={`${styles.order_details}`}>
      <strong className={`text text_type_digits-large`}>{orderId}</strong>
      <p className={`text text_type_main-medium mt-8`}>идентификатор заказа</p>

      <div className={`${styles.icon}`}>
        <OrderCheck />
      </div>

      <p className={`text text_type_main-default`}>Ваш заказ начали готовить</p>
      <p className={`text text_type_main-default text_color_inactive mt-2`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </section>
  );
};
