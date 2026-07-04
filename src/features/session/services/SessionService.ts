import {
  SessionRepository,
  BrowserTabRepository,
} from "../repositories";

import { ChromeTabService } from "../../../shared/services";

import { SessionFactory } from "../utils";

import type { Session } from "../models";
import { db } from "@/src/database/db";
import { DuplicateWorkspaceError } from "../errors";

import type { BrowserTab } from "../models";


export class SessionService {
  constructor(
    private readonly sessionRepository = new SessionRepository(),
    private readonly browserTabRepository = new BrowserTabRepository(),
    private readonly chromeTabService = new ChromeTabService()
  ) {}

  async saveSession(
  sessionName: string,
  replace = false
): Promise<Session> {

  const existingSession =
    await this.sessionRepository.findByName(sessionName);

  if (existingSession && !replace) {
    throw new DuplicateWorkspaceError(sessionName);
  }

  if (existingSession && replace) {
    await this.browserTabRepository.deleteBySessionId(existingSession.id);
    await this.sessionRepository.delete(existingSession.id);
  }

  const chromeTabs =
    await this.chromeTabService.getCurrentTabs();

  const session = SessionFactory.createSession(
    sessionName,
    chromeTabs.length
  );

  const browserTabs =
    SessionFactory.createBrowserTabs(
      session.id,
      chromeTabs
    );

  await this.sessionRepository.save(session);
  await this.browserTabRepository.saveAll(browserTabs);

  return session;
}

  async restoreSession(sessionId: string): Promise<void> {
    const session =
      await this.sessionRepository.findById(sessionId);

    if (!session) {
      throw new Error("Session not found.");
    }

    const tabs =
      await this.browserTabRepository.findBySessionId(
        sessionId
      );

    const urls = tabs
      .map((tab) => tab.url)
      .filter((url) => url.length > 0);

    await this.chromeTabService.openWindow(urls);

    session.lastOpened = new Date().toISOString();
    session.restoreCount++;

    await this.sessionRepository.update(session);
  }

  async renameSession(
    sessionId: string,
    newName: string
  ): Promise<Session> {
    const session =
      await this.sessionRepository.findById(sessionId);

    if (!session) {
      throw new Error("Session not found.");
    }

    session.name = newName;
    session.updatedAt = new Date().toISOString();

    return await this.sessionRepository.update(session);
  }

  async deleteSession(sessionId: string): Promise<void> {
    await this.browserTabRepository.deleteBySessionId(
      sessionId
    );

    await this.sessionRepository.delete(sessionId);
  }

  async toggleFavorite(
    sessionId: string
  ): Promise<Session> {
    const session =
      await this.sessionRepository.findById(sessionId);

    if (!session) {
      throw new Error("Session not found.");
    }

    session.favorite = !session.favorite;
    session.updatedAt = new Date().toISOString();

    return await this.sessionRepository.update(session);
  }

  async getAllSessions(): Promise<Session[]> {
    return await this.sessionRepository.findAll();
  }

  async searchSessions(
    query: string
  ): Promise<Session[]> {
    return await this.sessionRepository.search(query);
  }

  async getFavoriteSessions(): Promise<Session[]> {
  return await this.sessionRepository.findFavorites();
}

async sortSessions(
  sortBy:
    | "latest"
    | "oldest"
    | "name-asc"
    | "name-desc"
    | "most-restored"
): Promise<Session[]> {

  const sessions =
    await this.sessionRepository.findAll();

  switch (sortBy) {
    case "latest":
      return sessions.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );

    case "oldest":
      return sessions.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime()
      );

    case "name-asc":
      return sessions.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

    case "name-desc":
      return sessions.sort((a, b) =>
        b.name.localeCompare(a.name)
      );

    case "most-restored":
      return sessions.sort(
        (a, b) =>
          b.restoreCount - a.restoreCount
      );

    default:
      return sessions;
  }
}
async getAllTabs(): Promise<BrowserTab[]> {
  return await this.browserTabRepository.findAll();
}
}