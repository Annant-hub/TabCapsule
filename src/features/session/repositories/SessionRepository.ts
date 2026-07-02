import { db } from "../../../database";
import type { Session } from "../models";

export class SessionRepository {
  constructor(
    private readonly database = db
  ) {}

  async save(session: Session): Promise<Session> {
    await this.database.sessions.add(session);
    return session;
  }

  async update(session: Session): Promise<Session> {
    await this.database.sessions.put(session);
    return session;
  }

  async delete(id: string): Promise<void> {
    await this.database.sessions.delete(id);
  }

  async findById(id: string): Promise<Session | null> {
    const session = await this.database.sessions.get(id);
    return session ?? null;
  }

  async findAll(): Promise<Session[]> {
    return await this.database.sessions.toArray();
  }

  async search(query: string): Promise<Session[]> {
    return await this.database.sessions
      .filter((session) =>
        session.name.toLowerCase().includes(query.toLowerCase())
      )
      .toArray();
  }

  async exists(id: string): Promise<boolean> {
    return (await this.database.sessions.get(id)) !== undefined;
  }

  async count(): Promise<number> {
    return await this.database.sessions.count();
  }

  async findFavorites(): Promise<Session[]> {
    return await this.database.sessions
      .where("favorite")
      .equals(1)
      .toArray();
  }
}