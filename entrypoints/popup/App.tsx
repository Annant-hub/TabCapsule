// 

import "./App.css";

// import { SaveWorkspaceButton } from "@/features/session/components/SaveWorkspaceButton";
// import { SessionList } from "@/features/session/components/SessionList";


import { SaveWorkspaceButton } from "../../src/features/session/components/SaveWorkspaceButton";
import { SessionList } from "../../src/features/session/components/SessionList";

function App() {
  return (
    <main className="min-w-[420px] min-h-[600px] p-4 bg-white">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">
          TabCapsule
        </h1>

        <p className="text-gray-500 text-sm">
          Save and restore browser workspaces
        </p>
      </header>

      <section className="mb-8">
        <SaveWorkspaceButton />
      </section>

      <section>
        <h2 className="font-semibold mb-4">
          Saved Workspaces
        </h2>

        <SessionList />
      </section>
    </main>
  );
}

export default App;