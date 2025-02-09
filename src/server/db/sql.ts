import { eq } from "drizzle-orm";
import { db } from ".";
import { chats, users } from "./schema";

export const QUERIES = {
  getUserNameById: (userId: string) => {
    return db
      .select({ channelName: users.name })
      .from(users)
      .where(eq(users.id, userId));
  },
  getChatConfigByUserId: (userId: string) => {
    return db.select().from(chats).where(eq(chats.channelId, userId));
  },
};
