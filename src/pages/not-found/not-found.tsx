import { RouterPaths } from '@/router';
import { Button } from '@krgaa/react-developer-burger-ui-components';
import { useNavigate } from 'react-router';

import { Text } from '@components/ui/text/text.tsx';

import styles from './not-found.module.css';

export const NotFoundPage = (): React.JSX.Element => {
  const navigate = useNavigate();

  const backToHome = (): void => {
    void navigate(RouterPaths.home, { replace: true });
  };

  return (
    <section className={`${styles.notFound}`}>
      <div className={`${styles.code}`}>404</div>

      <Text size="large" extraClass={`${styles.text}`}>
        Страница не найдена
      </Text>

      <Button
        htmlType="button"
        type="primary"
        size="medium"
        extraClass="mt-10"
        onClick={backToHome}
      >
        Вернуться на главную
      </Button>
    </section>
  );
};
