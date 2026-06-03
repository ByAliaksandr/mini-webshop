import type { ReactNode } from 'react';
import styles from './Header.module.scss';

type Props = {
  rightSlot?: ReactNode;
};

export const Header = ({ rightSlot }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.logo}>⚡</span>
        <h1 className={styles.title}>Mini Webshop</h1>
      </div>
      {rightSlot && <div className={styles.actions}>{rightSlot}</div>}
    </header>
  );
};
