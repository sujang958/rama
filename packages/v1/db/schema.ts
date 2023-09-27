import { relations } from "drizzle-orm"
import {
  char,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  displayName: varchar("display_name", { length: 64 }),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastActivity: timestamp("last_activity").defaultNow().notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  contributions: many(documents),
}))

export const documents = pgTable("documents", {
  id: varchar("id", { length: 1024 }).primaryKey(),
  content: text("content").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const documentsRelations = relations(documents, ({ many }) => ({
  revisions: many(revisions),
  contributors: many(users),
}))

export const revisions = pgTable("revisions", {
  id: char("id", { length: 128 }).primaryKey(),
  content: text("content").notNull(),
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
}))

// export const usersToDocuments = pgTable(
//   "users_to_documents",
//   {
//     userId: integer("user_id")
//       .notNull()
//       .references(() => users.id),
//     groupId: integer("group_id")
//       .notNull()
//       .references(() => groups.id),
//   },
//   (t) => ({
//     pk: primaryKey(t.userId, t.groupId),
//   }),
// )

// export const usersToDocumentsRelations = relations(
//   usersToDocuments,
//   ({ one }) => ({
//     group: one(groups, {
//       fields: [usersToDocuments.groupId],
//       references: [groups.id],
//     }),
//     user: one(users, {
//       fields: [usersToDocuments.userId],
//       references: [users.id],
//     }),
//   }),
// )
