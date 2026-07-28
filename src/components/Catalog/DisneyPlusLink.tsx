import styles from './DisneyPlusLink.module.css';

interface DisneyPlusLinkProps {
  href: string;
  title: string;
  onCopied: (title: string) => void;
}

export function DisneyPlusLink({ href, title, onCopied }: DisneyPlusLinkProps) {
  const handleClick = () => {
    navigator.clipboard?.writeText(title).catch(() => {});
    onCopied(title);
  };

  return (
    <a className={styles.dpLink} data-dp-link href={href} onClick={handleClick}>
      ▶ Disney+
    </a>
  );
}
