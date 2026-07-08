interface ToastProps {
  open: boolean;
  message: string;
  type?: "success" | "error";
}

export function Toast({
  open,
  message,
  type = "success",
}: ToastProps) {
  if (!open) return null;

  return (
    <div
  className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl px-5 py-3 text-white shadow-2xl transition-all ${
    type === "success"
      ? "bg-emerald-600"
      : "bg-red-600"
  }`}
>
  {message}
</div>
      
  );
}
