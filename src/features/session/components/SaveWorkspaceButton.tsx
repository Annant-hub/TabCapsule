import { useState } from "react";

interface SaveWorkspaceButtonProps {
  saveWorkspace: (sessionName: string) => Promise<void>;
}

export function SaveWorkspaceButton({
  saveWorkspace,
}: SaveWorkspaceButtonProps) {
  const [sessionName, setSessionName] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!sessionName.trim()) {
      alert("Please enter a workspace name.");
      return;
    }

    if (saving) return;

    setSaving(true);

    try {
      await saveWorkspace(sessionName);
      setSessionName("");
    } finally {
      setSaving(false);
    }
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
        disabled={saving}
        onClick={handleSave}
        className="rounded-lg bg-blue-600 text-white py-2 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Workspace"}
      </button>
    </div>
  );
}