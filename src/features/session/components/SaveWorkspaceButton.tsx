import { useState } from "react";
import { Plus } from "lucide-react";
import { DuplicateWorkspaceError } from "../errors";
import {
  Card,
  Button,
  Input,
  ConfirmDialog,
  Toast,
} from "../../../shared/ui";

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

  const [showReplaceDialog, setShowReplaceDialog] =
    useState(false);

  const [pendingWorkspaceName, setPendingWorkspaceName] =
    useState("");

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [toastType, setToastType] = useState<
    "success" | "error"
  >("success");

  async function handleSave() {
    if (!sessionName.trim()) {
      showToast(
        "Please enter a workspace name.",
        "error"
      );
      return;
    }

    if (saving) return;

    setSaving(true);

    try {
      await saveWorkspace(sessionName);

      setSessionName("");

      showToast("Workspace saved successfully.");
    } catch (error) {
      console.error(error);

      if (error instanceof DuplicateWorkspaceError) {
        setPendingWorkspaceName(sessionName);
        setShowReplaceDialog(true);
      } else {
        showToast(
          "Something went wrong.",
          "error"
        );
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleReplace() {
    try {
      await saveWorkspace(
        pendingWorkspaceName,
        true
      );

      setSessionName("");

      showToast(
        "Workspace replaced successfully."
      );
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
      <Card className="p-5">
        <div className="space-y-4">
          <Input
            placeholder="Workspace name..."
            value={sessionName}
            onChange={(e) =>
              setSessionName(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
              handleSave();
             }
              }
            }
          />
          <Button
            onClick={handleSave}
            disabled={saving}
            className="flex w-full items-center justify-center gap-2"
          >
            <Plus size={18} />
            {saving
              ? "Saving..."
              : "Save Workspace"}
          </Button>
        </div>
      </Card>

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