// Ported from the #toast element + its show/hide class toggling in the legacy
// js/state.js. State (message/visible/auto-dismiss timer) lives in useToast; this is
// just the rendering.
interface ToastProps {
  message: string;
  visible: boolean;
}

export function Toast({ message, visible }: ToastProps) {
  return <div className={visible ? 'toast show' : 'toast'}>{message}</div>;
}
