import { forwardRef, useState } from "react";
import "./index.scss";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = "", ...props }, ref) => {
    const [touched, setTouched] = useState(false);

    const [inputId] = useState(
      () => id || `input-${Math.random().toString(36).substring(2, 11)}`
    );

    const showError = touched && !!error;

    return (
      <div className={`input-wrapper ${className}`}>
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
          </label>
        )}

        <input
          id={inputId}
          ref={ref}
          className={`input ${showError ? "input-error" : ""}`}
          aria-invalid={showError}
          onBlur={(e) => {
            setTouched(true);
            props.onBlur?.(e);
          }}
          {...props}
        />

        {showError && <span className="input-error-message">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
