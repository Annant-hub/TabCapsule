export const DATABASE_SCHEMA = {
  sessions:
    "id, name, createdAt, updatedAt, lastOpened, favorite",

  tabs:
    "id, sessionId, url, title, pinned, active, index",
} as const;