export const DATABASE_SCHEMA = {
  sessions:
    "id, name, createdAt, updatedAt, lastOpened, favorite",

  browserTabs:
    "id, sessionId, url, title, pinned, active, index",
} as const;
