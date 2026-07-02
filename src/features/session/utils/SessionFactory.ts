import type { Session, BrowserTab } from "../models";

export class SessionFactory {
  static createSession(
    sessionName: string,
    tabCount: number
  ): Session {
    const now = new Date().toISOString();

    return {
      id: crypto.randomUUID(),
      name: sessionName,
      createdAt: now,
      updatedAt: now,
      lastOpened: null,
      restoreCount: 0,
      favorite: false,
      tabCount,
    };
  }

  static createBrowserTabs(
    sessionId: string,
    chromeTabs: chrome.tabs.Tab[]
  ): BrowserTab[] {
    const now = new Date().toISOString();

    return chromeTabs.map((tab) => ({
      id: crypto.randomUUID(),
      sessionId,

      title: tab.title ?? "Untitled",
      url: tab.url ?? "",

      faviconUrl: tab.favIconUrl,

      pinned: tab.pinned,
      active: tab.active,
      index: tab.index,

      createdAt: now,
    }));
  }
}