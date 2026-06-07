/**
 * A reusable, styled input component with optional label, error message,
 * and helper text. Designed as a controlled input using React's standard
 * `value` + `onChange` pattern.
 *
 * This component extends all native <input> props except `value`, which is
 * redefined to accept only `string | null` for consistency across forms.
 *
 * Features:
 * - Optional label displayed above the input
 * - Error state with red border + error message
 * - Helper text shown when no error is present
 * - Dark mode–friendly styling
 * - Forwards ref to the underlying <input>
 *
 * Props:
 * @param {string} [label]        Optional label text displayed above the input
 * @param {string} [error]        Error message; also triggers error styling
 * @param {string} [helperText]   Helper text shown when no error is present
 * @param {string|null} [value]   Controlled input value
 * @param {string} [className]    Additional Tailwind classes
 * @param {...React.InputHTMLAttributes<HTMLInputElement>} props
 *                                 All other native input props (except `value`)
 */

import React from "react";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
  label?: string;
  error?: string;
  helperText?: string;
  value?: string | null;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, value, className = "", ...props }, ref) => {
    const baseClasses =
      "appearance-none block w-full px-4 py-3 bg-white dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
    const errorClass = error
      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
      : "";
    const finalClasses = `${baseClasses} ${errorClass} ${className}`;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}

        <input
          ref={ref}
          className={finalClasses}
          {...props}
          value={value ?? ""}
        />

        {error && (
          <p className="mt-1 text-sm text-red-600 ms-3">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
