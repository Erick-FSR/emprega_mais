import React from "react";

interface LogoProps {
  className?: string;
  variant?: "white" | "dark" | "green";
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  variant = "white",
  onClick,
  size = "md",
}) => {
  const colorClasses = {
    white: "text-white fill-white",
    dark: "text-neutral-900 fill-neutral-900",
    green: "text-[#10630f] fill-[#10630f]",
  }[variant];

  const sizeClasses = {
    sm: "text-xl tracking-tight",
    md: "text-2xl md:text-3xl tracking-tight",
    lg: "text-3xl md:text-4xl tracking-tight",
  }[size];

  const triangleSize = {
    sm: "w-3.5 h-4",
    md: "w-4 h-5 md:w-5 md:h-6",
    lg: "w-5 h-6 md:w-6 md:h-7",
  }[size];

  const plusSize = {
    sm: "text-2xl -ml-0.5",
    md: "text-3xl md:text-4xl -ml-0.5",
    lg: "text-4xl md:text-5xl -ml-0.5",
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center font-black select-none ${onClick ? "cursor-pointer" : ""} ${colorClasses} ${className}`}
      style={{ fontFamily: "'Poppins', sans-serif" }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label="EMPREGA+"
    >
      <span className={`${sizeClasses} uppercase font-extrabold`}>EMPREG</span>
      {/* Stylized 'A' as solid triangle */}
      <span className="inline-flex items-center justify-center px-0.5" aria-hidden="true">
        <svg viewBox="0 0 20 24" className={triangleSize} fill="currentColor">
          <polygon points="10,2 20,24 0,24" />
        </svg>
      </span>
      {/* Stylized '+' sign */}
      <span className={`font-black leading-none ${plusSize}`} aria-hidden="true">
        +
      </span>
    </div>
  );
};
