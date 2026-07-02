import type { Session } from "../models";

interface SessionCardProps {
  session: Session;

  onRestore: (id: string) => void;
  onDelete: (id: string) => void;
  onFavorite: (id: string) => void;
  onRename: (id: string, newName: string) => void;
}

export function SessionCard({
  session,
  onRestore,
  onDelete,
  onFavorite,
  onRename,
}: SessionCardProps) {
  return (
    <div className="rounded-lg border p-4 shadow-sm flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{session.name}</h3>

          <p className="text-sm text-gray-500">
            {session.tabCount} Tabs
          </p>
        </div>

        <button
          onClick={() => onFavorite(session.id)}
          className="text-xl"
        >
          {session.favorite ? "⭐" : "☆"}
        </button>
      </div>

      <div className="text-xs text-gray-500">
        Last Opened: {session.lastOpened ?? "Never"}
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => onRestore(session.id)}
          className="rounded bg-green-600 text-white px-3 py-1"
        >
          Restore
        </button>

        <button
          onClick={() => {
            const newName = prompt(
              "Enter new workspace name",
              session.name
            );

            if (
              newName &&
              newName.trim() !== "" &&
              newName !== session.name
            ) {
              onRename(session.id, newName);
            }
          }}
          className="rounded bg-yellow-500 text-white px-3 py-1"
        >
          Rename
        </button>

        <button
          onClick={() => onDelete(session.id)}
          className="rounded bg-red-600 text-white px-3 py-1"
        >
          Delete
        </button>
      </div>
    </div>
  );
}