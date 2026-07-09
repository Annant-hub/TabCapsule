interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

      <div
        className="
          w-[90%]
          max-w-sm
          rounded-2xl
          border
          border-slate-700
          bg-slate-900
          p-6
          shadow-2xl
        "
      >
        <h2 className="mb-2 text-xl font-semibold text-white">
          {title}
        </h2>

        <p className="mb-6 whitespace-pre-line text-sm text-slate-300">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="
              rounded-lg
              border
              border-slate-600
              px-4
              py-2
              text-slate-300
              transition
              hover:bg-slate-800
            "
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="
              rounded-lg
              bg-red-600
              px-4
              py-2
              text-white
              transition
              hover:bg-red-700
            "
          >
            {confirmText}
          </button>
        </div>
      </div>

    </div>
  );
}