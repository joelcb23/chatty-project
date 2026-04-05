import React from "react";
import { NavLink } from "react-router-dom";

const ItemBar = ({
  children,
  onClick,
  className,
  url,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  url: string;
}) => {
  return (
    <li
      className={`hover:bg-slate-700 transition-all duration-300 ease-linear rounded-lg ${className}`}
    >
      <NavLink
        to={url}
        className="flex flex-col items-center px-5 py-2 gap-2"
        onClick={onClick}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default ItemBar;
