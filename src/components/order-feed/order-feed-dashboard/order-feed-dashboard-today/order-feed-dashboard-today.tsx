import { Digits } from '@components/ui/digits/digits.tsx';
import { Text } from '@components/ui/text/text.tsx';

type TOrderFeedDashboardTodayProps = {
  count: number;
};

export const OrderFeedDashboardToday = ({
  count,
}: TOrderFeedDashboardTodayProps): React.JSX.Element => {
  return (
    <section>
      <Text as="h2" size="medium">
        Выполнено за сегодня:
      </Text>

      <Digits size="large" glow formatted>
        {count}
      </Digits>
    </section>
  );
};
