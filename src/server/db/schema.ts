import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

export const createTable = pgTableCreator((name) => `yb-widgets_${name}`);

export const medias = createTable(
  "media",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    key: varchar("key", { length: 255 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 }).notNull(),
    url: varchar("url", { length: 500 }).notNull(),
    uploadedBy: varchar("uploaded_by", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (media) => ({
    keyIdx: index("media_key_idx").on(media.key),
    uploadByIdx: index("media_upload_by_idx").on(media.uploadedBy),
  }),
);

export const mediasRelations = relations(medias, ({ many, one }) => ({
  user: one(users, {
    fields: [medias.uploadedBy],
    references: [users.id],
  }),
  followImage: many(follows, { relationName: "followImage" }),
  followSound: many(follows, { relationName: "followSound" }),
  subImage: many(subs, { relationName: "subImage" }),
  subSound: many(subs, { relationName: "subSound" }),
}));

export const follows = createTable(
  "follow",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    channelId: varchar("channel_id", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    imageId: varchar("image_id", { length: 255 }).references(() => medias.id, {
      onDelete: "set null",
    }),
    soundId: varchar("sound_id", { length: 255 }).references(() => medias.id, {
      onDelete: "set null",
    }),
    width: integer("width").notNull().default(800),
    height: integer("height").notNull().default(600),
    text: varchar("text", { length: 255 })
      .notNull()
      .default("${user} thank you for the follow!"),
  },
  (follow) => ({
    channelIdIdx: index("follow_channel_id_idx").on(follow.channelId),
  }),
);

export const followsRelations = relations(follows, ({ one }) => ({
  user: one(users, { fields: [follows.channelId], references: [users.id] }),
  image: one(medias, {
    fields: [follows.imageId],
    references: [medias.id],
    relationName: "followImage",
  }),
  sound: one(medias, {
    fields: [follows.soundId],
    references: [medias.id],
    relationName: "followSound",
  }),
}));

export const subs = createTable(
  "sub",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    channelId: varchar("channel_id", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    imageId: varchar("image_id", { length: 255 }).references(() => medias.id, {
      onDelete: "set null",
    }),
    soundId: varchar("sound_id", { length: 255 }).references(() => medias.id, {
      onDelete: "set null",
    }),
    width: integer("width").notNull().default(800),
    height: integer("height").notNull().default(600),
    text: varchar("text", { length: 255 })
      .notNull()
      .default("${user} thank you for the subscription!"),
  },
  (sub) => ({
    channelIdIdx: index("sub_channel_id_idx").on(sub.channelId),
  }),
);

export const subsRelations = relations(subs, ({ one }) => ({
  user: one(users, { fields: [subs.channelId], references: [users.id] }),
  image: one(medias, {
    fields: [subs.imageId],
    references: [medias.id],
    relationName: "subImage",
  }),
  sound: one(medias, {
    fields: [subs.soundId],
    references: [medias.id],
    relationName: "subSound",
  }),
}));

export const chats = createTable(
  "chat",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    channelId: varchar("channel_id", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    width: integer("width").notNull().default(800),
    height: integer("height").notNull().default(600),
    fontSize: integer("font_size").notNull().default(18),
    fontColor: varchar("font_color", { length: 255 })
      .notNull()
      .default("#ffffff"),
    backgroundColor: varchar("background_color", { length: 255 })
      .notNull()
      .default("#00000000"),
  },
  (chat) => ({
    channelIdIdx: index("chat_channel_id_idx").on(chat.channelId),
  }),
);

export const chatsRelations = relations(chats, ({ one }) => ({
  user: one(users, { fields: [chats.channelId], references: [users.id] }),
}));

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  accounts: many(accounts),
  chats: one(chats, { fields: [users.id], references: [chats.channelId] }),
  follows: one(follows, {
    fields: [users.id],
    references: [follows.channelId],
  }),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
