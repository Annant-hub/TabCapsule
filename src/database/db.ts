import Dexie, { type EntityTable } from "dexie";

import type { Session } from "../features/session/models/Session";
import type { BrowserTab } from "../features/session/models/BrowserTab";

import { DATABASE_NAME, DATABASE_VERSION } from "./constants";
import { DATABASE_SCHEMA } from "./schema";

class TabCapsuleDatabase extends Dexie {
  sessions!: EntityTable<Session, "id">;

  tabs!: EntityTable<BrowserTab, "id">;

  constructor() {
    super(DATABASE_NAME);

    this.version(DATABASE_VERSION).stores(DATABASE_SCHEMA);
  }
}

export const db = new TabCapsuleDatabase();