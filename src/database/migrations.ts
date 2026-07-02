import type { Dexie } from "dexie";

/**
 * Runs database migrations.
 * Version 1 has no migrations because it's the initial release.
 */
export function registerMigrations(db: Dexie): void {
  // No migrations required for Version 1
}