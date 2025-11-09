import { forwardRef } from "react";
import "./index.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "cancel";
  loading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      loading = false,
      children,
      disabled,
      type,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type ?? "button"}
        className={`btn btn-${variant}`}
        disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {loading && <span className="spinner" aria-hidden="true" />}

        {children ? (
          <span className={loading ? "visually-hidden" : ""}>{children}</span>
        ) : (
          loading && <span className="visually-hidden">Carregando...</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
