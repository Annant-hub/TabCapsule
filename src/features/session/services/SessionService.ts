import {
  SessionRepository,
  BrowserTabRepository,
} from "../repositories";

export class SessionService {
  constructor(
    private readonly sessionRepository = new SessionRepository(),
    private readonly browserTabRepository = new BrowserTabRepository()
  ) {}
}