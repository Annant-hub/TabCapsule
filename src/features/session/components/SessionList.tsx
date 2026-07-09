import { useState } from "react";

import type { Session, BrowserTab } from "../models";

import { SessionCard } from "./SessionCard";

import { ConfirmDialog } from "../../../shared/ui";

interface SessionListProps {
  sessions: Session[];
  loading: boolean;
  tabs: BrowserTab[];

  restoreWorkspace: (id: string) => Promise<void>;
  deleteWorkspace: (id: string) => Promise<void>;

  renameWorkspace: (
    id: string,
    newName: string
  ) => Promise<void>;

  toggleFavorite: (id: string) => Promise<void>;
}

export function SessionList({
  sessions,
  loading,
  tabs,
  restoreWorkspace,
  deleteWorkspace,
  renameWorkspace,
  toggleFavorite,
}: SessionListProps) {

  const [sessionToDelete, setSessionToDelete] =
    useState<Session | null>(null);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        Loading...
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        No saved workspaces.
      </div>
    );
  }

  const tabsBySession = tabs.reduce(
    (acc, tab) => {
      if (!acc[tab.sessionId]) {
        acc[tab.sessionId] = [];
      }

      acc[tab.sessionId].push(tab);

      return acc;
    },
    {} as Record<string, BrowserTab[]>
  );

  return (
    <>
      <div className="flex flex-col gap-4">
        {sessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            tabs={tabsBySession[session.id] ?? []}
            onRestore={restoreWorkspace}
            onRename={renameWorkspace}
            onFavorite={toggleFavorite}

            onDelete={() =>
              setSessionToDelete(session)
            }
          />
        ))}
      </div>

      <ConfirmDialog
        open={sessionToDelete !== null}
        title="Delete Workspace"
        message={
          sessionToDelete
            ? `Are you sure you want to delete "${sessionToDelete.name}"?\n\nThis action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={async () => {
          if (!sessionToDelete) return;

          await deleteWorkspace(sessionToDelete.id);

          setSessionToDelete(null);
        }}
        onCancel={() => setSessionToDelete(null)}
      />
    </>
  );
}