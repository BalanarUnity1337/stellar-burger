import { Text } from '@components/ui/text/text.tsx';

import type { TOrderDetails } from '@shared/types/entities.ts';

type TStatus = TOrderDetails['status'];

type TOrderStatusProps = {
  status: TStatus;
  extraClass?: string;
};

const StatusTranslates: Record<TStatus, string> = {
  created: 'Создан',
  pending: 'Готовится',
  done: 'Выполнен',
  reject: 'Отменен',
};

const StatusColors: Record<TStatus, 'success' | 'primary' | 'error'> = {
  created: 'primary',
  pending: 'primary',
  done: 'success',
  reject: 'error',
};

export const OrderStatus = ({
  status,
  extraClass = '',
}: TOrderStatusProps): React.JSX.Element => {
  return (
    <Text as="span" color={StatusColors[status]} extraClass={extraClass}>
      {StatusTranslates[status]}
    </Text>
  );
};
