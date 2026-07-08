import type { InputHTMLAttributes } from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      className={`
        w-full
        rounded-xl
        border
        border-slate-700
        bg-slate-950
        px-4
        py-3
        text-slate-100
        placeholder:text-slate-500
        outline-none
        transition-all
        focus:border-rose-500
        focus:ring-2
        focus:ring-rose-500/20
        ${className}
      `}
    />
  );
}