import React from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof colors;
  borderRadius?: string;
}

const colors = {
  primary: "bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-3",
  secondary:
    "bg-white hover:bg-neutral-200 text-purple-500 font-semibold px-4 py-3 border border-purple-500",
  danger: "bg-red-500 hover:bg-red-700 text-white font-semibold px-4 py-3",
};

const Button = ({
  children,
  className,
  variant = "primary",
  type = "button",
  borderRadius = "rounded-lg",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={[
        "text-xl transition-all duration-300 ease-linear",
        borderRadius,
        colors[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
