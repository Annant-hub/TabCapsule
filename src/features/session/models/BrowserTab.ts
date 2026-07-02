export interface BrowserTab {
  readonly id: string;
  readonly sessionId: string;

  title: string;
  url: string;

  faviconUrl?: string;

  pinned: boolean;
  active: boolean;
  index: number;

  createdAt: string;
}