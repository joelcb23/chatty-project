import React, { forwardRef, useId } from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: string;
}
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, type = "text", className, errors, ...props }, ref) => {
    const errorId = useId();
    return (
      <div className="w-full flex flex-col">
        <input
          name={name}
          type={type}
          ref={ref}
          className={`w-full text-lg mb-1 bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-white py-3 px-5 outline-none rounded-lg ${className}`}
          {...props}
          aria-invalid={errors ? "true" : "false"}
          aria-describedby={errors ? errorId : undefined}
        />
        {/* Span for error */}
        {errors && (
          <span id={errorId} className="text-red-500 text-sm">
            {errors}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
