import Dexie, { type EntityTable } from "dexie";

import type { Session } from "../features/session/models/Session";
import type { BrowserTab } from "../features/session/models/BrowserTab";

class TabCapsuleDatabase extends Dexie {
  sessions!: EntityTable<Session, "id">;

  tabs!: EntityTable<BrowserTab, "id">;

  constructor() {
    super("TabCapsuleDB");

    this.version(1).stores({
      sessions: "id, name, createdAt, updatedAt, lastOpened, favorite",
      tabs: "id, sessionId, url, title, pinned, active, index",
    });
  }
}

export const db = new TabCapsuleDatabase();