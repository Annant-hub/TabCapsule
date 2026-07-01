export interface BrowserTab {
  readonly id: string;
  readonly sessionId: string;
  url: string;
  title: string;
  faviconUrl?: string;
  pinned: boolean;
  index: number;
  active: boolean;
}
