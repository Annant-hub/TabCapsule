import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-rose-600 hover:bg-rose-500 text-white",
    secondary:
      "bg-slate-800 hover:bg-slate-700 text-slate-100",
    danger:
      "bg-red-600 hover:bg-red-500 text-white",
    ghost:
      "hover:bg-slate-800 text-slate-300",
  };

  return (
    <button
      {...props}
      className={`
        rounded-xl
        px-4
        py-2
        font-medium
        transition-all
        duration-200
        active:scale-95
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}