import { eq } from "drizzle-orm";
import { db } from ".";
import { accounts, chats, users } from "./schema";

export const QUERIES = {
  getUserDataById: (userId: string) => {
    return db
      .select({ name: users.name, refreshToken: accounts.refresh_token })
      .from(users)
      .innerJoin(accounts, eq(accounts.userId, users.id))
      .where(eq(users.id, userId));
  },
  getChatConfigByUserId: (userId: string) => {
    return db.select().from(chats).where(eq(chats.channelId, userId));
  },
};
