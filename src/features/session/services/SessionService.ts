import {
  SessionRepository,
  BrowserTabRepository,
} from "../repositories";

import { ChromeTabService } from "../../../shared/services";

import { SessionFactory } from "../utils";

import type { Session } from "../models";

export class SessionService {
  constructor(
    private readonly sessionRepository = new SessionRepository(),
    private readonly browserTabRepository = new BrowserTabRepository(),
    private readonly chromeTabService = new ChromeTabService()
  ) {}

  async saveSession(sessionName: string): Promise<Session> {
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
}

