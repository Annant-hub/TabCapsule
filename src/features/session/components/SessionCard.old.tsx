import { useState } from "react";
import {
  Edit2,
  Star,
  RotateCcw,
  Trash2,
  ChevronDown,
  ChevronUp,
  Clock3,
  Globe,
} from "lucide-react";

import {
  Card,
  Badge,
  Button,
  IconButton,
} from "../../../shared/ui";

import { TabPreviewList } from "./TabPreviewList";

import type {
  Session,
  BrowserTab,
  RestoreMode,
} from "../models";


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
  const [expanded, setExpanded] = useState(false);

  const [restoreInNewWindow, setRestoreInNewWindow] =
    useState(false);

  return (
   <Card
  className="
    space-y-5
    p-6
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-2xl
    hover:border-rose-500/30
  "
>

      {/* Header */}
      <div className="flex items-start justify-between">

        <div className="flex-1">

          <div className="flex items-center gap-2">

  <div className="flex items-center gap-2">

 <h3 className="text-xl font-bold tracking-tight text-slate-100">
    {session.name}
  </h3>

  <IconButton
    title="Rename workspace"
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
        onRename(session.id, newName.trim());
      }
    }}
  >
    <Edit2 size={16} />
  </IconButton>

</div>

</div>

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

            {tabs.length > 6 && (
              <Badge>
               +{tabs.length - 6}
              </Badge>
            )}

          </div>

        </div>

       <IconButton  className="transition-transform hover:scale-125"
  title="Favorite workspace"
  onClick={() => onFavorite(session.id)}
>
  <Star
    size={20}
    fill={session.favorite ? "currentColor" : "none"}
    className={
      session.favorite
        ? "text-amber-400"
        : "text-slate-500"
    }
  />
</IconButton>

      </div>

      {/* Metadata */}

<div className="flex flex-wrap gap-2">

  <Badge className="flex items-center gap-1">
    <Globe size={14} className="text-slate-300" />
    <span>{session.tabCount} Tabs</span>
  </Badge>

  <Badge className="flex items-center gap-1">
    <RotateCcw size={14} className="text-slate-300" />
    <span>{session.restoreCount} Restores</span>
  </Badge>

</div>

<div className="flex items-center gap-2 text-sm text-slate-400">
  <Clock3 size={14} className="text-rose-400" />

  <span>
    {session.lastOpened
      ? new Date(session.lastOpened).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
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
          className="h-4 w-4"
        />

        Open in new window

      </label>

      {/* Action Buttons */}

      <div className="grid grid-cols-2 gap-3">

  <Button
    onClick={() =>
      onRestore(
        session.id,
        restoreInNewWindow
          ? "new-window"
          : "current-window"
      )
    }
    className="flex items-center justify-center gap-1"
  >
    <RotateCcw size={16} />
    Restore
  </Button>

  <Button
    variant="danger"
    onClick={onDelete}
    className="flex items-center justify-center gap-2"
  >
    <Trash2 size={16} />
    Delete
  </Button>

</div>

      {/* Show Tabs */}

      <Button
  variant="ghost"
  onClick={() => setExpanded(!expanded)}
  className="flex items-center gap-1 self-start"
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

      {/* Tab Preview */}

      <div
  className={`
    overflow-auto
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