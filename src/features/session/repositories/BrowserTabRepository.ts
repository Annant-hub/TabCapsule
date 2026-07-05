import { db } from "../../../database";
import type { BrowserTab } from "../models";

export class BrowserTabRepository {
  constructor(
    private readonly database = db
  ) {}

  async save(tab: BrowserTab): Promise<BrowserTab> {
    await this.database.tabs.add(tab);
    return tab;
  }

  async saveAll(tabs: BrowserTab[]): Promise<void> {
    await this.database.tabs.bulkAdd(tabs);
  }

  async findById(id: string): Promise<BrowserTab | null> {
    const tab = await this.database.tabs.get(id);
    return tab ?? null;
  }

  async findBySessionId(sessionId: string): Promise<BrowserTab[]> {
    return await this.database.tabs
      .where("sessionId")
      .equals(sessionId)
      .toArray();
  }

  async update(tab: BrowserTab): Promise<BrowserTab> {
    await this.database.tabs.put(tab);
    return tab;
  }

  async delete(id: string): Promise<void> {
    await this.database.tabs.delete(id);
  }

  async deleteBySessionId(sessionId: string): Promise<void> {
    await this.database.tabs
      .where("sessionId")
      .equals(sessionId)
      .delete();
  }

  async count(): Promise<number> {
    return await this.database.tabs.count();
  }

  async findAll(): Promise<BrowserTab[]> {
  return await this.database.tabs.toArray();
}
  async search(
  query: string
): Promise<BrowserTab[]> {

  const q = query.toLowerCase();

  return await this.database.tabs
    .filter(tab =>

      tab.title
        .toLowerCase()
        .includes(q)

      ||

      tab.url
        .toLowerCase()
        .includes(q)

    )
    .toArray();

}
}