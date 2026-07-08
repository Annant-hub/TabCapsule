import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-slate-800
        bg-slate-900/50
        backdrop-blur-md
        shadow-lg
        transition-all
        duration-200
        hover:border-rose-500/20
        ${className}
      `}
    >
      {children}
    </div>
  );
}