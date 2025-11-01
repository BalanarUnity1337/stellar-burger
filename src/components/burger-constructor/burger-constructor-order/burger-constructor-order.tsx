import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { Modal } from '@components/modal/modal.tsx';
import { OrderDetails } from '@components/order-details/order-details.tsx';

import styles from './burger-constructor-order.module.css';

type TBurgerConstructorOrderProps = {
  totalCost: number;
  className?: string;
};

export const BurgerConstructorOrder = ({
  totalCost = 0,
  className = '',
}: TBurgerConstructorOrderProps): React.JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleSubmitOrder = (): void => {
    setIsModalVisible(true);
  };

  const handleModalClose = (): void => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className={`${className} ${styles.controls}`}>
        <output className={`text text_type_digits-medium ${styles.cost}`}>
          {totalCost}
          <CurrencyIcon type="primary" className={`${styles.cost_icon}`} />
        </output>

        <Button htmlType="button" size="large" onClick={handleSubmitOrder}>
          Оформить заказ
        </Button>
      </div>

      {isModalVisible && (
        <Modal onClose={handleModalClose}>
          <OrderDetails orderId="034536" />
        </Modal>
      )}
    </>
  );
};
