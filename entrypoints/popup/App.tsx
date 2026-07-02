import "./App.css";

import { useSessions } from "../../src/features/session/hooks";
import { SaveWorkspaceButton } from "../../src/features/session/components/SaveWorkspaceButton";
import { SessionList } from "../../src/features/session/components/SessionList";
import { SearchBox } from "../../src/features/session/components/SearchBox";
function App() {
  
  const session = useSessions();
  
  return (
    <main className="w-[420px] min-h-[600px] p-4 bg-white">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">
          TabCapsule
        </h1>

        <p className="text-gray-500 text-sm">
          Save and restore browser workspaces
        </p>
      </header>

      <section className="mb-8">
        <SaveWorkspaceButton
          saveWorkspace={session.saveWorkspace}
        />
      </section>

      <section>
        <h2 className="font-semibold mb-4">
          Saved Workspaces
        </h2>

        <SearchBox
  onSearch={session.search}
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