import type { Session, BrowserTab } from "../models";
import { useState } from "react";
import { TabPreviewList } from "./TabPreviewList";

interface SessionCardProps {
  session: Session;
  tabs: BrowserTab[];

  onRestore: (id: string) => void;
  onDelete: (id: string) => void;
  onFavorite: (id: string) => void;
  onRename: (id: string, newName: string) => void;
}

export function SessionCard({
  session,
  tabs,
  onRestore,
  onDelete,
  onFavorite,
  onRename,
}: SessionCardProps) {
  console.log(session.name, tabs);
   const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border p-4 shadow-sm flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{session.name}</h3>

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
        onClick={() => setExpanded(!expanded)}
        className="text-blue-600 text-sm hover:underline">
       {expanded ? "▲ Hide Tabs" : "▼ Show Tabs"}
        </button>

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

      {expanded && (
      <TabPreviewList tabs={tabs} />
      )}
      
    </div>
  );
}