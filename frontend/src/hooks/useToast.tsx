import React from "react";
import { Toast, ToastType } from "../components/atoms/Toast";

interface ToastState {
  message: string;
  type: ToastType;
  visible: boolean;
}

const ToastContext = React.createContext<{
  showToast: (message: string, type?: ToastType, onClose?: () => void) => void;
} | null>(null);

export const ToastProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement | null => {
  const [toast, setToast] = React.useState<ToastState>({
    message: "",
    type: "success",
    visible: false,
  });
  const [externalOnClose, setExternalOnClose] = React.useState<
    (() => void) | undefined
  >(undefined);

  const showToast = (
    message: string,
    type: ToastType = "success",
    onClose?: () => void
  ) => {
    setToast({ message, type, visible: true });
    setExternalOnClose(() => onClose);
  };

  const handleClose = () => {
    setToast((t) => ({ ...t, visible: false }));
    if (externalOnClose) externalOnClose();
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleClose}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = React.useContext(ToastContext);

  if (!ctx) throw new Error("useToast must be used within ToastProvider");

  return ctx;
};
