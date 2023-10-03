import { relations, sql } from "drizzle-orm"
import {
  char,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"

export const users = pgTable(
  "users",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    displayName: varchar("display_name", { length: 64 }),
    email: text("email").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    lastActivity: timestamp("last_activity").defaultNow().notNull(),
  },
  (t) => ({
    emailIdx: uniqueIndex("email_idx")
      .on(t.email)
      .concurrently()
      .using(sql`HASH (email)`),
  }),
)

export const usersRelations = relations(users, ({ many }) => ({
  revisions: many(revisions),
  contributions: many(usersToDocuments),
}))

export const documents = pgTable("documents", {
  id: varchar("id", { length: 1024 }).primaryKey(),
  content: text("content").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const documentsRelations = relations(documents, ({ many }) => ({
  revisions: many(revisions),
  contributors: many(usersToDocuments),
}))

export const revisions = pgTable("revisions", {
  id: char("id", { length: 128 }).primaryKey(),
  message: varchar("message", { length: 256 }).notNull().default(""),
  content: text("content").notNull(),
  authorId: varchar("author_id", { length: 64 }),
  documentId: varchar("document_id", { length: 1024 }),
  changes: jsonb("changes").array().notNull(),
  additions: integer("additions").notNull(),
  deletions: integer("deletions").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const revisionsRelations = relations(revisions, ({ one, many }) => ({
  document: one(documents, {
    fields: [revisions.documentId],
    references: [documents.id],
  }),
  author: one(users, { fields: [revisions.authorId], references: [users.id] }),
}))

export const usersToDocuments = pgTable("users_to_documents", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id", { length: 64 })
    .notNull()
    .references(() => users.id),
  documentId: varchar("document_id", { length: 1024 })
    .notNull()
    .references(() => documents.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const usersToDocumentsRelations = relations(
  usersToDocuments,
  ({ one }) => ({
    document: one(documents, {
      fields: [usersToDocuments.documentId],
      references: [documents.id],
    }),
    user: one(users, {
      fields: [usersToDocuments.userId],
      references: [users.id],
    }),
  }),
)
