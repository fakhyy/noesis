import { relations } from "drizzle-orm";
import { pgTable, text, uuid, timestamp, index } from "drizzle-orm/pg-core";

import { user } from "./auth.schema";

export const thoughts = pgTable(
  "thoughts",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    title: text("title").notNull().default("Untitled"),
    content: text("content"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),

    archivedAt: timestamp("archived_at", { withTimezone: true }),

    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => [
    index("thoughts_user_id_idx").on(table.userId),
    index("thoughts_created_at_idx").on(table.createdAt),
    index("thoughts_deleted_at_idx").on(table.deletedAt),
  ],
);


export const userRelations = relations(user, ({ many }) => ({
  thoughts: many(thoughts),
}));

export const thoughtsRelations = relations(thoughts, ({ one }) => ({
  user: one(user, {
    fields: [thoughts.userId],
    references: [user.id],
  }),
}));
