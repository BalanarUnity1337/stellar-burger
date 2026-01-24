import { Digits } from '@components/ui/digits/digits.tsx';
import { Text } from '@components/ui/text/text.tsx';

type TOrderFeedDashboardTotalProps = {
  count: number;
};

export const OrderFeedDashboardTotal = ({
  count,
}: TOrderFeedDashboardTotalProps): React.JSX.Element => {
  return (
    <section>
      <Text as="h2" size="medium">
        Выполнено за все время:
      </Text>

      <Digits size="large" glow formatted>
        {count}
      </Digits>
    </section>
  );
};
