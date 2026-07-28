import styles from './Toast.module.css';

interface ToastProps {
  message: string;
  visible: boolean;
}

export function Toast({ message, visible }: ToastProps) {
  return (
    <div className={visible ? `${styles.toast} ${styles.show}` : styles.toast}>
      {message}
    </div>
  );
}
