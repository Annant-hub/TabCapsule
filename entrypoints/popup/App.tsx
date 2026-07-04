import "./App.css";

import { useSessions } from "../../src/features/session/hooks";
import { SaveWorkspaceButton } from "../../src/features/session/components/SaveWorkspaceButton";
import { SessionList } from "../../src/features/session/components/SessionList";
//import { SearchBox } from "../../src/features/session/components/SearchBox";
import { Toolbar } from "../../src/features/session/components/Toolbar";
import { useState } from "react";
function App() {
  
  const session = useSessions();
  
  const [filter, setFilter] = useState<"all" | "favorites">("all");

const [sort, setSort] = useState<
  "latest" |
  "oldest" |
  "name-asc" |
  "name-desc" |
  "most-restored"
>("latest");

  return (
    <main className="w-[420px] min-h-[600px] p-4 bg-white">
      <header className="mb-6 border-b pb-4">
  <h1 className="text-2xl font-bold tracking-tight text-gray-900">
    📦 TabCapsule
  </h1>

  <p className="mt-1 text-sm text-gray-500">
    Save and restore browser workspaces instantly
  </p>
</header>

      <section className="mb-6 rounded-xl border bg-gray-50 p-4 shadow-sm">
    <SaveWorkspaceButton
        saveWorkspace={session.saveWorkspace}
    />
</section>

      <section>
        <div className="mb-3 flex items-center justify-between">
    <h2 className="text-lg font-semibold">
        Saved Workspaces
    </h2>

    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
        {session.sessions.length}
    </span>
</div>

        <Toolbar
  onSearch={session.search}
  filter={filter}
  onFilterChange={(value) => {
    setFilter(value);
    session.filterFavorites(value === "favorites");
  }}
  sort={sort}
  onSortChange={(value) => {
  setSort(value);
  session.sortSessions(value);
}}  
/>


        <SessionList
          sessions={session.sessions}
          loading={session.loading}
          restoreWorkspace={session.restoreWorkspace}
          deleteWorkspace={session.deleteWorkspace}
          renameWorkspace={session.renameWorkspace}
          toggleFavorite={session.toggleFavorite}
        />
      </section>
    </main>
  );
}

export default App;