import { useCreateOrderMutation } from '@/api/order';
import {
  clearBurgerConstructor,
  selectBun,
  selectBurgerIngredients,
  selectTotalCost,
} from '@/store/slices/burger-constructor.ts';
import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from '@components/modal/modal.tsx';
import { OrderDetails } from '@components/order-details/order-details.tsx';

import styles from './burger-constructor-order.module.css';

type TBurgerConstructorOrderProps = {
  className?: string;
};

export const BurgerConstructorOrder = ({
  className = '',
}: TBurgerConstructorOrderProps): React.JSX.Element => {
  const dispatch = useDispatch();
  const totalCost = useSelector(selectTotalCost);
  const burgerBun = useSelector(selectBun);
  const burgerIngredients = useSelector(selectBurgerIngredients);
  const [createOrder, { reset, isLoading }] = useCreateOrderMutation();

  const [state, setState] = useState({
    orderId: null as number | null,
    isProcessing: false,
    error: '',
    isModalVisible: false,
  });

  const isSubmitButtonDisabled = useMemo(
    () =>
      burgerBun == null ||
      burgerIngredients.length === 0 ||
      isLoading ||
      state.isProcessing,
    [burgerBun, burgerIngredients, isLoading, state.isProcessing]
  );

  const handleSubmitOrder = (): void => {
    if (!isSubmitButtonDisabled) {
      setState((prev) => ({ ...prev, error: '', isProcessing: true }));

      const ingredients: string[] = [
        burgerBun!._id,
        ...burgerIngredients.map((ingredient) => ingredient._id),
        burgerBun!._id,
      ];

      createOrder({ ingredients })
        .unwrap()
        .then((response) => {
          setState((prev) => ({
            ...prev,
            orderId: response.order.number,
            isModalVisible: true,
          }));
        })
        .catch((_e) => {
          setState((prev) => ({
            ...prev,
            error: 'Произошла ошибка при создании заказа',
          }));
        })
        .finally(() => {
          setState((prev) => ({ ...prev, isProcessing: false }));
        });
    }
  };

  const handleModalClose = (): void => {
    setState((prev) => ({ ...prev, isModalVisible: false }));
    dispatch(clearBurgerConstructor());
    reset();
  };

  const { orderId, error, isModalVisible } = state;

  return (
    <>
      <div className={`${className} ${styles.controls}`}>
        <output className={`text text_type_digits-medium ${styles.cost}`}>
          {totalCost}
          <CurrencyIcon type="primary" className={`${styles.cost_icon}`} />
        </output>

        <Button
          disabled={isSubmitButtonDisabled}
          htmlType="button"
          size="large"
          onClick={handleSubmitOrder}
        >
          Оформить заказ
        </Button>
      </div>

      {error && <p className={` ${styles.error}`}>{error}</p>}

      {isModalVisible && orderId != null && (
        <Modal onClose={handleModalClose}>
          <OrderDetails orderId={orderId} />
        </Modal>
      )}
    </>
  );
};
