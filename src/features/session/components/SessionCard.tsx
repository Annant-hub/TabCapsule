import { useState } from "react";
import type {
  Session,
  BrowserTab,
  RestoreMode,
} from "../models";

import { TabPreviewList } from "./TabPreviewList";

interface SessionCardProps {
  session: Session;
  tabs: BrowserTab[];

  onRestore: (
    id: string,
    mode: RestoreMode
  ) => void;

  onDelete: (id: string) => void;
  onFavorite: (id: string) => void;
  onRename: (
    id: string,
    newName: string
  ) => void;
}

export function SessionCard({
  session,
  tabs,
  onRestore,
  onDelete,
  onFavorite,
  onRename,
}: SessionCardProps) {
  const [expanded, setExpanded] = useState(false);

  const [restoreInNewWindow, setRestoreInNewWindow] =
    useState(false);

  return (
    <div className="rounded-lg border p-4 shadow-sm flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-start justify-between">

        <div className="flex-1">

          <h3 className="font-semibold text-lg">
            {session.name}
          </h3>

          {/* Favicons */}
          <div className="mt-3 flex items-center gap-2">

            {tabs.slice(0, 6).map((tab) => {
              const favicon =
                tab.faviconUrl ||
                `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(
                  tab.url
                )}&sz=64`;

              return (
                <img
                  key={tab.id}
                  src={favicon}
                  alt={tab.title}
                  title={tab.title}
                  className="h-6 w-6 rounded border border-gray-200 bg-white"
                  onError={(e) => {
                    e.currentTarget.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect width='32' height='32' rx='6' fill='%23e5e7eb'/%3E%3C/svg%3E";
                  }}
                />
              );
            })}

            {tabs.length > 6 && (
              <span className="text-xs text-gray-500">
                +{tabs.length - 6}
              </span>
            )}

          </div>

        </div>

        <button
          onClick={() => onFavorite(session.id)}
          className="text-xl"
          title="Favorite Workspace"
        >
          {session.favorite ? "⭐" : "☆"}
        </button>

      </div>

      {/* Information */}

      <div className="text-sm text-gray-600 space-y-1">

        <p>
          <strong>Tabs:</strong> {session.tabCount}
        </p>

        <p>
          <strong>Last Opened:</strong>{" "}
          {session.lastOpened ?? "Never"}
        </p>

        <p>
          <strong>Restored:</strong>{" "}
          {session.restoreCount} times
        </p>

      </div>

      {/* Restore Option */}

      <label className="flex items-center gap-2 text-sm text-gray-600">

        <input
          type="checkbox"
          checked={restoreInNewWindow}
          onChange={(e) =>
            setRestoreInNewWindow(
              e.target.checked
            )
          }
          className="h-4 w-4"
        />

        Open in new window

      </label>

      {/* Action Buttons */}

      <div className="flex gap-2 flex-wrap">

        <button
          onClick={() =>
            onRestore(
              session.id,
              restoreInNewWindow
                ? "new-window"
                : "current-window"
            )
          }
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
              newName.trim() &&
              newName !== session.name
            ) {
              onRename(
                session.id,
                newName.trim()
              );
            }
          }}
          className="rounded bg-yellow-500 text-white px-3 py-1"
        >
          Rename
        </button>

        <button
          onClick={() =>
            onDelete(session.id)
          }
          className="rounded bg-red-600 text-white px-3 py-1"
        >
          Delete
        </button>

      </div>

      {/* Show Tabs */}

      <button
        onClick={() =>
          setExpanded(!expanded)
        }
        className="text-blue-600 text-sm hover:underline self-start"
      >
        {expanded
          ? "▲ Hide Tabs"
          : "▼ Show Tabs"}
      </button>

      {/* Tab Preview */}

      {expanded && (
        <TabPreviewList tabs={tabs} />
      )}

    </div>
  );
}