DROP TABLE "changes";--> statement-breakpoint
ALTER TABLE "revisions" ADD COLUMN "content" text NOT NULL;--> statement-breakpoint
ALTER TABLE "revisions" ADD COLUMN "changes" jsonb[] NOT NULL;