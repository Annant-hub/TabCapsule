import { useState } from "react";
import { useSessions } from "../hooks";

export function SaveWorkspaceButton() {
  const { saveWorkspace } = useSessions();

  const [sessionName, setSessionName] = useState("");

  async function handleSave() {
    if (!sessionName.trim()) {
      alert("Please enter a workspace name.");
      return;
    }

    await saveWorkspace(sessionName);

    setSessionName("");
  }

  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Workspace Name"
        value={sessionName}
        onChange={(e) => setSessionName(e.target.value)}
        className="border rounded-lg px-3 py-2"
      />

      <button
        onClick={handleSave}
        className="rounded-lg bg-blue-600 text-white py-2 hover:bg-blue-700"
      >
        Save Workspace
      </button>
    </div>
  );
}