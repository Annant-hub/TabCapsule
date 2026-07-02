import { SessionCard } from "./SessionCard";
import { useSessions } from "../hooks";

export function SessionList() {
  const {
    sessions,
    loading,
    restoreWorkspace,
    deleteWorkspace,
    renameWorkspace,
    toggleFavorite,
  } = useSessions();

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

  return (
    <div className="flex flex-col gap-4">
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          onRestore={restoreWorkspace}
          onDelete={deleteWorkspace}
          onRename={renameWorkspace}
          onFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}