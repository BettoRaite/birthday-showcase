CREATE TABLE IF NOT EXISTS "wishes_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"user_uid" text NOT NULL,
	"author_name" text NOT NULL,
	"group" text NOT NULL,
	"role" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "wishes_table_user_uid_unique" UNIQUE("user_uid")
);
