import type { Session, BrowserTab } from "../models";
import { SessionCard } from "./SessionCard";

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
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        Loading...
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
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
    <div className="flex flex-col gap-4">
      {sessions.map((session) => (
        <SessionCard
    key={session.id}
    session={session}
    tabs={tabsBySession[session.id] ?? []}
    onRestore={restoreWorkspace}
    onDelete={deleteWorkspace}
    onRename={renameWorkspace}
    onFavorite={toggleFavorite}
/>
      ))}
    </div>
  );

}