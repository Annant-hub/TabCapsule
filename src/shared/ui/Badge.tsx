import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variants = {
    default:
      "bg-slate-800 text-slate-300 border-slate-700",

    success:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",

    warning:
      "bg-amber-500/10 text-amber-400 border-amber-500/20",

    danger:
      "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        border
        px-3
        py-1
        text-xs
        font-medium
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}