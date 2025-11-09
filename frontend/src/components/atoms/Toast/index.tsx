import { useEffect, useCallback } from "react";
import "./index.scss";

export type ToastType = "success" | "error";

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose?: () => void;
}

export function Toast({ message, type = "success", onClose }: ToastProps) {
  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(handleClose, 5000);
    return () => clearTimeout(timer);
  }, [handleClose]);

  const toastClass = `toast toast-${type}`;

  return (
    <div className={toastClass}>
      <span>{message}</span>

      {onClose && (
        <button
          className="toast-close"
          onClick={handleClose}
          aria-label="Fechar"
        >
          ×
        </button>
      )}
    </div>
  );
}
