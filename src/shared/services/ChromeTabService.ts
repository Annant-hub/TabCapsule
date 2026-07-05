import type { RestoreMode } from "../../features/session/models";
export class ChromeTabService {
  /**
   * Returns all tabs in the current browser window.
   */
  async getCurrentTabs(): Promise<chrome.tabs.Tab[]> {
    return await chrome.tabs.query({
      currentWindow: true,
    });
  }

  /**
   * Returns the currently active tab.
   */
  async getActiveTab(): Promise<chrome.tabs.Tab | null> {
    const tabs = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    return tabs[0] ?? null;
  }

  /**
   * Opens a single tab.
   */
  async openTab(url: string): Promise<chrome.tabs.Tab> {
    return await chrome.tabs.create({
      url,
    });
  }

  /**
   * Opens multiple tabs while preserving their order.
   */
  async openTabs(urls: string[]): Promise<void> {
    for (const url of urls) {
      await chrome.tabs.create({
        url,
      });
    }
  }

  /**
   * Closes a browser tab.
   */
  async closeTab(tabId: number): Promise<void> {
    await chrome.tabs.remove(tabId);
  }

  /**
   * Closes multiple browser tabs.
   */
  async closeTabs(tabIds: number[]): Promise<void> {
    await chrome.tabs.remove(tabIds);
  }

  /**
   * Reloads a browser tab.
   */
  async reloadTab(tabId: number): Promise<void> {
    await chrome.tabs.reload(tabId);
  }

  /**
   * Updates an existing browser tab.
   */
async updateTab(
  tabId: number,
  properties: chrome.tabs.UpdateProperties
): Promise<chrome.tabs.Tab> {
  const tab = await chrome.tabs.update(tabId, properties);

  if (!tab) {
    throw new Error("Failed to update tab.");
  }

  return tab;
}
  /**
   * Returns the current browser window.
   */
  async getCurrentWindow(): Promise<chrome.windows.Window> {
    return await chrome.windows.getCurrent();
  }

  /**
   * Creates a new browser window with the provided URLs.
   */
 async openWindow(urls: string[]): Promise<chrome.windows.Window> {
  const window = await chrome.windows.create({
    url: urls,
  });

  if (!window) {
    throw new Error("Failed to create browser window.");
  }

  return window;
}


   /**
 * Restores tabs either in a new window or the current window.
 */
async restoreTabs(
  urls: string[],
  mode: RestoreMode
): Promise<void> {
  if (mode === "new-window") {
    await this.openWindow(urls);
    return;
  }

  // Restore in current window
  for (const url of urls) {
    await chrome.tabs.create({
      url,
      active: false,
    });
  }
}
}