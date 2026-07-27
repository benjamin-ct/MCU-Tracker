// Ported from the .dp-link markup + the document-level click handler in
// js/platform.js. No preventDefault(): the <a href> must navigate normally for iOS's
// Universal Link interception to fire — the clipboard write is a fire-and-forget side
// effect that doesn't block navigation. `href` comes from the platform-deep-link hook
// (task #26); onCopied lets the caller show a toast without this component knowing
// about the toast system.
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
    <a className="dp-link" href={href} onClick={handleClick}>
      ▶ Disney+
    </a>
  );
}
