import { eq } from "drizzle-orm";
import { db } from ".";
import { accounts, chats, users } from "./schema";

export const QUERIES = {
  getUserDataById: (userId: typeof users.$inferSelect.id) => {
    return db
      .select({ name: users.name, refreshToken: accounts.refresh_token })
      .from(users)
      .innerJoin(accounts, eq(accounts.userId, users.id))
      .where(eq(users.id, userId));
  },
  getChatConfigByUserId: (userId: typeof users.$inferSelect.id) => {
    return db.select().from(chats).where(eq(chats.channelId, userId));
  },
};

export const MUTATIONS = {
  updateChatConfigByUserId: (
    userId: typeof users.$inferSelect.id,
    chatConfig: Omit<typeof chats.$inferSelect, "id" | "channelId">,
  ) => {
    return db
      .update(chats)
      .set({ ...chatConfig })
      .where(eq(chats.channelId, userId));
  },
};
