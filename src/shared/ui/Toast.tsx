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
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 rounded-lg px-4 py-2 text-white shadow-lg ${
        type === "success"
          ? "bg-green-600"
          : "bg-red-600"
      }`}
    >
      {message}
    </div>
  );
}
