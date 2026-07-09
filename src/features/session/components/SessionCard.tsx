import { useState } from "react";

import {
  Edit2,
  Star,
  Check,
  X,
  Clock3,
  ChevronDown,
  ChevronUp,
  Trash2,
  RotateCcw,
  
} from "lucide-react";

import {
  Card,
  Badge,
  IconButton,
  Input,
  Button,
  ConfirmDialog,
} from "../../../shared/ui";

import type {
  BrowserTab,
  RestoreMode,
  Session,
} from "../models";
import { TabPreviewList } from "./TabPreviewList";

interface SessionCardProps {
  session: Session;
  tabs: BrowserTab[];

  onRestore: (
    id: string,
    mode: RestoreMode
  ) => void;

  onDelete: () => void;

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

const [editing, setEditing] = useState(false);

const [editedName, setEditedName] = useState(session.name);

const [expanded, setExpanded] = useState(false);

const [restoreInNewWindow, setRestoreInNewWindow] =
  useState(false);


function restoreWorkspace() {
  onRestore(
    session.id,
    restoreInNewWindow ? "new-window" : "current-window"
  );
}

function togglePreview() {
  setExpanded((prev) => !prev);
}

function startRename() {
  setEditedName(session.name);
  setEditing(true);
}

function cancelRename() {
  setEditedName(session.name);
  setEditing(false);
}

function saveRename() {
  const value = editedName.trim();

  if (value && value !== session.name) {
    onRename(session.id, value);
  }

  setEditing(false);
}
return (
  <Card className="space-y-5 p-6">

    {/* Header */}
    {/* Header */}

<div className="flex items-start justify-between">

  <div className="flex-1">

    {/* Title */}

    <div className="flex items-center gap-2">

      {editing ? (
        <>
          <Input
            autoFocus
            value={editedName}
            onChange={(e) =>
              setEditedName(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveRename();
              }

              if (e.key === "Escape") {
                cancelRename();
              }
            }}
            className="flex-1"
          />

          <IconButton
            title="Save"
            onClick={saveRename}
          >
            <Check
              size={16}
              className="text-green-400"
            />
          </IconButton>

          <IconButton
            title="Cancel"
            onClick={cancelRename}
          >
            <X
              size={16}
              className="text-red-400"
            />
          </IconButton>
        </>
      ) : (
        <>
          <h3 className="text-xl font-bold tracking-tight text-white">
            {session.name}
          </h3>

          <IconButton
            title="Rename"
            onClick={startRename}
          >
            <Edit2 size={16} />
          </IconButton>
        </>
      )}

    </div>
        {/* Favicons */}

    <div className="mt-4 flex items-center gap-2">

      {tabs.slice(0, 5).map((tab) => {

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
            className="
              h-8
              w-8
              rounded-lg
              border
              border-slate-700
              bg-white
              transition-all
              duration-200
              hover:scale-110
              hover:border-rose-500
            "
            onError={(e) => {
              e.currentTarget.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect width='32' height='32' rx='6' fill='%23e5e7eb'/%3E%3C/svg%3E";
            }}
          />
        );
      })}

      {tabs.length > 5 && (
  <button
    onClick={togglePreview}
    title={
      expanded
        ? "Hide tabs"
        : "Show all tabs"
    }
    className="
      flex
      h-8
      min-w-[32px]
      items-center
      justify-center
      rounded-lg
      bg-slate-800
      px-2
      text-xs
      font-medium
      text-slate-300
      transition-all
      hover:bg-rose-500
      hover:text-white
    "
  >
    {expanded
      ? "−"
      : `+${tabs.length - 5}`}
  </button>
)}

    </div>

  </div>
  <IconButton
  title="Favorite workspace"
  onClick={() => onFavorite(session.id)}
  className="transition-all duration-200 hover:scale-110"
>
  <Star
    size={18}
    fill={session.favorite ? "currentColor" : "none"}
    className={
      session.favorite
        ? "text-amber-400"
        : "text-slate-500"
    }
  />
</IconButton>

<IconButton
  title="Delete workspace"
  onClick={onDelete}
  className="transition-all duration-200 hover:scale-110"
>
  <Trash2
    size={18}
    className="text-slate-500 hover:text-red-500"
  />
</IconButton>

</div>

   {/* Metadata */}

<div className="flex flex-wrap gap-2">
  <Badge>
    🌐 {session.tabCount} Tabs
  </Badge>

  <Badge>
    🔄 {session.restoreCount} Restores
  </Badge>
</div>

<div className="flex items-center gap-2 text-sm text-slate-400">
  <Clock3
    size={14}
    className="text-rose-400"
  />

  <span>
    {session.lastOpened
      ? new Date(session.lastOpened).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          }
        )
      : "Never opened"}
  </span>
</div>

<div className="h-px bg-slate-800/70" />
    

    {/* Restore Option */}

<label className="flex items-center gap-3 text-sm text-slate-300">

  <input
    type="checkbox"
    checked={restoreInNewWindow}
    onChange={(e) =>
      setRestoreInNewWindow(
        e.target.checked
      )
    }
    className="
      h-4
      w-4
      rounded
      accent-rose-500
    "
  />

  Restore in new window

</label>

<div className="flex flex-wrap gap-3">
  <Button
    onClick={restoreWorkspace}
    className="flex items-center gap-2 self-start"
  >
    Restore
  </Button>

  <Button
    variant="ghost"
    onClick={togglePreview}
    className="flex items-center gap-2 self-start"
  >
    {expanded ? (
      <>
        <ChevronUp size={16} />
        Hide Tabs
      </>
    ) : (
      <>
        <ChevronDown size={16} />
        Show Tabs
      </>
    )}
  </Button>
</div>

<div
  className={`
    overflow-hidden
    transition-all
    duration-300
    ${
      expanded
        ? "max-h-96 opacity-100"
        : "max-h-0 opacity-0"
    }
  `}
>
  <TabPreviewList tabs={tabs} />

 

</div>





  </Card>
);
}