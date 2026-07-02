import { useEffect, useState } from "react";
import { SessionService } from "../services";
import type { Session } from "../models";

const sessionService = new SessionService();



export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

async function loadSessions() {
  const result = await sessionService.getAllSessions();
  setSessions(result);
}
 async function saveWorkspace(sessionName: string) {
  console.log("Saving workspace...");

  await sessionService.saveSession(sessionName);

  console.log("Workspace saved.");

  await loadSessions();
}

  async function restoreWorkspace(sessionId: string) {
    await sessionService.restoreSession(sessionId);
    await loadSessions();
  }

  async function deleteWorkspace(sessionId: string) {
    await sessionService.deleteSession(sessionId);
    await loadSessions();
  }

  async function renameWorkspace(
    sessionId: string,
    newName: string
  ) {
    await sessionService.renameSession(sessionId, newName);
    await loadSessions();
  }

  async function toggleFavorite(sessionId: string) {
    await sessionService.toggleFavorite(sessionId);
    await loadSessions();
  }

  async function search(query: string) {
    if (!query.trim()) {
      await loadSessions();
      return;
    }

    const result =
      await sessionService.searchSessions(query);

    setSessions(result);
  }

  useEffect(() => {
  async function init() {
    const result = await sessionService.getAllSessions();
    setSessions(result);
    setLoading(false);
  }

  init();
}, []);

  return {
    sessions,
    loading,

    saveWorkspace,
    restoreWorkspace,
    deleteWorkspace,
    renameWorkspace,
    toggleFavorite,
    search,
    refresh: loadSessions,
  };
}