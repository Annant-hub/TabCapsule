import { useState } from "react";
import { DuplicateWorkspaceError } from "../errors";
import { ConfirmDialog } from "../../../shared/ui";
import { Toast } from "../../../shared/ui";

interface SaveWorkspaceButtonProps {
  saveWorkspace: (
    sessionName: string,
    replace?: boolean
  ) => Promise<void>;
}

export function SaveWorkspaceButton({
  saveWorkspace,
}: SaveWorkspaceButtonProps) {
  const [sessionName, setSessionName] = useState("");
  const [saving, setSaving] = useState(false);
  const [showReplaceDialog, setShowReplaceDialog] = useState(false);
  const [pendingWorkspaceName, setPendingWorkspaceName] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

async function handleSave() {
  if (!sessionName.trim()) {
    showToast("Please enter a workspace name.", "error");
    return;
  }

  if (saving) return;

  setSaving(true);

  try {
    await saveWorkspace(sessionName);
    setSessionName("");
    showToast("Workspace saved successfully.");
  }catch (error) {
  console.log(error);

  if (error instanceof DuplicateWorkspaceError) {
    console.log("Duplicate detected!");

    setPendingWorkspaceName(sessionName);
    setShowReplaceDialog(true);
  } else {
    console.error(error);
    showToast("Something went wrong.", "error");
  }
}
finally {
    setSaving(false);
  }
}

async function handleReplace() {
  try {
    await saveWorkspace(pendingWorkspaceName, true);
    setSessionName("");
    showToast("Workspace replaced successfully.");
  } finally {
    setShowReplaceDialog(false);
    setPendingWorkspaceName("");
  }
}

function showToast(
  message: string,
  type: "success" | "error" = "success"
) {
  setToastMessage(message);
  setToastType(type);
  setToastOpen(true);

  setTimeout(() => {
    setToastOpen(false);
  }, 2500);
}

 return (
  <>
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

    <ConfirmDialog
      open={showReplaceDialog}
      title="Workspace Already Exists"
      message={`"${pendingWorkspaceName}" already exists. Replace it?`}
      confirmText="Replace"
      cancelText="Cancel"
      onConfirm={handleReplace}
      onCancel={() => {
        setShowReplaceDialog(false);
        setPendingWorkspaceName("");
      }}
    />

    <Toast
      open={toastOpen}
      message={toastMessage}
      type={toastType}
    />
  </>
);

 
}