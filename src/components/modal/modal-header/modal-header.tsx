import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './modal-header.module.css';

type TModalHeaderProps = {
  title?: string;
  onClose: () => void;
};

export const ModalHeader = ({
  title,
  onClose,
}: TModalHeaderProps): React.JSX.Element => {
  return (
    <div className={`${styles.header}`}>
      {title && <h3 className={`text text_type_main-large`}>{title}</h3>}

      <button
        className={`${styles.close_btn}`}
        data-cy="modal-close-button"
        type="button"
        onClick={onClose}
      >
        <CloseIcon type="primary" />
      </button>
    </div>
  );
};
