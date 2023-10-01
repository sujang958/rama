CREATE TABLE IF NOT EXISTS "changes" (
	"id" char(128) PRIMARY KEY NOT NULL,
	"revision_id" char(128),
	"changes" jsonb[] NOT NULL,
	"additions" integer NOT NULL,
	"deletions" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "documents" (
	"id" varchar(1024) PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "revisions" (
	"id" char(128) PRIMARY KEY NOT NULL,
	"document_id" varchar(1024),
	"additions" integer NOT NULL,
	"deletions" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
