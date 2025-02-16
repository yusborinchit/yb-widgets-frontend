import { eq } from "drizzle-orm";
import { db } from ".";
import { accounts, chats, follows, medias, subs, users } from "./schema";

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
  getFollowConfigByUserId: (userId: typeof users.$inferSelect.id) => {
    return db.select().from(follows).where(eq(follows.channelId, userId));
  },
  getSubConfigByUserId: (userId: typeof users.$inferSelect.id) => {
    return db.select().from(subs).where(eq(subs.channelId, userId));
  },
  getMediaByUserId: (userId: typeof users.$inferSelect.id) => {
    return db.select().from(medias).where(eq(medias.uploadedBy, userId));
  },
};

export const MUTATIONS = {
  updateChatConfigByUserId: (
    userId: typeof users.$inferSelect.id,
    chatConfig: Omit<typeof chats.$inferSelect, "id" | "channelId">,
  ) => {
    return db
      .update(chats)
      .set(chatConfig)
      .where(eq(chats.channelId, userId))
      .returning({ id: chats.id });
  },
  updateFollowConfigByUserId: (
    userId: typeof users.$inferSelect.id,
    followConfig: Omit<typeof follows.$inferSelect, "id" | "channelId">,
  ) => {
    return db
      .update(follows)
      .set(followConfig)
      .where(eq(follows.channelId, userId))
      .returning({ id: follows.id });
  },
  updateSubConfigByUserId: (
    userId: typeof users.$inferSelect.id,
    subConfig: Omit<typeof subs.$inferSelect, "id" | "channelId">,
  ) => {
    return db
      .update(subs)
      .set(subConfig)
      .where(eq(subs.channelId, userId))
      .returning({ id: subs.id });
  },
  insertMedia: (media: typeof medias.$inferInsert) => {
    return db.insert(medias).values(media).returning({ id: medias.id });
  },
};
