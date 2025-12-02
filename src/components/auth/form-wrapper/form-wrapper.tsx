import styles from './form-wrapper.module.css';

type TAuthFormProps = {
  title: string;
  children: React.ReactNode;
  slotButtons: React.ReactNode;
  slotFooter?: React.ReactNode;
  slotErrors?: React.ReactNode;
  onSubmit?: () => void | Promise<void>;
};

export const FormWrapper = ({
  title,
  children,
  slotButtons,
  slotFooter,
  slotErrors,
  onSubmit,
}: TAuthFormProps): React.JSX.Element => {
  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    void onSubmit?.();
  };

  return (
    <section className={`${styles.wrapper}`}>
      <header className={`${styles.header}`}>
        <h2 className={`${styles.title}`}>{title}</h2>
      </header>

      <form className={`${styles.form}`} onSubmit={handleSubmit}>
        <div className={`${styles.formInputs}`}>{children}</div>

        {slotErrors && <div className={`${styles.errors}`}>{slotErrors}</div>}

        <div className={`${styles.buttons}`}>{slotButtons}</div>
      </form>

      {slotFooter && <footer className={`${styles.footer}`}>{slotFooter}</footer>}
    </section>
  );
};
