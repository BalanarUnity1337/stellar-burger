import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalHeader } from '@components/modal/modal-header/modal-header.tsx';
import { ModalOverlay } from '@components/modal/modal-overlay/modal-overlay.tsx';

import styles from './modal.module.css';

type TModalProps = React.PropsWithChildren<{
  title?: string;
  onClose: () => void;
}>;

const modalsRoot = document.getElementById('modals');

export const Modal = ({ title, onClose, children }: TModalProps): React.JSX.Element => {
  const handleKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);

    return (): void => document.removeEventListener('keydown', handleKeydown);
  }, [onClose]);

  return createPortal(
    <>
      <ModalOverlay onClose={onClose} />

      <div className={`${styles.modal}`}>
        <ModalHeader title={title} onClose={onClose} />

        <div className={`${styles.content}`}>{children}</div>
      </div>
    </>,
    modalsRoot!
  );
};
