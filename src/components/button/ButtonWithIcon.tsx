import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const ButtonWithIcon: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  icon,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-[80%] max-w-[320px] py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition 
        ${className}`}
    >
      {icon}
      {children}
    </button>
  );
};

export default ButtonWithIcon;
