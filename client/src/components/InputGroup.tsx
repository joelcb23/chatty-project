import React from "react";

const InputGroup = ({
  children,
  className,
  label,
  name,
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
  name?: string;
}) => {
  return (
    <p className={`flex flex-col items-start justify-center ${className}`}>
      {label && (
        <label htmlFor={name} className={`text-lg`}>
          {label}
        </label>
      )}
      {children}
    </p>
  );
};

export default InputGroup;
