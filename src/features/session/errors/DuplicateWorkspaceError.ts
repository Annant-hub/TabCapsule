export class DuplicateWorkspaceError extends Error {
  constructor(workspaceName: string) {
    super(`Workspace "${workspaceName}" already exists.`);
    this.name = "DuplicateWorkspaceError";
  }
}