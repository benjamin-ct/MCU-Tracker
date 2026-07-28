import styles from './ProgressStrip.module.css';

interface ProgressStripProps {
  percentComplete: number;
}

export function ProgressStrip({ percentComplete }: ProgressStripProps) {
  const glow = percentComplete > 0 && percentComplete < 100;
  return (
    <div className={styles.strip}>
      <div className={styles.holes}/>
      <div className={styles.bar}>
        <div
          className={glow ? `${styles.fill} ${styles.glow}` : styles.fill}
          style={{width: `${percentComplete}%`}}
        />
      </div>
      <div className={styles.holes}/>
    </div>
  );
}
