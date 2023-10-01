import { relations } from "drizzle-orm"
import {
  char,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

export const documents = pgTable("documents", {
  id: varchar("id", { length: 1024 }).primaryKey(),
  content: text("content").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const documentsRelations = relations(documents, ({ many }) => ({
  revisions: many(revisions),
}))

export const revisions = pgTable("revisions", {
  id: char("id", { length: 128 }).primaryKey(),
  documentId: varchar("document_id", { length: 1024 }),
  additions: integer("additions").notNull(),
  deletions: integer("deletions").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const revisionsRelations = relations(revisions, ({ one, many }) => ({
  document: one(documents, {
    fields: [revisions.documentId],
    references: [documents.id],
  }),
  changes: many(changes),
}))

export const changes = pgTable("changes", {
  id: char("id", { length: 128 }).primaryKey(),
  revisionId: char("revision_id", { length: 128 }),
  changes: jsonb("changes").array().notNull(),
  additions: integer("additions").notNull(),
  deletions: integer("deletions").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const changesRelations = relations(changes, ({ one }) => ({
  revision: one(revisions, {
    fields: [changes.revisionId],
    references: [revisions.id],
  }),
}))
