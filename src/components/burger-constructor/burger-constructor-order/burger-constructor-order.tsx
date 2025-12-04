import { RouterPaths } from '@/router';
import {
  Button,
  CurrencyIcon,
  Preloader,
} from '@krgaa/react-developer-burger-ui-components';
import { useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { Modal } from '@components/modal/modal.tsx';
import { OrderDetails } from '@components/order-details/order-details.tsx';
import { Text } from '@components/ui/text/text.tsx';
import { useCreateOrderMutation } from '@services/store/api';
import { selectIsAuthenticated } from '@services/store/slices/auth.ts';
import {
  clearBurgerConstructor,
  selectBun,
  selectBurgerIngredients,
  selectTotalCost,
} from '@services/store/slices/burger-constructor.ts';

import styles from './burger-constructor-order.module.css';

type TBurgerConstructorOrderProps = {
  className?: string;
};

type TOrderState = {
  orderId: number | null;
  error: string;
  isProcessing: boolean;
  isModalVisible: boolean;
};

type TPayloadAction =
  | { type: 'ORDER_REQUEST' }
  | { type: 'ORDER_SUCCESS'; payload: number }
  | { type: 'ORDER_ERROR'; payload: string }
  | { type: 'CLOSE_MODAL' };

const orderReducer = (state: TOrderState, action: TPayloadAction): TOrderState => {
  switch (action.type) {
    case 'ORDER_REQUEST': {
      return { ...state, isProcessing: true, isModalVisible: true };
    }
    case 'ORDER_SUCCESS': {
      return { ...state, orderId: action.payload, isProcessing: false };
    }
    case 'ORDER_ERROR': {
      return { ...state, error: action.payload, isProcessing: false };
    }
    case 'CLOSE_MODAL': {
      return { ...state, isModalVisible: false };
    }
    default: {
      return state;
    }
  }
};

export const BurgerConstructorOrder = ({
  className = '',
}: TBurgerConstructorOrderProps): React.JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const totalCost = useSelector(selectTotalCost);
  const burgerBun = useSelector(selectBun);
  const burgerIngredients = useSelector(selectBurgerIngredients);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [createOrder, { reset, isLoading }] = useCreateOrderMutation();

  const [state, stateReducer] = useReducer(orderReducer, {
    orderId: null as number | null,
    isProcessing: false,
    error: '',
    isModalVisible: false,
  });

  const isSubmitButtonDisabled =
    burgerBun == null ||
    burgerIngredients.length === 0 ||
    isLoading ||
    state.isProcessing;

  const handleSubmitOrder = async (): Promise<void> => {
    if (!isSubmitButtonDisabled) {
      stateReducer({ type: 'ORDER_REQUEST' });
      dispatch(clearBurgerConstructor());

      const ingredients: string[] = [
        burgerBun._id,
        ...burgerIngredients.map((ingredient) => ingredient._id),
        burgerBun._id,
      ];

      try {
        const data = await createOrder({ ingredients }).unwrap();

        if (data.success) {
          stateReducer({ type: 'ORDER_SUCCESS', payload: data.order.number });
        } else {
          stateReducer({
            type: 'ORDER_ERROR',
            payload: 'Произошла ошибка при создании заказа',
          });
        }
      } catch (e) {
        stateReducer({
          type: 'ORDER_ERROR',
          payload: 'Произошла ошибка при создании заказа',
        });

        console.error(e);
      }
    }
  };

  const onSubmit = (): void => {
    if (!isAuthenticated) {
      void navigate(RouterPaths.login, { state: { redirect: location.pathname } });

      return;
    }

    void handleSubmitOrder();
  };

  const handleModalClose = (): void => {
    stateReducer({ type: 'CLOSE_MODAL' });

    reset();
  };

  const { orderId, isProcessing, error } = state;

  const getModalContent = (): React.ReactElement | null => {
    if (isProcessing) {
      return (
        <>
          <Text color="primary" size="large" extraClass={`mb-10`}>
            Оформляем заказ
          </Text>

          <Preloader />
        </>
      );
    }

    if (error) {
      return (
        <Text color="error" size="medium">
          {error}
        </Text>
      );
    }

    if (orderId != null) {
      return <OrderDetails orderId={orderId} />;
    }

    return null;
  };

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
          onClick={onSubmit}
        >
          {isProcessing ? 'Оформление заказа' : 'Оформить заказ'}
        </Button>
      </div>

      {state.isModalVisible && (
        <Modal onClose={handleModalClose}>{getModalContent()}</Modal>
      )}
    </>
  );
};
