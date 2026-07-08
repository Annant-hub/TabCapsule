import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function IconButton({
  children,
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      className={`
        rounded-lg
        p-2
        text-slate-400
        transition-all
        hover:bg-slate-800
        hover:text-white
        active:scale-95
        ${className}
      `}
    >
      {children}
    </button>
  );
}
